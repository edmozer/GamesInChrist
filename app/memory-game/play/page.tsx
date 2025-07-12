"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Users } from "lucide-react"
import { MemoryCard } from "@/components/memory-card"
import { motion, Reorder } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"

// Helper para embaralhar um array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function MemoryGamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Obter configurações da URL ou usar padrões
  const initialPlayerNames = searchParams.get("players") ? JSON.parse(searchParams.get("players")!) : ["Jogador 1"]
  const initialNumCardPairs = searchParams.get("pairs") ? Number.parseInt(searchParams.get("pairs")!) : 8

  const [playerNames, setPlayerNames] = useState<string[]>(initialPlayerNames)
  const [numCardPairs, setNumCardPairs] = useState(initialNumCardPairs)
  const [cards, setCards] = useState<{ id: string; content: string; isFlipped: boolean; isMatched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([]) // IDs of currently flipped cards
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [scores, setScores] = useState<number[]>(playerNames.map(() => 0))
  const [lockBoard, setLockBoard] = useState(false) // To prevent rapid clicks
  const [cardSize, setCardSize] = useState({ min: 140, max: 160 }) // State for card size
  const [scoreBoardPosition, setScoreBoardPosition] = useState({ x: 20, y: 20 }) // Posição do placar arrastável
  const [isScoreboardCollapsed, setIsScoreboardCollapsed] = useState(false) // Estado para controlar se o placar está colapsado
  // Array com os caminhos das imagens para as cartas
  const cardContents = [
    "/images/img1-min.jpg",
    "/images/img2-min.jpg",
    "/images/img3-min.jpg",
    "/images/img4-min.jpg",
    "/images/img5-min.jpg",
    "/images/img6-min.jpg",
    "/images/img7-min.jpg",
    "/images/img8-min.jpg",
    "/images/img9-min.jpg",
    "/images/img10-min.jpg",
    "/images/img11-min.jpg",
    "/images/img12-min.jpg",
    "/images/img13-min.jpg",
    "/images/img14-min.jpg",
    "/images/img15-min.jpg",
    "/images/img16-min.jpg",
    "/images/img17-min.jpg",
    "/images/img18-min.jpg",
    "/images/img19-min.jpg",
    "/images/img20-min.jpg",
    "/images/img21-min.jpg",
    "/images/img22-min.jpg",
    "/images/img23-min.jpg",
    "/images/img24-min.jpg",
    "/images/img25-min.jpg",
  ]

  const initializeGame = useCallback(() => {
    const selectedContents = cardContents.slice(0, numCardPairs)
    const newCards = shuffleArray(
      selectedContents
        .flatMap((content) => [
          { id: `${content}-1`, content, isFlipped: false, isMatched: false },
          { id: `${content}-2`, content, isFlipped: false, isMatched: false },
        ])
        .map((card, index) => ({ ...card, id: `${card.id}-${index}` })), // Ensure unique IDs
    )
    setCards(newCards)
    setFlippedCards([])
    setCurrentPlayerIndex(0)
    setScores(playerNames.map(() => 0))
    setLockBoard(false)
  }, [numCardPairs, playerNames])

  // Efeito para inicializar o jogo
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleCardClick = (id: string) => {
    // Não permita cliques se o tabuleiro estiver bloqueado
    if (lockBoard) return

    // Encontre a carta clicada
    const clickedCard = cards.find((card) => card.id === id)
    
    // Não permita cliques em cartas já viradas, já combinadas ou inexistentes
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return

    // Vire a carta clicada
    const newCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    setCards(newCards)
    setFlippedCards((prev) => [...prev, id])
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setLockBoard(true)
      const [firstCardId, secondCardId] = flippedCards
      const firstCard = cards.find((card) => card.id === firstCardId)
      const secondCard = cards.find((card) => card.id === secondCardId)

      if (firstCard?.content === secondCard?.content) {
        // Match!
        setScores((prevScores) => {
          const newScores = [...prevScores]
          newScores[currentPlayerIndex] += 1
          return newScores
        })
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card,
          ),
        )
        setFlippedCards([])
        setLockBoard(false)
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card,
            ),
          )
          setFlippedCards([])
          setLockBoard(false)
          // Next player's turn
          setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length)
        }, 1000)
      }
    }
  }, [flippedCards, cards, currentPlayerIndex, playerNames])

  const allCardsMatched = cards.length > 0 && cards.every((card) => card.isMatched)

  // Componente do Placar Arrastável
  const DraggableScoreBoard = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [cardWidth] = useState(200) // 200px - tamanho intermediário

    return (
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: scoreBoardPosition.x, y: scoreBoardPosition.y }}
        animate={{ x: scoreBoardPosition.x, y: scoreBoardPosition.y }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, info) => {
          setIsDragging(false)
          setScoreBoardPosition({
            x: scoreBoardPosition.x + info.offset.x,
            y: scoreBoardPosition.y + info.offset.y
          })
        }}
        className="fixed z-50 touch-none select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Card 
          className="bg-white/90 backdrop-blur-sm shadow-lg border-brand-primary-100 rounded-2xl overflow-hidden"
          style={{ 
            width: `${cardWidth}px`,
            height: isScoreboardCollapsed ? '40px' : 'auto',
            transition: 'height 0.3s ease'
          }}
        >
          {/* Barra superior com alça para arrastar e botão de colapso */}
          <div 
            className="h-10 w-full bg-brand-primary-100 cursor-grab active:cursor-grabbing flex justify-between items-center px-4"
            onClick={() => setIsScoreboardCollapsed(!isScoreboardCollapsed)}
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Users className="h-4 w-4 text-brand-primary-700 shrink-0" />
              <span className="text-base font-medium text-brand-primary-800 truncate">
                Placar
              </span>
            </div>
            <button 
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-brand-primary-200/50 transition-colors shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsScoreboardCollapsed(!isScoreboardCollapsed)
              }}
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isScoreboardCollapsed ? '' : 'rotate-180'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </button>
          </div>
          
          {/* Conteúdo do placar - escondido quando colapsado */}
          <div
            className={`transition-all duration-300 ${
              isScoreboardCollapsed ? 'h-0 opacity-0 pointer-events-none' : 'opacity-100'
            } overflow-hidden`}
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                {playerNames.map((name, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-lg transition-colors ${
                      index === currentPlayerIndex
                        ? "bg-brand-primary-100 text-brand-primary-800 font-medium"
                        : "text-brand-text-medium hover:bg-brand-primary-50"
                    }`}
                  >
                    <span className="font-medium truncate mr-2">{name}</span>
                    <span className="font-bold whitespace-nowrap">{scores[index]} pares</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[url('/images/beack-bg.png')] bg-cover bg-center bg-fixed">
      {/* Título no topo */}
      <div className="bg-white/90 backdrop-blur-md border-b border-brand-primary-100 py-2 shadow-md">
        <h1 className="text-3xl font-bold text-brand-primary-900/90 text-center">Jogo da Memória</h1>
      </div>

      {/* Placar Arrastável */}
      <DraggableScoreBoard />

      {/* Área principal do jogo */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto z-0">
          <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-32">
            {/* Zoom controls */}
            <div className="fixed bottom-20 right-6 flex flex-col gap-2 z-20">
              <Button
                onClick={() => setCardSize(prev => ({
                  min: Math.min(prev.min + 10, 300),
                  max: Math.min(prev.max + 10, 320)
                }))}
                variant="outline"
                size="sm"
                className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-brand-primary-50"
              >
                +
              </Button>
              <Button
                onClick={() => setCardSize(prev => ({
                  min: Math.max(prev.min - 10, 60),
                  max: Math.max(prev.max - 10, 80)
                }))}
                variant="outline"
                size="sm"
                className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-brand-primary-50"
              >
                -
              </Button>
            </div>
            <div 
              className="grid gap-4 w-full auto-rows-fr"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize.min}px, ${cardSize.max}px))`,
                gridAutoRows: '1fr',
                justifyContent: 'center'
              }}
            >
              {cards.map((card) => (
                <MemoryCard
                  key={card.id}
                  id={card.id}
                  content={card.content}
                  isFlipped={card.isFlipped || flippedCards.includes(card.id)}
                  isMatched={card.isMatched}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="relative z-10 w-full bg-white/95 backdrop-blur-md border-t border-brand-primary-100 py-2 px-4 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Grupo da esquerda: botões */}
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <Button
                onClick={() => router.push("/memory-game")}
                variant="outline"
                className="border-brand-accent-100 text-brand-accent-700 hover:bg-brand-accent-50 bg-transparent rounded-full"
                size="sm"
              >
                Voltar
              </Button>
              <Button
                onClick={initializeGame}
                className="bg-gradient-to-r from-brand-primary-600 to-brand-primary-700 hover:from-brand-primary-700 hover:to-brand-primary-800 text-white shadow-md rounded-full"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar
              </Button>
            </div>

            {/* Grupo do centro: vez do jogador */}
            <div className="flex-grow flex justify-center items-center mx-4">
              <div className="flex items-center gap-3 text-brand-primary-800 px-6 py-2 rounded-full bg-brand-primary-50/50">
                <Users className="h-6 w-6 text-brand-primary-600" />
                <span className="text-xl font-bold whitespace-nowrap">Vez de {playerNames[currentPlayerIndex]}</span>
              </div>
            </div>

            {/* Espaço para manter o layout flexível */}
            <div className="flex-grow"></div>
          </div>

          {/* Mensagem de vitória */}
          {allCardsMatched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-lg font-semibold text-brand-primary-700"
            >
              {playerNames[scores.indexOf(Math.max(...scores))]} venceu o jogo!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

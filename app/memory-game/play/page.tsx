"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Users } from "lucide-react"
import { MemoryCard } from "@/components/memory-card"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion" // Import motion from framer-motion

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
  const [gridColumns, setGridColumns] = useState(4) // Estado para o número dinâmico de colunas

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

  // Função para calcular o número de colunas
  const calculateGridColumns = useCallback(() => {
    const totalCards = numCardPairs * 2
    const containerWidth = window.innerWidth * 0.8 // 80% da largura da viewport
    const minCardDisplaySize = 120 // Tamanho mínimo aceitável para um cartão em px
    const maxCardDisplaySize = 320 // Tamanho máximo desejável para um cartão em px
    const gapSize = 16 // Equivalente a sm:gap-4

    let bestN = 1 // Padrão para 1 coluna
    let minDiff = Number.POSITIVE_INFINITY // Para encontrar o layout mais "quadrado"

    // Limite prático para o número de colunas para evitar cartas muito pequenas ou muitas colunas
    const maxPossibleColumns = Math.min(totalCards, Math.floor(containerWidth / (minCardDisplaySize + gapSize)))
    const practicalMaxColumns = Math.min(maxPossibleColumns, 8) // Limite superior razoável para jogos de memória

    console.log("Grid Calculation:", {
      totalCards,
      containerWidth,
      maxPossibleColumns,
      practicalMaxColumns,
    })

    for (let N = 2; N <= practicalMaxColumns; N++) {
      const rows = Math.ceil(totalCards / N)
      const cardsInLastRow = totalCards % N === 0 ? N : totalCards % N
      const cardWidthWithGap = (containerWidth - (N - 1) * gapSize) / N

      console.log(`Testing N=${N}:`, {
        rows,
        cardsInLastRow,
        cardWidthWithGap,
      })

      // 1. Verificar se o tamanho da carta é aceitável
      if (cardWidthWithGap < minCardDisplaySize || cardWidthWithGap > maxCardDisplaySize) {
        continue
      }

      // 2. Verificar a regra da "última fileira com pelo menos metade"
      if (cardsInLastRow < N / 2 && cardsInLastRow !== 0) {
        continue
      }

      // 3. Calcular a diferença para um layout quadrado (colunas vs. linhas)
      const diff = Math.abs(N - rows)

      // Se este N der um layout mais quadrado, ou se for o primeiro N válido
      if (diff < minDiff || (diff === minDiff && N > bestN)) {
        minDiff = diff
        bestN = N
      }
    }

    // Se nenhum N válido foi encontrado, usar um valor seguro
    if (bestN === 1) {
      bestN = Math.min(4, totalCards)
    }

    console.log("Final grid decision:", {
      bestN,
      minDiff,
    })

    return bestN
  }, [numCardPairs])

  // Atualizar o número de colunas quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      const newColumns = calculateGridColumns()
      setGridColumns(newColumns)
    }

    // Calcular inicialmente
    handleResize()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [calculateGridColumns])

  // Efeito para inicializar o jogo
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleCardClick = (id: string) => {
    if (lockBoard) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-primary-50 via-brand-primary-100 to-brand-secondary-100">
      {/* Título no topo */}
      <div className="bg-white/90 backdrop-blur-md border-b border-brand-primary-100 py-3 shadow-md">
        <h1 className="text-3xl font-bold text-brand-primary-900 text-center">Jogo da Memória</h1>
      </div>

      {/* Área principal do jogo */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div
          className={`grid gap-4 w-full max-w-7xl mx-auto`}
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(140px, 1fr))`,
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

      {/* Rodapé fixo */}
      <div className="w-full bg-white/95 backdrop-blur-md border-t border-brand-primary-100 py-4 px-6 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            {/* Botões */}
            <div className="flex items-center gap-3">
              <Button
                onClick={initializeGame}
                className="bg-gradient-to-r from-brand-primary-600 to-brand-primary-700 hover:from-brand-primary-700 hover:to-brand-primary-800 text-white shadow-md"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar
              </Button>
              <Button
                onClick={() => router.push("/memory-game")}
                variant="outline"
                className="border-brand-accent-100 text-brand-accent-700 hover:bg-brand-accent-50 bg-transparent"
                size="sm"
              >
                Voltar
              </Button>
            </div>

            {/* Vez do jogador e pontuação */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2 text-brand-primary-800 border-r pr-8 border-brand-primary-200">
                <Users className="h-5 w-5 text-brand-primary-600" />
                <span className="font-semibold whitespace-nowrap">Vez de: {playerNames[currentPlayerIndex]}</span>
              </div>

              <div className="flex items-center gap-8">
                {playerNames.map((name, index) => (
                  <span
                    key={name}
                    className={`${
                      index === currentPlayerIndex ? "font-bold text-brand-primary-900" : "text-brand-text-medium"
                    } whitespace-nowrap`}
                  >
                    {name}: {scores[index]} pontos
                  </span>
                ))}
              </div>
            </div>
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

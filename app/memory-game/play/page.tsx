
"use client"
// --- Types and helpers from christmas/page.tsx ---
interface GameCard {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// TODO: Replace with correct image set for this game mode if needed
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
];

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomToast } from "@/components/custom-toast"
import { RotateCcw, Users, Trophy } from "lucide-react"
import { MemoryCard } from "@/components/memory-card"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useLanguage } from "@/lib/i18n/language-context"
import { useCardSize } from "@/hooks/use-card-size"
import { WinnerModal } from "@/components/winner-modal-new"

export default function MemoryGamePage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Configuration from URL parameters
  const initialPlayerNames = searchParams.get("players") ? JSON.parse(searchParams.get("players")!) : ["Jogador 1"]
  const initialNumCardPairs = searchParams.get("pairs") ? Number.parseInt(searchParams.get("pairs")!) : 5

  // Game state
  const [playerNames] = useState<string[]>(initialPlayerNames)
  const [numCardPairs] = useState<number>(initialNumCardPairs)
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [scores, setScores] = useState<number[]>(initialPlayerNames.map(() => 0))
  const [lockBoard, setLockBoard] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [winner, setWinner] = useState<string>("")
  const [hasGameEnded, setHasGameEnded] = useState(false)
  
  // UI state
  const { cardSize, setCardSize } = useCardSize(numCardPairs)
  const [scoreBoardPosition, setScoreBoardPosition] = useState({ x: typeof window !== 'undefined' ? window.innerWidth - 240 : 1000, y: 20 })
  const [isScoreboardCollapsed, setIsScoreboardCollapsed] = useState(false)
  const [showCardSizeHint, setShowCardSizeHint] = useState(false);
  const [hintFading, setHintFading] = useState(false);

  // Game initialization
  const resetGame = useCallback(() => {
    setFlippedCards([])
    setCurrentPlayerIndex(0)
    setScores(playerNames.map(() => 0))
    setLockBoard(false)
    setHasGameEnded(false)
    
  // Create and shuffle new cards using Restoration image set only on this page
  const selectedContents = shuffleArray([...cardContents]).slice(0, numCardPairs)
    const newCards = shuffleArray(
      selectedContents
        .flatMap((content) => [
          { id: `${content}-${Math.random()}`, content, isFlipped: false, isMatched: false },
          { id: `${content}-${Math.random()}`, content, isFlipped: false, isMatched: false },
        ])
    )
    setCards(newCards)
  }, [numCardPairs, playerNames])

  // Initialize game on mount
  useEffect(() => {
    resetGame()
  }, [resetGame])

  useEffect(() => {
    const lastHint = localStorage.getItem("cardSizeHintLastShown")
    const now = Date.now()
    const threeDays = 1000 * 60 * 60 * 24 * 3
    if (!lastHint || now - Number(lastHint) > threeDays) {
      setShowCardSizeHint(true)
      localStorage.setItem("cardSizeHintLastShown", now.toString())
    }
  }, [])

  useEffect(() => {
    if (showCardSizeHint) {
      const timer = setTimeout(() => {
        setHintFading(true);
        setTimeout(() => setShowCardSizeHint(false), 400);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showCardSizeHint]);

  const dismissCardSizeHint = useCallback(() => {
    setHintFading(true);
    setTimeout(() => setShowCardSizeHint(false), 400);
  }, []);

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
        const newCards = cards.map((card) =>
          card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card
        )
        
        setCards(newCards)
        setScores((prevScores) => {
          const newScores = [...prevScores]
          newScores[currentPlayerIndex] += 1

          const allMatchedNext = newCards.every((c) => c.isMatched)
          if (allMatchedNext && !hasGameEnded) {
            const maxScore = Math.max(...newScores)
            const winnerIndex = newScores.indexOf(maxScore)
            const winnerName = playerNames[winnerIndex]
            setWinner(winnerName)
            setShowWinnerModal(true)
            setHasGameEnded(true)
          } else {
            setToastMessage(t('correct'))
            setShowToast(true)
            setTimeout(() => setShowToast(false), 1500)
          }
          return newScores
        })
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

  // Efeito para verificar o vencedor quando o jogo terminar
  useEffect(() => {
    const isGameComplete = cards.length > 0 && cards.every(card => card.isMatched)
    if (isGameComplete && !hasGameEnded) {
      // Pequeno delay para garantir que todas as animações de carta terminaram
      setTimeout(() => {
        const maxScore = Math.max(...scores)
        const winnerIndex = scores.indexOf(maxScore)
        const winnerName = playerNames[winnerIndex]
        setWinner(winnerName)
        setShowWinnerModal(true)
        setHasGameEnded(true)
      }, 500)
    }
  }, [cards, playerNames, hasGameEnded])

  // Função para reiniciar o jogo
  const handleRestart = () => {
    setShowWinnerModal(false)
    resetGame()
  }

  // Renderização do Modal de Vencedor
  const renderWinnerModal = () => {
    if (!showWinnerModal) return null;
    return (
      <WinnerModal
        winner={winner}
        score={scores[scores.indexOf(Math.max(...scores))]}
        onPlayAgain={handleRestart}
        onReturn={() => router.push("/memory-game")}
      />
    );
  }

  // Componente do Placar Arrastável
  const DraggableScoreBoard = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [cardWidth] = useState(200) // 200px - tamanho intermediário
    const dragInfo = useRef({ mouseDown: false, startX: 0, startY: 0, moved: false })

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
            onMouseDown={e => {
              dragInfo.current.mouseDown = true;
              dragInfo.current.startX = e.clientX;
              dragInfo.current.startY = e.clientY;
              dragInfo.current.moved = false;
            }}
            onMouseMove={e => {
              if (dragInfo.current.mouseDown) {
                const dx = Math.abs(e.clientX - dragInfo.current.startX);
                const dy = Math.abs(e.clientY - dragInfo.current.startY);
                if (dx > 5 || dy > 5) dragInfo.current.moved = true;
              }
            }}
            onMouseUp={e => {
              if (!dragInfo.current.moved) {
                setIsScoreboardCollapsed(v => !v);
              }
              dragInfo.current.mouseDown = false;
            }}
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Users className="h-4 w-4 text-brand-primary-700 shrink-0" />
              <span className="text-base font-medium text-brand-primary-800 truncate">
                {t('scoreboard')}
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
                    <span className="font-bold whitespace-nowrap">{scores[index]} {t(scores[index] === 1 ? 'pair' : 'pairs')}</span>
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
    <div
      className="h-screen overflow-hidden flex flex-col bg-cover bg-center bg-fixed transition-[background-image] duration-300 ease-in-out"
      style={{ backgroundImage: "url(/images/nauvoo.jpeg)" }}
    >
      {/* Modal de Vencedor */}
      {renderWinnerModal()}

      {/* English language warning */}
      {language === 'en' && (
        <div className="bg-yellow-200 text-yellow-900 text-center py-3 px-4 font-semibold shadow-md">
          Restoration game cards are not available in English yet.
        </div>
      )}

      {/* Título no topo */}
      <div className="bg-white/30 backdrop-blur-sm border-b border-brand-primary-100/30 py-4 shadow-md flex justify-center">
        <h1 className="text-3xl font-semibold text-brand-primary-900/90 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm inline-block tracking-tight">{t('memoryGame')}</h1>
      </div>

      {/* Placar Arrastável */}
      <DraggableScoreBoard />

      {/* Área principal do jogo */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-y-auto z-0">
          <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-32">
            {/* Zoom controls */}
            <div className="bubble-wrap" style={{ position: 'fixed', right: 88, bottom: 96, zIndex: 40, pointerEvents: 'none' }}>
              {showCardSizeHint && (
                <div
                  className={`speech-bubble${hintFading ? ' fade-out' : ''}`}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 52px 12px 18px',
                    maxWidth: 'min(90vw, 880px)',
                    background: '#fff',
                    color: '#6b2f00',
                    borderRadius: 9999,
                    boxShadow: '0 6px 20px rgba(0,0,0,.20)',
                    pointerEvents: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span className="bubble-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t('adjustCards')}</span>
                  <button
                    onClick={dismissCardSizeHint}
                    className="close"
                    aria-label="Fechar"
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 28,
                      height: 28,
                      borderRadius: 9999,
                      background: 'rgba(255,255,255,.95)',
                      boxShadow: '0 1px 3px rgba(0,0,0,.14)',
                      display: 'grid',
                      placeItems: 'center',
                      border: 0,
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.415L11.414 10l4.95 4.95a1 1 0 01-1.414 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" /></svg>
                  </button>
                  <style>{`
                    .speech-bubble.fade-out {
                      opacity: 0;
                      transition: opacity 0.4s;
                    }
                    .speech-bubble {
                      transition: opacity 0.4s;
                    }
                    .speech-bubble::after,
                    .speech-bubble::before {
                      content: none !important;
                      display: none !important;
                    }
                  `}</style>
                </div>
              )}
            </div>
            <div className="zoom-buttons" style={{ position: 'fixed', right: 24, bottom: 80, zIndex: 10 }}>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => setCardSize(prev => ({ 
                    min: Math.min(prev.min + 10, 220), 
                    max: Math.min(prev.max + 10, 240) 
                  }))} 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50"
                >
                  +
                </Button>
                <Button 
                  onClick={() => setCardSize(prev => ({ 
                    min: Math.max(prev.min - 10, 80), 
                    max: Math.max(prev.max - 10, 100) 
                  }))} 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50"
                >
                  -
                </Button>
              </div>
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
      <div className="relative z-10 w-full bg-white/30 backdrop-blur-sm border-t border-brand-primary-100/30 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Grupo da esquerda: botões */}
            <div className="flex items-center gap-3 justify-start">
              <Button
                onClick={() => router.push("/memory-game")}
                variant="outline"
                className="border-brand-accent-100/30 text-white hover:text-white hover:bg-brand-accent-50/30 bg-transparent rounded-full"
                size="sm"
              >
                {t('back')}
              </Button>
              <Button
                onClick={() => {
                  setLockBoard(true)
                  setTimeout(() => {
                    resetGame()
                  }, 300)
                }}
                className="bg-gradient-to-r from-brand-primary-600 to-brand-primary-700 hover:from-brand-primary-700 hover:to-brand-primary-800 text-white shadow-md rounded-full"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {t('restart')}
              </Button>
            </div>

            {/* Grupo do centro: vez do jogador */}
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-3 text-brand-primary-800/90 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Users className="h-6 w-6 text-brand-primary-600" />
                <span className="text-xl font-bold whitespace-nowrap">{t('turnOf', { player: playerNames[currentPlayerIndex] })}</span>
              </div>
            </div>

            {/* Espaço à direita para manter simetria */}
            <div></div>
          </div>

          {/* Mensagem de vitória */}
          {allCardsMatched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-lg font-semibold text-brand-primary-700"
            >
              {t('winnerMessage', { player: playerNames[scores.indexOf(Math.max(...scores))] })}
            </motion.div>
          )}
        </div>
      </div>

      <CustomToast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CustomToast } from "@/components/custom-toast"
import { RotateCcw, Users } from "lucide-react"
import { MemoryCard } from "@/components/memory-card"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useLanguage } from "@/lib/i18n/language-context"
import { useCardSize } from "@/hooks/use-card-size"
import { WinnerModal } from "@/components/winner-modal-new"

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


// Christmas image sets
const christmasContentsPT = [
  "/images/Christmas/anjo_gabriel.webp",
  "/images/Christmas/anjos.webp",
  "/images/Christmas/belém.webp",
  "/images/Christmas/censo.webp",
  "/images/Christmas/estabulo.webp",
  "/images/Christmas/estrela_belem.webp",
  "/images/Christmas/incenso.webp",
  "/images/Christmas/jesus_bebe.webp",
  "/images/Christmas/jose.webp",
  "/images/Christmas/manjedoura.webp",
  "/images/Christmas/maria.webp",
  "/images/Christmas/mirra1.jpg",
  "/images/Christmas/nazare.webp",
  "/images/Christmas/ouro.webp",
  "/images/Christmas/ovelhas.webp",
  "/images/Christmas/tres_reis_magos.webp",
];

const christmasContentsEN = [
  "/images/Christmas/christmas-english/angel-gabriel.jpg",
  "/images/Christmas/christmas-english/angels.jpg",
  "/images/Christmas/christmas-english/bethlehem.jpg",
  "/images/Christmas/christmas-english/census.jpg",
  "/images/Christmas/christmas-english/the-stable.jpg",
  "/images/Christmas/christmas-english/bethlehem-star.jpg",
  "/images/Christmas/christmas-english/incense.jpg",
  "/images/Christmas/christmas-english/baby-jesus.jpg",
  "/images/Christmas/christmas-english/joseph.jpg",
  "/images/Christmas/christmas-english/the-manger.jpg",
  "/images/Christmas/christmas-english/mary.jpg",
  "/images/Christmas/christmas-english/myrh.jpg",
  "/images/Christmas/christmas-english/bethlehem.jpg", // used as nazare equivalent
  "/images/Christmas/christmas-english/gold.jpg",
  "/images/Christmas/christmas-english/sheep.jpg",
  "/images/Christmas/christmas-english/3-wise-men.jpg",
];

export default function MemoryGameChristmasPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialPlayerNames = searchParams.get("players") ? JSON.parse(searchParams.get("players")!) : ["Jogador 1"]
  const initialNumCardPairs = searchParams.get("pairs") ? Number.parseInt(searchParams.get("pairs")!) : 5

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
  const [isDraw, setIsDraw] = useState(false)
  const [hasGameEnded, setHasGameEnded] = useState(false)

  const { cardSize, setCardSize } = useCardSize(numCardPairs)
  // Use dynamic card sizing based on screen size and number of cards
  const [scoreBoardPosition, setScoreBoardPosition] = useState({ x: 20, y: 20 })
  const [isScoreboardCollapsed, setIsScoreboardCollapsed] = useState(false)

  const resetGame = useCallback(() => {
    setFlippedCards([])
    setCurrentPlayerIndex(0)
    setScores(playerNames.map(() => 0))
    setLockBoard(false)
    setHasGameEnded(false)

  // Escolher imagens conforme o idioma
  const contents = language === 'en' ? christmasContentsEN : christmasContentsPT;
  const maxPairs = Math.min(numCardPairs, Math.floor(contents.length))
  const selectedContents = shuffleArray([...contents]).slice(0, maxPairs)
    const doubled = selectedContents.flatMap((content) => [content, content])
    const withIds = shuffleArray(doubled).map((content, idx) => ({
      id: `${content}#${idx}`, // id determinístico (sem Math.random)
      content,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(withIds)
  }, [numCardPairs, playerNames, language])

  // Ajustar posição do placar após montar (opcional)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScoreBoardPosition((pos) => ({ x: Math.min(window.innerWidth - 240, Math.max(20, pos.x)), y: pos.y }))
    }
  }, [])

  useEffect(() => {
    resetGame()
  }, [resetGame])

  useEffect(() => {
    if (flippedCards.length === 2) {
      setLockBoard(true)
      const [firstCardId, secondCardId] = flippedCards
      const firstCard = cards.find((card) => card.id === firstCardId)
      const secondCard = cards.find((card) => card.id === secondCardId)

      if (firstCard?.content === secondCard?.content) {
        const newCards = cards.map((card) =>
          card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card
        )
        setCards(newCards)
        setScores((prev) => {
          const s = [...prev]
          s[currentPlayerIndex] += 1

          const allMatchedNext = newCards.every((c) => c.isMatched)
          if (allMatchedNext && !hasGameEnded) {
            const maxScore = Math.max(...s)
            const winners = playerNames.filter((_, idx) => s[idx] === maxScore)
            if (winners.length > 1) {
              setIsDraw(true)
              let winnerStr = ""
              if (winners.length === 2) {
                winnerStr = winners.join(" e ")
              } else {
                winnerStr = winners.slice(0, -1).join(", ") + " e " + winners[winners.length - 1]
              }
              setWinner(winnerStr)
            } else {
              setIsDraw(false)
              setWinner(winners[0])
            }
            setShowWinnerModal(true)
            setHasGameEnded(true)
          } else {
            setToastMessage(t('correct'))
            setShowToast(true)
            setTimeout(() => setShowToast(false), 1500)
          }
          return s
        })
        setFlippedCards([])
        setLockBoard(false)
        
      } else {
        setTimeout(() => {
          setCards((prevCards) => prevCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card
          ))
          setFlippedCards([])
          setLockBoard(false)
          setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length)
        }, 1000)
      }
    }
  }, [flippedCards, cards, currentPlayerIndex, playerNames])

  const DraggableScoreBoard = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [cardWidth] = useState(200)
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
          setScoreBoardPosition({ x: scoreBoardPosition.x + info.offset.x, y: scoreBoardPosition.y + info.offset.y })
        }}
        className="fixed z-50 touch-none select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <Card 
          className="bg-white/90 backdrop-blur-sm shadow-lg border-brand-primary-100 rounded-2xl overflow-hidden"
          style={{ width: `${cardWidth}px`, height: isScoreboardCollapsed ? '40px' : 'auto', transition: 'height 0.3s ease' }}
        >
          <div className="h-10 w-full bg-red-100 cursor-grab active:cursor-grabbing flex justify-between items-center px-4">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Users className="h-4 w-4 text-red-700 shrink-0" />
              <span className="text-base font-medium text-red-800 truncate">{t('scoreboard')}</span>
            </div>
            <button 
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-200/50 transition-colors shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsScoreboardCollapsed(!isScoreboardCollapsed)
              }}
            >
              <svg className={`w-4 h-4 transition-transform ${isScoreboardCollapsed ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
          </div>
          <div className={`${isScoreboardCollapsed ? 'h-0 opacity-0 pointer-events-none' : 'opacity-100'} overflow-hidden transition-all duration-300`}>
            <CardContent className="p-4">
              <div className="space-y-2">
                {playerNames.map((name, index) => (
                  <div key={index} className={`flex justify-between items-center p-2 rounded-2xl transition-colors ${index === currentPlayerIndex ? "bg-red-100 text-red-800 font-medium" : "text-brand-text-medium hover:bg-red-50"}`}>
                    <span className="font-medium truncate mr-2">{name}</span>
                    <span className="font-bold whitespace-nowrap">{scores[index]} {scores[index] === 1 ? t('pair') : t('pairs')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    )
  }

  const allCardsMatched = cards.length > 0 && cards.every((card) => card.isMatched)

  const handleRestart = () => {
    setShowWinnerModal(false)
    resetGame()
  }

  // Modal de vencedor unificado
  const WinnerModalWrapper = () => (
    <WinnerModal
      winner={winner}
      score={scores[playerNames.indexOf(winner)]}
      onPlayAgain={handleRestart}
      onReturn={() => router.push("/memory-game")}
    />
  )

  const [showCardSizeHint, setShowCardSizeHint] = useState(false);
  const [hintFading, setHintFading] = useState(false);

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
  }, [showCardSizeHint])

  const dismissCardSizeHint = useCallback(() => {
    setHintFading(true);
    setTimeout(() => setShowCardSizeHint(false), 400);
  }, [])

  return (
    <div
      className="h-screen overflow-hidden flex flex-col bg-cover bg-center bg-fixed transition-[background-image] duration-300 ease-in-out"
      style={{ backgroundImage: "url(/images/Christmas/natal_bg.webp)" }}
    >
      {showWinnerModal && <WinnerModalWrapper />}
      <div className="bg-white/30 backdrop-blur-sm border-b border-red-100/30 py-4 shadow-md flex justify-center">
        <h1 className="text-3xl font-semibold text-red-900/90 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm inline-block tracking-tight">{t('memoryGame')} - Natal</h1>
      </div>

      <DraggableScoreBoard />

      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4">
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
                    whiteSpace: 'nowrap',
                    background: '#fff',
                    color: '#6b2f00',
                    borderRadius: 9999,
                    boxShadow: '0 6px 20px rgba(0,0,0,.20)',
                    pointerEvents: 'auto',
                    zIndex: 30,
                  }}
                >
                  <span className="bubble-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Ajuste o tamanho dos cards por aqui!</span>
                  <button
                    onClick={dismissCardSizeHint}
                    className="close"
                    aria-label={t('close')}
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 28,
                      height: 28,
                      border: 0,
                      borderRadius: 9999,
                      background: 'rgba(255,255,255,.95)',
                      boxShadow: '0 1px 3px rgba(0,0,0,.14)',
                      display: 'grid',
                      placeItems: 'center',
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
            <div className="grid gap-4 w-full place-content-center" style={{ 
              gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize.min}px, ${cardSize.max}px))`,
              margin: '0 auto',
              maxWidth: `calc(${cardSize.max}px * 6 + 16px * 5)`, // 6 columns max with gaps
              gap: '16px',
              justifyContent: 'center',
              alignContent: 'center'
            }}>
              {cards.map((card) => (
                <MemoryCard
                  key={card.id}
                  id={card.id}
                  content={card.content}
                  isFlipped={card.isFlipped || flippedCards.includes(card.id)}
                  isMatched={card.isMatched}
                  onClick={(id) => {
                    if (lockBoard) return
                    const clickedCard = cards.find((c) => c.id === id)
                    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return
                    const newCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
                    setCards(newCards)
                    setFlippedCards((prev) => [...prev, id])
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white/30 backdrop-blur-sm border-t border-red-100/30 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="flex items-center gap-3 justify-start">
              <Button onClick={() => router.push("/memory-game")} variant="outline" className="border-red-100/30 text-white hover:text-white hover:bg-red-50/30 bg-transparent rounded-full" size="sm">{t('back')}</Button>
              <Button onClick={() => { setLockBoard(true); setTimeout(() => { resetGame() }, 300) }} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md rounded-full" size="sm">
                <RotateCcw className="mr-2 h-4 w-4" /> {t('restart')}
              </Button>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-3 text-red-800/90 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Users className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold whitespace-nowrap">{t('turnOf', { player: playerNames[currentPlayerIndex] })}</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <CustomToast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}

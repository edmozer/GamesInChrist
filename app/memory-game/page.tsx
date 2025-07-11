"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Brain, Play, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation" // Importar useRouter

export default function MemoryGameSetupPage() {
  const router = useRouter() // Inicializar useRouter
  const [numPlayers, setNumPlayers] = useState(1)
  const [playerNames, setPlayerNames] = useState<string[]>(["Jogador 1"])
  const [numCardPairs, setNumCardPairs] = useState(8) // Default to 8 pairs

  const handleNumPlayersChange = (value: number[]) => {
    const newNumPlayers = value[0]
    setNumPlayers(newNumPlayers)
    // Adjust player names array size
    setPlayerNames((prevNames) => {
      const newNames = [...prevNames]
      while (newNames.length < newNumPlayers) {
        newNames.push(`Jogador ${newNames.length + 1}`)
      }
      return newNames.slice(0, newNumPlayers)
    })
  }

  const handlePlayerNameChange = (index: number, name: string) => {
    setPlayerNames((prevNames) => {
      const newNames = [...prevNames]
      newNames[index] = name
      return newNames
    })
  }

  const handleNumCardPairsChange = (value: number[]) => {
    setNumCardPairs(value[0])
  }

  const startGame = () => {
    // Navegar para a página do jogo, passando as configurações via query parameters
    const encodedPlayerNames = encodeURIComponent(JSON.stringify(playerNames))
    router.push(`/memory-game/play?players=${encodedPlayerNames}&pairs=${numCardPairs}`)
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-brand-primary-50 via-brand-primary-100 to-brand-secondary-100 p-4">
      <Card className="w-full max-w-2xl border border-brand-primary-100 bg-white/60 backdrop-blur-lg shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 mx-auto bg-brand-primary-600 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-brand-primary-900">Configurar Jogo da Memória</CardTitle>
          <CardDescription className="text-brand-text-medium">
            Defina as opções para sua partida e prepare-se para testar sua memória!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Número de Jogadores */}
          <div className="space-y-4">
            <Label
              htmlFor="num-players"
              className="text-lg font-semibold text-brand-primary-800 flex items-center gap-2"
            >
              <Users className="h-5 w-5 text-brand-primary-600" />
              Quantos Jogadores? ({numPlayers})
            </Label>
            <Slider
              id="num-players"
              min={1}
              max={4}
              step={1}
              value={[numPlayers]}
              onValueChange={handleNumPlayersChange}
              className="w-full [&>span:first-child]:bg-brand-accent-500 [&>span:first-child]:hover:bg-brand-accent-600 [&>span:last-child]:bg-brand-accent-500 [&>span:last-child]:hover:bg-brand-accent-600 [&>span:last-child]:transition-all [&>span:last-child]:duration-200 [&>span:last-child]:ease-out [&>span:last-child]:active:scale-110 [&>span:last-child]:active:shadow-lg"
            />
            <div className="flex justify-between text-sm text-brand-text-light">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>

          {/* Nomes dos Jogadores com Animação */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-brand-primary-800">Nome dos Jogadores:</Label>
            <div className="grid gap-4">
              <AnimatePresence initial={false}>
                {Array.from({ length: numPlayers }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Label htmlFor={`player-name-${index + 1}`} className="sr-only">
                      Nome do Jogador {index + 1}
                    </Label>
                    <Input
                      id={`player-name-${index + 1}`}
                      placeholder={`Jogador ${index + 1}`}
                      value={playerNames[index]}
                      onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                      className="bg-white/60 border-brand-primary-100 text-brand-text-dark placeholder:text-brand-text-light focus:border-brand-accent-500 focus:ring-brand-accent-500"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Número de Pares de Cartas */}
          <div className="space-y-4">
            <Label
              htmlFor="num-card-pairs"
              className="text-lg font-semibold text-brand-primary-800 flex items-center gap-2"
            >
              <Brain className="h-5 w-5 text-brand-primary-600" />
              Número de Pares de Cartas ({numCardPairs})
            </Label>
            <Slider
              id="num-card-pairs"
              min={4}
              max={16}
              step={2}
              value={[numCardPairs]}
              onValueChange={handleNumCardPairsChange}
              className="w-full [&>span:first-child]:bg-brand-accent-500 [&>span:first-child]:hover:bg-brand-accent-600 [&>span:last-child]:bg-brand-accent-500 [&>span:last-child]:hover:bg-brand-accent-600 [&>span:last-child]:transition-all [&>span:last-child]:duration-200 [&>span:last-child]:ease-out [&>span:last-child]:active:scale-110 [&>span:last-child]:active:shadow-lg"
            />
            <div className="flex justify-between text-sm text-brand-text-light">
              <span>4 Pares</span>
              <span>8 Pares</span>
              <span>12 Pares</span>
              <span>16 Pares</span>
            </div>
          </div>

          <Button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-brand-primary-600 to-brand-primary-700 hover:from-brand-primary-700 hover:to-brand-primary-800 text-white shadow-lg text-lg py-6"
          >
            <Play className="mr-2 h-5 w-5" />
            Iniciar Jogo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

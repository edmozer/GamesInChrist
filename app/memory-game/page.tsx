"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Brain, Play, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation" // Importar useRouter

export default function MemoryGameSetupPage() {
  const router = useRouter() // Inicializar useRouter
  const [numPlayers, setNumPlayers] = useState(1)
  const [playerNames, setPlayerNames] = useState<string[]>(["Jogador 1"])
  const [numCardPairs, setNumCardPairs] = useState(14) // Default to 14 pairs
  const [version, setVersion] = useState<'restauracao' | 'natal'>('restauracao')

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

  const handleNumCardPairsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) return
    const clampedValue = Math.min(Math.max(value, 2), 25)
    setNumCardPairs(clampedValue)
  }

  const startGame = () => {
    // Navegar para a página do jogo, passando as configurações via query parameters
    const encodedPlayerNames = encodeURIComponent(JSON.stringify(playerNames))
    if (version === 'natal') {
      router.push(`/memory-game/play/christmas?players=${encodedPlayerNames}&pairs=${numCardPairs}`)
    } else {
      router.push(`/memory-game/play?players=${encodedPlayerNames}&pairs=${numCardPairs}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[url('/images/beack-bg.png')] bg-cover bg-center bg-fixed p-4">
      {/* Main Card */}
      <Card className="w-full max-w-2xl border border-brand-primary-100/30 bg-white/30 backdrop-blur-sm shadow-lg mb-4 rounded-3xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 mx-auto bg-brand-primary-600/90 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold text-brand-primary-900/90 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm inline-block tracking-tight">Configurar Jogo da Memória</CardTitle>
          <CardDescription className="text-brand-text-medium/90">
            Defina as opções para sua partida e prepare-se para testar sua memória!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Número de Jogadores */}
          <div className="space-y-4">
            <Label
              className="text-lg font-semibold text-brand-primary-900 flex items-center gap-2 drop-shadow-md"
            >
              <Users className="h-5 w-5 text-brand-primary-700" />
              Número de Jogadores
            </Label>
            <div className="flex gap-6 justify-center items-center flex-wrap">
              {[1, 2, 3, 4].map((num) => (
                <label key={num} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={numPlayers === num}
                    onChange={() => handleNumPlayersChange([num])}
                    className="h-5 w-5 text-brand-accent-600 border-2 border-brand-accent-500/30 checked:bg-brand-accent-600 checked:border-brand-accent-600 rounded-full focus:ring-2 focus:ring-brand-accent-500 focus:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="text-brand-primary-800 text-lg font-medium">{num}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nomes dos Jogadores com Animação */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-brand-primary-900 drop-shadow-md">Nome dos Jogadores:</Label>
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
                      className="bg-white/60 border-brand-primary-100 text-brand-text-dark placeholder:text-brand-text-light focus:border-brand-accent-500 focus:ring-brand-accent-500 rounded-2xl"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Versão do jogo */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-brand-primary-900 drop-shadow-md">Versão</Label>
            <div>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as 'restauracao' | 'natal')}
                className="w-full bg-white/60 border-brand-primary-100 text-brand-text-dark focus:border-brand-accent-500 focus:ring-brand-accent-500 rounded-2xl p-3"
              >
                <option value="restauracao">Restauração</option>
                <option value="natal">Natal</option>
              </select>
            </div>
          </div>

          {/* Número de Pares de Cartas */}
          <div className="space-y-4">
            <Label
              htmlFor="num-card-pairs"
              className="text-lg font-semibold text-brand-primary-900 flex items-center gap-2 drop-shadow-md"
            >
              <Brain className="h-5 w-5 text-brand-primary-600" />
              Número de Pares de Cartas
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="num-card-pairs"
                type="number"
                min={2}
                max={25}
                value={numCardPairs}
                onChange={handleNumCardPairsChange}
                className="w-28 text-center bg-white/60 border-brand-primary-100 text-brand-text-dark placeholder:text-brand-text-light focus:border-brand-accent-500 focus:ring-brand-accent-500 rounded-2xl"
              />
              <span className="text-sm text-brand-text-medium">
                (Min: 2, Max: 25 pares)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-brand-primary-600 to-brand-primary-700 hover:from-brand-primary-700 hover:to-brand-primary-800 text-white shadow-lg text-lg py-6 rounded-full"
            >
              <Play className="mr-2 h-5 w-5" />
              Iniciar Jogo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Back button fixed to bottom left */}
      <Button
        onClick={() => router.push("/")}
        variant="outline"
        className="fixed bottom-6 left-6 z-50 border-brand-accent-100/30 text-white hover:text-white hover:bg-brand-accent-50/30 bg-white/30 backdrop-blur-sm shadow-md rounded-full py-4"
      >
        Voltar ao Início
      </Button>
    </div>
  )
}

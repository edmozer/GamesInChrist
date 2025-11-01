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
  const [numCardPairsError, setNumCardPairsError] = useState("");
  const router = useRouter() // Inicializar useRouter
  const [numPlayers, setNumPlayers] = useState(1)
  const [playerNames, setPlayerNames] = useState<string[]>(["Jogador 1"])
  const [numCardPairs, setNumCardPairs] = useState(14) // Valor numérico
  const [numCardPairsInput, setNumCardPairsInput] = useState("14") // Valor do input como string
  const [version, setVersion] = useState<'restauracao' | 'natal'>('natal')

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
    const raw = event.target.value;
    setNumCardPairsInput(raw);
    setNumCardPairsError("");
    if (raw === "") return;
    const value = parseInt(raw);
    if (!isNaN(value)) {
      if (value < 2 || value > 25) {
        setNumCardPairsError("O número de pares deve ser entre 2 e 25.");
      } else {
        setNumCardPairs(value);
      }
    }
  }

  const isNumCardPairsValid =
    numCardPairsInput !== "" &&
    !isNaN(Number(numCardPairsInput)) &&
    Number(numCardPairsInput) >= 2 &&
    Number(numCardPairsInput) <= 25;

  const startGame = () => {
    if (!isNumCardPairsValid) return;
    // Navegar para a página do jogo, passando as configurações via query parameters
    const encodedPlayerNames = encodeURIComponent(JSON.stringify(playerNames))
    if (version === 'natal') {
      router.push(`/memory-game/play/christmas?players=${encodedPlayerNames}&pairs=${numCardPairs}`)
    } else {
      router.push(`/memory-game/play?players=${encodedPlayerNames}&pairs=${numCardPairs}`)
    }
  }

  const bgImage = version === 'natal' ? "/images/Christmas/natal_bg.jpeg" : "/images/nauvoo.jpeg"
  const isChristmas = version === 'natal'
  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center bg-cover bg-center bg-fixed p-4 transition-[background-image] duration-300 ease-in-out"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Main Card */}
  <Card className={`w-full max-w-2xl border ${isChristmas ? 'border-red-100/30' : 'border-brand-primary-100/30'} bg-white/20 backdrop-blur-lg shadow-lg mb-4 rounded-3xl`}>
        <CardHeader className="text-center pb-6">
          <div className={`w-20 h-20 mx-auto ${isChristmas ? 'bg-red-600/90' : 'bg-brand-primary-600/90'} rounded-full flex items-center justify-center mb-4`}>
            <Brain className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-semibold text-brand-primary-900/90 bg-white/15 px-4 py-2 rounded-2xl backdrop-blur-lg inline-block tracking-tight">Configurar Jogo da Memória</CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Número de Jogadores */}
          <div className="space-y-4">
            <Label
              className={`text-lg font-semibold ${isChristmas ? 'text-red-700' : 'text-brand-primary-900'} flex items-center gap-2 drop-shadow-md`}
            >
              <Users className={`h-5 w-5 ${isChristmas ? 'text-red-600' : 'text-brand-primary-700'}`} />
              Número de Jogadores
            </Label>
            <div className="flex gap-6 justify-center items-center flex-wrap">
              {[1, 2, 3, 4].map((num) => {
                const selected = numPlayers === num
                return (
                <label
                  key={num}
                  className={`flex items-center gap-2 cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                    isChristmas
                      ? selected
                        ? 'bg-red-100 text-red-700 drop-shadow-sm'
                        : 'hover:bg-red-50'
                      : selected
                        ? 'bg-brand-primary-100 text-brand-primary-900 drop-shadow-sm'
                        : 'hover:bg-brand-primary-50'
                  }`}
                >
                  <input
                    type="radio"
                    checked={numPlayers === num}
                    onChange={() => handleNumPlayersChange([num])}
                    className={`h-5 w-5 ${isChristmas ? 'text-red-500 border-red-400/30 checked:bg-red-500 checked:border-red-500 focus:ring-red-400' : 'text-brand-accent-600 border-brand-accent-500/30 checked:bg-brand-accent-600 checked:border-brand-accent-600 focus:ring-brand-accent-500'} border-2 rounded-full focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer`}
                  />
                  <span className={`${isChristmas ? 'text-red-700' : 'text-brand-primary-900'} text-lg font-semibold`}>{num}</span>
                </label>
              )})}
            </div>
          </div>

          {/* Nomes dos Jogadores com Animação */}
          <div className="space-y-4">
            <Label className={`${isChristmas ? 'text-red-700' : 'text-brand-primary-900'} text-lg font-semibold drop-shadow-md`}>Nome dos Jogadores:</Label>
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
            <Label className={`${isChristmas ? 'text-red-700' : 'text-brand-primary-900'} text-lg font-semibold drop-shadow-md`}>Versão</Label>
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
            <Label htmlFor="num-card-pairs" className={`text-lg font-semibold ${isChristmas ? 'text-red-700' : 'text-brand-primary-900'} flex items-center gap-2 drop-shadow-md`}>
              <Brain className={`h-5 w-5 ${isChristmas ? 'text-red-600' : 'text-brand-primary-600'}`} />
              Número de Pares de Cartas
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="num-card-pairs"
                type="number"
                min={2}
                max={25}
                value={numCardPairsInput}
                onChange={handleNumCardPairsChange}
                className="w-28 text-center bg-white/60 border-brand-primary-100 text-brand-text-dark placeholder:text-brand-text-light focus:border-brand-accent-500 focus:ring-brand-accent-500 rounded-2xl"
              />
              <span className={`${isChristmas ? 'text-red-600' : 'text-brand-text-medium'} text-sm`}>
                (Min: 2, Max: 25 pares)
              </span>
              {numCardPairsError && (
                <span className="text-red-600 text-xs font-semibold block mt-1">{numCardPairsError}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={startGame}
              disabled={!isNumCardPairsValid}
              className={`w-full bg-gradient-to-r ${isChristmas ? 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'from-brand-primary-600 to-brand-primary-700 hover:from-brand-primary-700 hover:to-brand-primary-800'} text-white shadow-lg text-lg py-6 rounded-full`}
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
        className={`fixed bottom-6 left-6 z-50 ${isChristmas ? 'border-red-100/30 hover:bg-red-50/30' : 'border-brand-accent-100/30 hover:bg-brand-accent-50/30'} text-white bg-white/30 backdrop-blur-sm shadow-md rounded-full py-4`}
      >
        Voltar ao Início
      </Button>
    </div>
  )
}

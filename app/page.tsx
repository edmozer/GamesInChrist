"use client"

import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, ArrowRight, Cross, Star, BookOpen, Puzzle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function LandingPage() {
  const [showSobreModal, setShowSobreModal] = useState(false)
  const handleScrollToMemory = () => {
    if (typeof window === 'undefined') return
    const el = document.getElementById('missao-tag')
    if (!el) return
    const headerOffset = 80
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="relative flex flex-col min-h-screen font-sans text-brand-text-dark">
      <Head>
        <title>Jogos em Cristo — Jogos Cristãos Divertidos e Educativos para Toda a Família</title>
        <meta
          name="description"
          content="Descubra jogos cristãos que fortalecem a fé, ensinam valores e proporcionam diversão para crianças, jovens e famílias. Jogue online, aprenda e cresça espiritualmente!"
        />
        <meta
          name="keywords"
          content="jogos cristãos, jogos bíblicos, jogo da memória bíblico, quiz bíblico, quem sou eu bíblico, restauração, joseph smith, família cristã, ensino religioso, lds, igreja, mormon"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Edmozer Cavalcante" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Jogos em Cristo — Edifique sua fé brincando" />
        <meta
          property="og:description"
          content="Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão para todas as idades. Experimente gratuitamente!"
        />
        <meta property="og:image" content="/images/social-card.jpg" />
        <meta property="og:url" content="https://www.jogosemcristo.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jogos em Cristo — Edifique sua fé brincando" />
        <meta
          name="twitter:description"
          content="Jogos bíblicos, educativos e gratuitos para toda a família. Comece agora!"
        />
        <meta name="twitter:image" content="/images/social-card.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed inset-0 bg-[url('/images/beack-bg.png')] bg-cover bg-center bg-no-repeat -z-10" />
      <div className="relative flex flex-col min-h-screen z-10">
      {/* Header */}
      <header className="h-16 flex items-center border-b border-brand-primary-100 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
              <Image
                src="/images/logo-black.png"
                alt="Jogos em Cristo Logo"
                width={64}
                height={64}
                className="w-12 h-12 object-contain logo-img"
              />
            </div>
            <span className="text-xl font-bold text-brand-primary-800 font-heading">Jogos em Cristo</span>
          </Link>
          <nav className="hidden" />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-6 md:py-12 lg:py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-50/80 to-brand-secondary-100/80 backdrop-blur-[2px]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_450px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-brand-primary-900 leading-tight font-heading">
                    Jogos que <span className="text-brand-primary-600">edificam</span> e{" "}
                    <span className="text-brand-secondary-700">divertem</span>
                  </h1>
                  <p className="max-w-[600px] text-brand-text-medium md:text-xl leading-relaxed mx-auto lg:mx-0 font-sans">
                    Descubra uma coleção especial de jogos cristãos que combinam diversão, aprendizado e crescimento
                    espiritual. Perfeito para toda a família!
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={handleScrollToMemory}
                    className="bg-brand-primary-600 hover:bg-brand-primary-700 text-white shadow-lg transition-all duration-200"
                  >
                    Começar a Jogar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-brand-primary-100 text-brand-primary-700 hover:bg-brand-primary-50 bg-transparent transition-all duration-200"
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                  <Image
                    src="/images/familia_jogando.png"
                  width={500}
                  height={400}
                    alt="Família jogando jogos cristãos juntos"
                  className="rounded-xl object-cover shadow-2xl border-4 border-white"
                  priority
                />
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-secondary-100 rounded-full flex items-center justify-center shadow-xl transform rotate-12">
                  <Star className="h-10 w-10 text-brand-secondary-700" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-brand-primary-100 rounded-full flex items-center justify-center shadow-xl transform -rotate-12">
                  <Heart className="h-10 w-10 text-brand-primary-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider Section */}
    <section className="w-full py-2 bg-brand-primary-800 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-1 bg-brand-primary-50 rounded-full"></div>
              <div className="w-36 h-36 rounded-lg flex items-center justify-center bg-brand-primary-800">
                <Image
                  src="/images/logo-white.png"
                  alt="Jogos em Cristo Logo"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="w-24 h-1 bg-brand-primary-50 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Jogos Section */}
        <section id="jogos" className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          {/* Decorative Elements */}
          <div className="absolute -right-20 top-20 w-64 h-64 bg-brand-primary-100/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 bottom-20 w-64 h-64 bg-brand-secondary-100/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Título da Seção Jogos e Subtítulo */}
            <div className="flex flex-col items-center space-y-8 text-center mb-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary-100 to-brand-secondary-100 flex items-center justify-center mb-2 shadow-lg">
                <Heart className="h-10 w-10 text-brand-primary-600" />
              </div>
              
              <div className="space-y-6 relative">
                <div className="flex items-center justify-center space-x-3">
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-brand-primary-400 to-transparent"></div>
                  <span id="missao-tag" className="text-brand-primary-600 font-medium tracking-wide uppercase text-sm px-4 py-1 rounded-full bg-brand-primary-50">
                    Nossa Missão
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-brand-primary-400 to-transparent"></div>
                </div>

                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-primary-900 font-heading">
                  Diversão que <span className="text-brand-primary-600">fortalece</span> a fé
                  <div className="absolute -right-8 -top-8 w-16 h-16 bg-brand-secondary-100 rounded-full flex items-center justify-center transform rotate-12 opacity-80 shadow-lg">
                    <Cross className="h-8 w-8 text-brand-secondary-600" />
                  </div>
                </h2>

                <p id="intro-descricao" className="max-w-[900px] text-brand-text-medium md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed font-sans mx-auto relative">
                  Cada jogo foi <span className="text-brand-primary-700 font-medium">cuidadosamente desenvolvido</span> para proporcionar 
                  momentos de <span className="text-brand-accent-600 font-medium">alegria</span> enquanto fortalece 
                  <span className="text-brand-secondary-800 font-semibold"> conhecimento das escrituras</span> e 
                  <span className="text-brand-primary-600 font-medium"> valores cristãos</span>.
                </p>
              </div>
            </div>

            {/* Grid de Cartões de Jogos */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 place-items-center max-w-7xl mx-auto">
              <Card id="jogo-memoria" className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg overflow-hidden">
                    <Image
                      src="/images/cards.png"
                      alt="Memory Game Cards"
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">Jogo da Memória</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Teste sua memória com versículos e personagens bíblicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/memory-game" className="w-full">
                    <Button className="w-full bg-brand-accent-600 hover:bg-brand-accent-700 text-white shadow-md group-hover:shadow-lg">
                      Jogar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg overflow-hidden">
                    <Image
                      src="/images/sacred-scriptures.png"
                      alt="Sacred Scriptures"
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">Quiz Bíblico</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Desafie seus conhecimentos sobre a Palavra de Deus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    Em breve
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto bg-brand-secondary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">Quem Sou Eu?</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Descubra personagens bíblicos através de dicas especiais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    Em breve
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto bg-brand-accent-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Puzzle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">Ordem das Frases</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Organize versículos e frases bíblicas na ordem correta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    Em breve
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action - Jesus Cristo */}
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-r from-brand-primary-700 to-brand-primary-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white font-heading max-w-2xl">
                  Jesus Cristo é o seu Salvador
                </h2>
                <p className="text-brand-primary-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans max-w-[600px]">
                  Conheça mais sobre Jesus Cristo, Seu amor e Seu papel central em nossa vida e salvação.
                </p>
                <div className="flex items-center justify-center mt-8">
                  <a
                    href="https://www.churchofjesuschrist.org/welcome/savior-jesus-christ?lang=por"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 rounded-md bg-white text-brand-primary-700 hover:bg-brand-primary-50 shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
                  >
                    Saiba mais sobre Jesus Cristo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-12 w-full shrink-0 px-4 md:px-6 border-t border-brand-primary-100 bg-white/60 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Image
                    src="/images/logo-black.png"
                    alt="Jogos em Cristo Logo"
                    width={48}
                    height={48}
                    className="w-9 h-9 object-contain logo-img"
                  />
                </div>
                <span className="text-xl font-bold text-brand-primary-800 font-heading">Jogos em Cristo</span>
              </div>
              <p className="text-sm text-brand-text-medium font-sans">
                Desenvolvendo jogos que edificam, educam e divertem toda a família cristã.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">Jogos</h4>
              <ul className="space-y-2 text-sm text-brand-text-medium font-sans">
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Jogo da Memória
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Quiz Bíblico
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Quem Sou Eu?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Ordem das Frases
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">Suporte</h4>
              <ul className="space-y-2 text-sm text-brand-text-medium font-sans">
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Como Jogar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4" id="sobre">
              <h4 className="text-xl font-bold text-brand-primary-900 font-heading">Sobre o Jogo</h4>
              <p className="text-sm text-brand-text-medium font-sans">
                Este jogo foi criado com o objetivo de ensinar e reforçar os princípios da Restauração do Evangelho de Jesus Cristo de maneira divertida e interativa.
              </p>
              <p className="text-sm text-brand-text-medium font-sans">
                Através da mecânica de memória, queremos incentivar famílias, jovens e crianças a se lembrarem de eventos, símbolos e ensinamentos importantes relacionados à Primeira Visão, ao profeta Joseph Smith e à restauração da Igreja de Jesus Cristo na Terra.
              </p>
              <button
                className="mt-2 px-4 py-2 rounded-full bg-brand-primary-700 text-white font-semibold shadow hover:bg-brand-primary-800 transition-all"
                onClick={() => setShowSobreModal(true)}
              >
                Mais
              </button>
              {showSobreModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
                    <button
                      className="absolute top-2 right-2 text-brand-primary-700 hover:text-brand-primary-900 text-xl font-bold"
                      onClick={() => setShowSobreModal(false)}
                      aria-label="Fechar"
                    >
                      ×
                    </button>
                    <h5 className="text-base font-semibold text-brand-primary-900 mb-2">Criação e Desenvolvimento</h5>
                    <p className="text-sm text-brand-text-medium font-sans mb-4">
                      Projeto idealizado e desenvolvido por Edmozer Cavalcante.<br />
                      Saiba mais ou entre em contato: <a href="https://www.linkedin.com/in/edmozer" target="_blank" rel="noopener noreferrer" className="text-brand-primary-700 underline">LinkedIn</a>
                    </p>
                    <h5 className="text-base font-semibold text-brand-primary-900 mb-2">Desenvolvimento Técnico <span className="align-middle">▼</span></h5>
                    <ul className="list-disc list-inside text-sm text-brand-text-medium font-sans mb-4">
                      <li>Next.js e React para estrutura e lógica do site</li>
                      <li>TypeScript para tipagem e segurança</li>
                      <li>TailwindCSS para estilização moderna e responsiva</li>
                      <li>Integração com IA (GitHub Copilot) para otimização e boas práticas</li>
                      <li>Animações CSS para uma experiência fluida</li>
                      <li>Layout totalmente responsivo e adaptativo</li>
                    </ul>
                    <p className="text-xs text-brand-text-medium font-sans">
                      © 2025 — Este projeto é um esforço pessoal e sem fins lucrativos.<br />
                      Desenvolvido com auxílio de IA em um processo de programação inovador.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-brand-primary-100 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-brand-text-medium font-sans">
              © {new Date().getFullYear()} Jogos em Cristo. Feito com ❤️ para a glória de Deus.
            </p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <Link href="#" className="text-xs text-brand-text-medium hover:text-brand-primary-700">
                Termos de Uso
              </Link>
              <Link href="#" className="text-xs text-brand-text-medium hover:text-brand-primary-700">
                Privacidade
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}

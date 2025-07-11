import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, ArrowRight, Cross, Star, BookOpen, Puzzle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-background font-sans text-brand-text-dark">
      {/* Header */}
      <header className="h-16 flex items-center border-b border-brand-primary-100 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-brand-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <Cross className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-primary-800 font-heading">Jogos Cristãos</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#jogos"
              className="text-sm font-medium text-brand-text-medium hover:text-brand-primary-700 hover:underline underline-offset-4"
            >
              Jogos
            </Link>
            <Link
              href="#sobre"
              className="text-sm font-medium text-brand-text-medium hover:text-brand-primary-700 hover:underline underline-offset-4"
            >
              Sobre
            </Link>
            <Link
              href="#contato"
              className="text-sm font-medium text-brand-text-medium hover:text-brand-primary-700 hover:underline underline-offset-4"
            >
              Contato
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-brand-primary-50 to-brand-secondary-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_450px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-brand-primary-50 px-4 py-2 text-sm font-medium text-brand-primary-800 border border-brand-primary-100 shadow-sm">
                    ✨ Diversão com propósito
                  </div>
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
                  src="/placeholder.svg?height=400&width=400" // Substitua pelo caminho da sua imagem
                  width={400}
                  height={400}
                  alt="Imagem ilustrativa de jogos cristãos"
                  className="rounded-xl object-cover shadow-2xl border-4 border-white"
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
        <section className="w-full py-12 bg-brand-primary-800 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-1 bg-brand-primary-50 rounded-full"></div>
              <Cross className="h-6 w-6 text-brand-primary-50" />
              <div className="w-24 h-1 bg-brand-primary-50 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Jogos Section */}
        <section id="jogos" className="w-full py-16 md:py-28 lg:py-36 bg-brand-background">
          <div className="container px-4 md:px-6">
            {/* Título da Seção Jogos e Subtítulo */}
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-full bg-brand-primary-50 px-4 py-2 text-sm font-medium text-brand-primary-800 border border-brand-primary-100 shadow-sm">
                🎮 Nossos Jogos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-primary-900 font-heading">
                Diversão que fortalece a fé
              </h2>
              <p className="max-w-[900px] text-brand-text-medium md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans mx-auto">
                Cada jogo foi cuidadosamente desenvolvido para proporcionar momentos de alegria enquanto fortalece
                conhecimentos bíblicos e valores cristãos.
              </p>
            </div>

            {/* Grid de Cartões de Jogos */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-5xl">
              <Card className="group hover:shadow-xl transition-all duration-300 border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto bg-brand-accent-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading">Jogo da Memória</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Teste sua memória com versículos e personagens bíblicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/memory-game" className="w-full">
                    <Button className="w-full bg-brand-accent-600 hover:bg-brand-accent-700 text-white shadow-md">
                      Jogar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl transition-all duration-300 border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto bg-brand-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading">Quiz Bíblico</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Desafie seus conhecimentos sobre a Palavra de Deus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-brand-primary-600 hover:bg-brand-primary-700 text-white shadow-md">
                    Jogar Agora
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl transition-all duration-300 border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto bg-brand-secondary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading">Quem Sou Eu?</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Descubra personagens bíblicos através de dicas especiais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-brand-secondary-600 hover:bg-brand-secondary-700 text-white shadow-md">
                    Jogar Agora
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-xl transition-all duration-300 border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto bg-brand-accent-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Puzzle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading">Ordem das Frases</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    Organize versículos e frases bíblicas na ordem correta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-brand-accent-600 hover:bg-brand-accent-700 text-white shadow-md">
                    Jogar Agora
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-r from-brand-primary-700 to-brand-primary-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white font-heading">
                Pronto para começar sua jornada?
              </h2>
              <p className="mx-auto max-w-[600px] text-brand-primary-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans">
                Junte-se a milhares de famílias que já descobriram a alegria de aprender brincando. Comece agora mesmo!
              </p>
              <div className="space-x-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-primary-700 hover:bg-brand-primary-50 shadow-lg"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary-600 rounded-lg flex items-center justify-center">
                  <Cross className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-brand-primary-800 font-heading">Jogos Cristãos</span>
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
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">Sobre Nós</h4>
              <p className="text-sm text-brand-text-medium font-sans">
                Somos uma equipe apaixonada por criar experiências digitais que fortalecem a fé e promovem valores
                cristãos. Nossos jogos são desenvolvidos com amor e cuidado, pensando em cada detalhe para proporcionar
                momentos especiais de aprendizado e diversão para toda a família.
              </p>
              <p className="text-sm text-brand-text-medium font-sans">
                Acreditamos que a tecnologia pode ser uma ferramenta poderosa para espalhar o amor de Cristo e edificar
                vidas através da Palavra de Deus.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-brand-primary-100 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-brand-text-medium font-sans">
              © {new Date().getFullYear()} Jogos Cristãos. Feito com ❤️ para a glória de Deus.
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
  )
}

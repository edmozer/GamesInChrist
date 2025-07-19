"use client"

import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, ArrowRight, Cross, Star, BookOpen, Puzzle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ImageCarousel from "@/components/image-carousel"
import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import React from "react"

export default function LandingPage() {
  const [showSobreModal, setShowSobreModal] = useState(false)
  const { language, setLanguage } = useLanguage()
  const languageLabels = {
    pt: 'Português',
    en: 'English',
    es: 'Español',
  }
  const languageIcons = {
    pt: '🇧🇷',
    en: '🇺🇸',
    es: '🇪🇸',
  }
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  // Translation object for all UI texts
  const translations: Record<'pt' | 'en' | 'es', any> = {
    pt: {
      title: 'Jogos em Cristo — Jogos Cristãos Divertidos e Educativos para Toda a Família',
      description: 'Descubra jogos cristãos que fortalecem a fé, ensinam valores e proporcionam diversão para crianças, jovens e famílias. Jogue online, aprenda e cresça espiritualmente!',
      keywords: 'jogos cristãos, jogos bíblicos, jogo da memória bíblico, quiz bíblico, quem sou eu bíblico, restauração, joseph smith, família cristã, ensino religioso, lds, igreja, mormon',
      ogTitle: 'Jogos em Cristo — Edifique sua fé brincando',
      ogDescription: 'Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão para todas as idades. Experimente gratuitamente!',
      twitterTitle: 'Jogos em Cristo — Edifique sua fé brincando',
      twitterDescription: 'Jogos bíblicos, educativos e gratuitos para toda a família. Comece agora!',
      headerTitle: 'Jogos em Cristo',
      heroTitle: 'Jogos que <span class="text-brand-primary-600">edificam</span> e <span class="text-brand-secondary-700">divertem</span>',
      heroDesc: 'Descubra uma coleção especial de jogos cristãos que combinam diversão, aprendizado e crescimento espiritual. Perfeito para toda a família!',
      startPlaying: 'Começar a Jogar',
      learnMore: 'Saiba Mais',
      dividerMission: 'Nossa Missão',
      dividerTitle: 'Diversão que <span class="text-brand-primary-600">fortalece</span> a fé',
      dividerDesc: 'Cada jogo foi <span class="text-brand-primary-700 font-medium">cuidadosamente desenvolvido</span> para proporcionar momentos de <span class="text-brand-accent-600 font-medium">alegria</span> enquanto fortalece <span class="text-brand-primary-900 font-medium"> conhecimentos bíblicos</span> e <span class="text-brand-primary-600 font-medium"> valores cristãos</span>.',
      memoryTitle: 'Jogo da Memória',
      memoryDesc: 'Teste sua memória com versículos e personagens bíblicos',
      quizTitle: 'Quiz Bíblico',
      quizDesc: 'Desafie seus conhecimentos sobre a Palavra de Deus',
      whoTitle: 'Quem Sou Eu?',
      whoDesc: 'Descubra personagens bíblicos através de dicas especiais',
      orderTitle: 'Ordem das Frases',
      orderDesc: 'Organize versículos e frases bíblicas na ordem correta',
      playNow: 'Jogar Agora',
      ctaTitle: 'Pronto para começar sua jornada?',
      ctaDesc: 'Junte-se a milhares de famílias que já descobriram a alegria de aprender brincando. Comece agora mesmo!',
      ctaBtn: 'Começar Gratuitamente',
      footerTitle: 'Jogos em Cristo',
      footerDesc: 'Desenvolvendo jogos que edificam, educam e divertem toda a família cristã.',
      footerGames: 'Jogos',
      footerSupport: 'Suporte',
      footerAbout: 'Sobre o Jogo',
      footerAboutDesc1: 'Este jogo foi criado com o objetivo de ensinar e reforçar os princípios da Restauração do Evangelho de Jesus Cristo de maneira divertida e interativa.',
      footerAboutDesc2: 'Através da mecânica de memória, queremos incentivar famílias, jovens e crianças a se lembrarem de eventos, símbolos e ensinamentos importantes relacionados à Primeira Visão, ao profeta Joseph Smith e à restauração da Igreja de Jesus Cristo na Terra.',
      footerAboutMore: 'Mais',
      footerAboutModalTitle: 'Criação e Desenvolvimento',
      footerAboutModalDesc: 'Projeto idealizado e desenvolvido por Edmozer Cavalcante.<br />Saiba mais ou entre em contato: ',
      footerAboutModalDev: 'Desenvolvimento Técnico <span class="align-middle">▼</span>',
      footerAboutModalTech: [
        'Next.js e React para estrutura e lógica do site',
        'TypeScript para tipagem e segurança',
        'TailwindCSS para estilização moderna e responsiva',
        'Integração com IA (GitHub Copilot) para otimização e boas práticas',
        'Animações CSS para uma experiência fluida',
        'Layout totalmente responsivo e adaptativo',
      ],
      footerAboutModalCopy: '© 2025 — Este projeto é um esforço pessoal e sem fins lucrativos.<br />Desenvolvido com auxílio de IA em um processo de programação inovador.',
      footerCopy: '© {year} Jogos em Cristo. Feito com ❤️ para a glória de Deus.',
      terms: 'Termos de Uso',
      privacy: 'Privacidade',
      supportHow: 'Como Jogar',
      supportFAQ: 'FAQ',
      supportContact: 'Contato',
      supportFeedback: 'Feedback',
    },
    en: {
      title: 'Games in Christ — Fun and Educational Christian Games for the Whole Family',
      description: 'Discover Christian games that strengthen faith, teach values, and provide fun for children, youth, and families. Play online, learn, and grow spiritually!',
      keywords: 'christian games, bible games, bible memory game, bible quiz, who am I bible, restoration, joseph smith, christian family, religious education, lds, church, mormon',
      ogTitle: 'Games in Christ — Build your faith while having fun',
      ogDescription: 'A platform of Christian games that combine biblical learning with fun for all ages. Try it for free!',
      twitterTitle: 'Games in Christ — Build your faith while having fun',
      twitterDescription: 'Free, educational, and biblical games for the whole family. Start now!',
      headerTitle: 'Games in Christ',
      heroTitle: 'Games that <span class="text-brand-primary-600">build</span> and <span class="text-brand-secondary-700">entertain</span>',
      heroDesc: 'Discover a special collection of Christian games that combine fun, learning, and spiritual growth. Perfect for the whole family!',
      startPlaying: 'Start Playing',
      learnMore: 'Learn More',
      dividerMission: 'Our Mission',
      dividerTitle: 'Fun that <span class="text-brand-primary-600">strengthens</span> faith',
      dividerDesc: 'Each game was <span class="text-brand-primary-700 font-medium">carefully developed</span> to provide moments of <span class="text-brand-accent-600 font-medium">joy</span> while strengthening <span class="text-brand-primary-900 font-medium"> biblical knowledge</span> and <span class="text-brand-primary-600 font-medium"> Christian values</span>.',
      memoryTitle: 'Memory Game',
      memoryDesc: 'Test your memory with Bible verses and characters',
      quizTitle: 'Bible Quiz',
      quizDesc: 'Challenge your knowledge of the Word of God',
      whoTitle: 'Who Am I?',
      whoDesc: 'Discover Bible characters through special clues',
      orderTitle: 'Order the Phrases',
      orderDesc: 'Arrange Bible verses and phrases in the correct order',
      playNow: 'Play Now',
      ctaTitle: 'Ready to start your journey?',
      ctaDesc: 'Join thousands of families who have already discovered the joy of learning while playing. Start right now!',
      ctaBtn: 'Start for Free',
      footerTitle: 'Games in Christ',
      footerDesc: 'Developing games that build, educate, and entertain the whole Christian family.',
      footerGames: 'Games',
      footerSupport: 'Support',
      footerAbout: 'About the Game',
      footerAboutDesc1: 'This game was created to teach and reinforce the principles of the Restoration of the Gospel of Jesus Christ in a fun and interactive way.',
      footerAboutDesc2: 'Through the memory game mechanics, we want to encourage families, youth, and children to remember important events, symbols, and teachings related to the First Vision, the prophet Joseph Smith, and the restoration of the Church of Jesus Christ on Earth.',
      footerAboutMore: 'More',
      footerAboutModalTitle: 'Creation and Development',
      footerAboutModalDesc: 'Project conceived and developed by Edmozer Cavalcante.<br />Learn more or get in touch: ',
      footerAboutModalDev: 'Technical Development <span class="align-middle">▼</span>',
      footerAboutModalTech: [
        'Next.js and React for site structure and logic',
        'TypeScript for typing and safety',
        'TailwindCSS for modern and responsive styling',
        'AI integration (GitHub Copilot) for optimization and best practices',
        'CSS animations for a smooth experience',
        'Fully responsive and adaptive layout',
      ],
      footerAboutModalCopy: '© 2025 — This project is a personal, non-profit effort.<br />Developed with AI assistance in an innovative programming process.',
      footerCopy: '© {year} Games in Christ. Made with ❤️ for the glory of God.',
      terms: 'Terms of Use',
      privacy: 'Privacy',
      supportHow: 'How to Play',
      supportFAQ: 'FAQ',
      supportContact: 'Contact',
      supportFeedback: 'Feedback',
    },
    es: {
      title: 'Juegos en Cristo — Juegos Cristianos Divertidos y Educativos para Toda la Familia',
      description: 'Descubre juegos cristianos que fortalecen la fe, enseñan valores y brindan diversión para niños, jóvenes y familias. ¡Juega en línea, aprende y crece espiritualmente!',
      keywords: 'juegos cristianos, juegos bíblicos, juego de memoria bíblico, quiz bíblico, ¿quién soy bíblico?, restauración, joseph smith, familia cristiana, educación religiosa, lds, iglesia, mormón',
      ogTitle: 'Juegos en Cristo — Edifica tu fe jugando',
      ogDescription: 'Plataforma de juegos cristianos que combinan aprendizaje bíblico con diversión para todas las edades. ¡Pruébalo gratis!',
      twitterTitle: 'Juegos en Cristo — Edifica tu fe jugando',
      twitterDescription: 'Juegos bíblicos, educativos y gratuitos para toda la familia. ¡Comienza ahora!',
      headerTitle: 'Juegos en Cristo',
      heroTitle: 'Juegos que <span class="text-brand-primary-600">edifican</span> y <span class="text-brand-secondary-700">divierten</span>',
      heroDesc: 'Descubre una colección especial de juegos cristianos que combinan diversión, aprendizaje y crecimiento espiritual. ¡Perfecto para toda la familia!',
      startPlaying: 'Comenzar a Jugar',
      learnMore: 'Saber Más',
      dividerMission: 'Nuestra Misión',
      dividerTitle: 'Diversión que <span class="text-brand-primary-600">fortalece</span> la fe',
      dividerDesc: 'Cada juego fue <span class="text-brand-primary-700 font-medium">cuidadosamente desarrollado</span> para brindar momentos de <span class="text-brand-accent-600 font-medium">alegría</span> mientras fortalece <span class="text-brand-primary-900 font-medium"> conocimientos bíblicos</span> y <span class="text-brand-primary-600 font-medium"> valores cristianos</span>.',
      memoryTitle: 'Juego de Memoria',
      memoryDesc: 'Pon a prueba tu memoria con versículos y personajes bíblicos',
      quizTitle: 'Quiz Bíblico',
      quizDesc: 'Desafía tus conocimientos sobre la Palabra de Dios',
      whoTitle: '¿Quién Soy?',
      whoDesc: 'Descubre personajes bíblicos a través de pistas especiales',
      orderTitle: 'Ordena las Frases',
      orderDesc: 'Organiza versículos y frases bíblicas en el orden correcto',
      playNow: 'Jugar Ahora',
      ctaTitle: '¿Listo para comenzar tu viaje?',
      ctaDesc: 'Únete a miles de familias que ya han descubierto la alegría de aprender jugando. ¡Comienza ahora mismo!',
      ctaBtn: 'Comenzar Gratis',
      footerTitle: 'Juegos en Cristo',
      footerDesc: 'Desarrollando juegos que edifican, educan y divierten a toda la familia cristiana.',
      footerGames: 'Juegos',
      footerSupport: 'Soporte',
      footerAbout: 'Sobre el Juego',
      footerAboutDesc1: 'Este juego fue creado con el objetivo de enseñar y reforzar los principios de la Restauración del Evangelio de Jesucristo de manera divertida e interactiva.',
      footerAboutDesc2: 'A través de la mecánica de memoria, queremos incentivar a familias, jóvenes y niños a recordar eventos, símbolos y enseñanzas importantes relacionados con la Primera Visión, el profeta Joseph Smith y la restauración de la Iglesia de Jesucristo en la Tierra.',
      footerAboutMore: 'Más',
      footerAboutModalTitle: 'Creación y Desarrollo',
      footerAboutModalDesc: 'Proyecto ideado y desarrollado por Edmozer Cavalcante.<br />Saber más o contactar: ',
      footerAboutModalDev: 'Desarrollo Técnico <span class="align-middle">▼</span>',
      footerAboutModalTech: [
        'Next.js y React para la estructura y lógica del sitio',
        'TypeScript para tipado y seguridad',
        'TailwindCSS para estilos modernos y responsivos',
        'Integración con IA (GitHub Copilot) para optimización y buenas prácticas',
        'Animaciones CSS para una experiencia fluida',
        'Diseño totalmente responsivo y adaptativo',
      ],
      footerAboutModalCopy: '© 2025 — Este proyecto es un esfuerzo personal y sin fines de lucro.<br />Desarrollado con ayuda de IA en un proceso de programación innovador.',
      footerCopy: '© {year} Juegos en Cristo. Hecho con ❤️ para la gloria de Dios.',
      terms: 'Términos de Uso',
      privacy: 'Privacidad',
      supportHow: 'Cómo Jugar',
      supportFAQ: 'FAQ',
      supportContact: 'Contacto',
      supportFeedback: 'Feedback',
    },
  }
  // Use selected language directly
  const currentLang = language;



  // Fecha dropdown ao clicar fora ou pressionar ESC
  React.useEffect(() => {
    if (!showLangDropdown) return;
    const handleClick = (e: MouseEvent) => {
      const dropdown = document.getElementById('lang-dropdown');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLangDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showLangDropdown]);

  // Função para scroll suave até a seção de jogos
  const scrollToJogos = () => {
    const jogosSection = document.getElementById("jogos")
    if (jogosSection) {
      jogosSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen font-sans text-brand-text-dark">
      <Head>
        <title>{translations[currentLang].title}</title>
        <meta name="description" content={translations[currentLang].description} />
        <meta name="keywords" content={translations[currentLang].keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Edmozer Cavalcante" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={translations[currentLang].ogTitle} />
        <meta property="og:description" content={translations[currentLang].ogDescription} />
        <meta property="og:image" content="/images/social-card.jpg" />
        <meta property="og:url" content="https://www.jogosemcristo.com" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={translations[currentLang].twitterTitle} />
        <meta name="twitter:description" content={translations[currentLang].twitterDescription} />
        <meta name="twitter:image" content="/images/social-card.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed inset-0 bg-[url('/images/beack-bg.png')] bg-cover bg-center bg-no-repeat -z-10" />
      <div className="relative flex flex-col min-h-screen z-10">
      {/* Header */}
      <header className="h-16 flex items-center border-b border-brand-primary-100 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-brand-primary-50">
              <Image
                src="/images/logo-black.png"
                alt="Logo"
                width={64}
                height={64}
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-brand-primary-800 font-heading">{translations[currentLang].headerTitle}</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            {/* Language Selector only */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-2 py-1 rounded bg-white shadow border border-brand-primary-100 hover:bg-brand-primary-50 transition-all text-sm font-medium text-brand-primary-700"
                onClick={() => setShowLangDropdown((v) => !v)}
              >
                <span className="text-xl">🌐</span>
                <span>{languageLabels[language]}</span>
                <span className="text-lg">{languageIcons[language]}</span>
              </button>
              {showLangDropdown && (
                <div id="lang-dropdown" className="absolute right-0 mt-2 bg-white border border-brand-primary-100 rounded-lg shadow-lg p-2 flex flex-col min-w-[140px] z-50">
                  {Object.entries(languageLabels).map(([key, label]) => (
                    <button
                      key={key}
                      className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-brand-primary-50 text-left ${language === key ? 'bg-brand-primary-100 font-bold' : ''}`}
                      onClick={() => { setLanguage(key as 'pt' | 'en' | 'es'); setShowLangDropdown(false) }}
                    >
                      <span className="text-lg">{languageIcons[key as keyof typeof languageIcons]}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
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
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-brand-primary-900 leading-tight font-heading" dangerouslySetInnerHTML={{__html: translations[currentLang].heroTitle}} />
                  <p className="max-w-[600px] text-brand-text-medium md:text-xl leading-relaxed mx-auto lg:mx-0 font-sans">
                    {translations[currentLang].heroDesc}
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-brand-primary-600 hover:bg-brand-primary-700 text-white shadow-lg transition-all duration-200"
                    onClick={scrollToJogos}
                  >
                    {translations[currentLang].startPlaying}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-brand-primary-100 text-brand-primary-700 hover:bg-brand-primary-50 bg-transparent transition-all duration-200"
                  >
                    {translations[currentLang].learnMore}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                {/* Carrossel de imagens da família */}
                <ImageCarousel />
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
              <div className="w-20 h-20 rounded-lg flex items-center justify-center bg-brand-primary-800">
                <Image
                  src="/images/logo-white.png"
                  alt="Jogos em Cristo Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
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
                  <span className="text-brand-primary-600 font-medium tracking-wide uppercase text-sm px-4 py-1 rounded-full bg-brand-primary-50">
                    {translations[currentLang].dividerMission}
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-brand-primary-400 to-transparent"></div>
                </div>

                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-primary-900 font-heading" dangerouslySetInnerHTML={{__html: translations[currentLang].dividerTitle}} />
                <p className="max-w-[900px] text-brand-text-medium md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed font-sans mx-auto relative" dangerouslySetInnerHTML={{__html: translations[currentLang].dividerDesc}} />
              </div>
            </div>

            {/* Grid de Cartões de Jogos */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 place-items-center max-w-7xl mx-auto">
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
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
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{translations[currentLang].memoryTitle}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {translations[currentLang].memoryDesc}
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
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{translations[currentLang].quizTitle}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {translations[currentLang].quizDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-brand-primary-600 hover:bg-brand-primary-700 text-white shadow-md group-hover:shadow-lg">
                    Jogar Agora
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto bg-brand-secondary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{translations[currentLang].whoTitle}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {translations[currentLang].whoDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-brand-secondary-600 hover:bg-brand-secondary-700 text-white shadow-md group-hover:shadow-lg">
                    Jogar Agora
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto bg-brand-accent-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Puzzle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{translations[currentLang].orderTitle}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {translations[currentLang].orderDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-brand-accent-600 hover:bg-brand-accent-700 text-white shadow-md group-hover:shadow-lg">
                      {translations[currentLang].playNow}
                    </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-r from-brand-primary-700 to-brand-primary-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white font-heading max-w-2xl">
                  {translations[currentLang].ctaTitle}
                </h2>
                <p className="text-brand-primary-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans max-w-[600px]">
                  {translations[currentLang].ctaDesc}
                </p>
                <div className="flex items-center justify-center mt-8">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-brand-primary-700 hover:bg-brand-primary-50 shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    {translations[currentLang].ctaBtn}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-brand-primary-50">
                  <Image
                    src="/images/logo-black.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-brand-primary-800 font-heading">{translations[currentLang].footerTitle}</span>
              </div>
              <p className="text-sm text-brand-text-medium font-sans">
                {translations[currentLang].footerDesc}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">{translations[currentLang].footerGames}</h4>
              <ul className="space-y-2 text-sm text-brand-text-medium font-sans">
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].memoryTitle}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].quizTitle}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].whoTitle}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].orderTitle}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">{translations[currentLang].footerSupport}</h4>
              <ul className="space-y-2 text-sm text-brand-text-medium font-sans">
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].supportHow}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].supportFAQ}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].supportContact}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {translations[currentLang].supportFeedback}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4" id="sobre">
              <h4 className="text-xl font-bold text-brand-primary-900 font-heading">{translations[currentLang].footerAbout}</h4>
              <p className="text-sm text-brand-text-medium font-sans">
                {translations[currentLang].footerAboutDesc1}
              </p>
              <p className="text-sm text-brand-text-medium font-sans">
                {translations[currentLang].footerAboutDesc2}
              </p>
              <button
                className="mt-2 px-4 py-2 rounded-full bg-brand-primary-700 text-white font-semibold shadow hover:bg-brand-primary-800 transition-all"
                onClick={() => setShowSobreModal(true)}
              >
                {translations[currentLang].footerAboutMore}
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
                    <h5 className="text-base font-semibold text-brand-primary-900 mb-2">{translations[currentLang].footerAboutModalTitle}</h5>
                    <p className="text-sm text-brand-text-medium font-sans mb-4">
                      <span dangerouslySetInnerHTML={{__html: translations[currentLang].footerAboutModalDesc}} />
                      <a href="https://www.linkedin.com/in/edmozer" target="_blank" rel="noopener noreferrer" className="text-brand-primary-700 underline">LinkedIn</a>
                    </p>
                    <h5 className="text-base font-semibold text-brand-primary-900 mb-2" dangerouslySetInnerHTML={{__html: translations[currentLang].footerAboutModalDev}} />
                    <ul className="list-disc list-inside text-sm text-brand-text-medium font-sans mb-4">
                      {translations[currentLang].footerAboutModalTech.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-brand-text-medium font-sans">
                      <span dangerouslySetInnerHTML={{__html: translations[currentLang].footerAboutModalCopy}} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-brand-primary-100 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-brand-text-medium font-sans">
              {translations[currentLang].footerCopy.replace('{year}', new Date().getFullYear().toString())}
            </p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <Link href="#" className="text-xs text-brand-text-medium hover:text-brand-primary-700">
                {translations[currentLang].terms}
              </Link>
              <Link href="#" className="text-xs text-brand-text-medium hover:text-brand-primary-700">
                {translations[currentLang].privacy}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}

"use client"

import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, ArrowRight, Cross, Star, BookOpen, Puzzle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { useTranslation } from "@/lib/i18n/use-translation"
import { useLanguage } from "@/lib/i18n/language-context"
export default function LandingPage() {
  const [showSobreModal, setShowSobreModal] = useState(false)
  const { t } = useTranslation();
  const { language } = useLanguage();
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
        <title>{t('homeTitle')}</title>
        <meta
          name="description"
          content={t('homeDescription')}
        />
        <meta
          name="keywords"
          content="jogos cristãos, jogos bíblicos, jogo da memória bíblico, quiz bíblico, quem sou eu bíblico, restauração, joseph smith, família cristã, ensino religioso, lds, igreja, mormon"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Edmozer Cavalcante" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Games in Christ — Build your faith while playing" />
        <meta
          property="og:description"
          content="Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão para todas as idades. Experimente gratuitamente!"
        />
        <meta property="og:image" content="/images/social-card.jpg" />
        <meta property="og:url" content="https://www.jogosemcristo.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Games in Christ — Build your faith while playing" />
        <meta
          name="twitter:description"
          content="Free, educational Bible games for the whole family. Start now!"
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
                alt="Games in Christ Logo"
                width={64}
                height={64}
                className="w-12 h-12 object-contain logo-img"
              />
            </div>
            <span className="text-xl font-bold text-brand-primary-800 font-heading">
              {language === 'pt' && 'Jogos em Cristo'}
              {language === 'en' && 'Games in Christ'}
              {language === 'es' && 'Juegos en Cristo'}
            </span>
          </Link>
          <nav className="flex items-center gap-4">
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
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-brand-primary-900 leading-tight font-heading">
                    {language === 'pt' && (
                      <>
                        Jogos que <span className="text-brand-primary-600">edificam</span> e <span className="text-brand-secondary-700">divertem</span>
                      </>
                    )}
                    {language === 'en' && (
                      <>
                        Games that <span className="text-brand-primary-600">build up your faith</span> and <span className="text-brand-secondary-700">entertain</span>
                      </>
                    )}
                    {language === 'es' && (
                      <>
                        Juegos que <span className="text-brand-primary-600">edifican</span> y <span className="text-brand-secondary-700">diverten</span>
                      </>
                    )}
                  </h1>
                  <p className="max-w-[600px] text-brand-text-medium md:text-xl leading-relaxed mx-auto lg:mx-0 font-sans">
                    {t('homeDescription')}
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={handleScrollToMemory}
                    className="bg-brand-primary-600 hover:bg-brand-primary-700 text-white shadow-lg transition-all duration-200"
                  >
                    {t('startGame')}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
                  alt="Games in Christ Logo"
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
                    {t('ourMission')}
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-brand-primary-400 to-transparent"></div>
                </div>

                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-brand-primary-900 font-heading">
                  {t('funThatStrengthens')}
                  <div className="absolute -right-8 -top-8 w-16 h-16 bg-brand-secondary-100 rounded-full flex items-center justify-center transform rotate-12 opacity-80 shadow-lg">
                    <Cross className="h-8 w-8 text-brand-secondary-600" />
                  </div>
                </h2>

                <p id="intro-descricao" className="max-w-[900px] text-brand-text-medium md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed font-sans mx-auto relative">
                  {t('eachGameDescription')}
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
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{t('memoryGame')}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {t('memoryGameDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/memory-game" className="w-full">
                    <Button className="w-full bg-brand-accent-600 hover:bg-brand-accent-700 text-white shadow-md group-hover:shadow-lg">
                      {t('playNow')}
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
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{t('bibleQuiz')}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {t('bibleQuizDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    {t('comingSoon')}
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto bg-brand-secondary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg overflow-hidden">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{t('whoAmI')}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {t('whoAmIDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    {t('comingSoon')}
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out border border-brand-primary-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md w-full max-w-sm transform-gpu will-change-transform hover:border-brand-primary-200">
                <CardHeader className="text-center pb-4 h-[200px] flex flex-col items-center justify-start">
                  <div className="w-16 h-16 mx-auto bg-brand-accent-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg overflow-hidden">
                    <Puzzle className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-brand-primary-900 font-heading mb-2">{t('orderOfPhrases')}</CardTitle>
                  <CardDescription className="text-brand-text-medium font-sans">
                    {t('orderOfPhrasesDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
                    {t('comingSoon')}
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
                  {t('jesusIsSavior')}
                </h2>
                <p className="text-brand-primary-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans max-w-[600px]">
                  {t('aboutJesus')}
                </p>
                <div className="flex items-center justify-center mt-8">
                  <a
                    href={
                      language === 'en'
                        ? 'https://www.churchofjesuschrist.org/welcome/savior-jesus-christ?lang=eng'
                        : language === 'es'
                          ? 'https://www.churchofjesuschrist.org/welcome/savior-jesus-christ?lang=spa'
                          : 'https://www.churchofjesuschrist.org/welcome/savior-jesus-christ?lang=por'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 rounded-md bg-white text-brand-primary-700 hover:bg-brand-primary-50 shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
                  >
                    {t('learnMoreAboutJesus')}
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
                    alt="Games in Christ Logo"
                    width={48}
                    height={48}
                    className="w-9 h-9 object-contain logo-img"
                  />
                </div>
                <span className="text-xl font-bold text-brand-primary-800 font-heading">{t('homeTitle')}</span>
              </div>
              <p className="text-sm text-brand-text-medium font-sans">
                {t('aboutGamesText')}
              </p>
            </div>



            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">{t('games')}</h4>
              <ul className="space-y-2 text-sm text-brand-text-medium font-sans">
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {t('memoryGame')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {t('bibleQuiz')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {t('whoAmI')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-primary-700">
                    {t('orderOfPhrases')}
                  </Link>
                </li>
              </ul>
            </div>

            <div></div>
            <div className="space-y-4" id="sobre">
              <h4 className="text-sm font-semibold text-brand-primary-900 font-heading">{t('aboutGames')}</h4>
              <p className="text-sm text-brand-text-medium font-sans">
                {t('aboutGamesText')}
              </p>
              
            </div>
          </div>

          {/* Share Buttons in Footer */}
          <div className="flex gap-3 justify-center mt-8 mb-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(t('shareInvitation') + ' https://games-in-christ.vercel.app/')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
            >
              <Image
                src="/images/social-media/Digital_Glyph_White.png"
                alt="WhatsApp"
                width={24}
                height={24}
                style={{ display: 'inline-block' }}
              />
              WhatsApp
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://games-in-christ.vercel.app/&quote=${encodeURIComponent(t('shareInvitation'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              <Image
                src="/images/social-media/Facebook_Logo_Primary.png"
                alt="Facebook"
                width={24}
                height={24}
                style={{ display: 'inline-block' }}
              />
              Facebook
            </a>
            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=https://games-in-christ.vercel.app/&text=${encodeURIComponent(t('shareInvitation'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-gray-800 transition"
            >
              <Image
                src="/images/social-media/logo-white.png"
                alt="X"
                width={24}
                height={24}
                style={{ display: 'inline-block' }}
              />
              X
            </a>
            {/* Instagram (profile link, as direct sharing is not supported) */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition"
            >
              <Image
                src="/images/social-media/Instagram_Glyph_White.png"
                alt="Instagram"
                width={24}
                height={24}
                style={{ display: 'inline-block' }}
              />
              Instagram
            </a>
          </div>
          <div className="mt-2 pt-8 border-t border-brand-primary-100 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-brand-text-medium font-sans">
              © {new Date().getFullYear()} {t('homeTitle')}. {t('madeWithLove')}
            </p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <Link href="/termos-de-uso" className="text-xs text-brand-text-medium hover:text-brand-primary-700">
                {t('termsOfUse')}
              </Link>
              <button
                type="button"
                className="text-xs text-brand-text-medium hover:text-brand-primary-700 underline"
                onClick={() => setShowSobreModal(true)}
              >
                {t('aboutSite')}
              </button>
            </nav>
          </div>
        </div>
      </footer>
      {/* Modal Sobre */}
      {showSobreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 p-6 relative max-h-[90vh] flex flex-col overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-brand-primary-700 hover:text-brand-primary-900 text-xl font-bold"
              onClick={() => setShowSobreModal(false)}
              aria-label={t('close')}
            >
              ×
            </button>
            <h1 className="text-3xl font-bold mb-6 text-brand-primary-900 font-heading">{t('aboutDevTitle')}</h1>
            <p className="mb-4 text-brand-text-medium font-sans">
              {t('aboutDevText1')}
            </p>
            <p className="mb-4 text-brand-text-medium font-sans">
              {t('aboutDevText2')}
            </p>
            <p className="mb-4 text-brand-text-medium font-sans">
              {t('aboutDevText3')}
            </p>
            <p className="mb-4 text-brand-text-medium font-sans">
              Ideias e feedbacks são muito bem-vindos! Você pode encontrar o criador do projeto{' '}
              <a
                href="https://www.linkedin.com/in/edmozer-cavalcante/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-brand-primary-700 hover:text-brand-primary-900"
              >
                Edmozer Cavalcante
              </a>{' '}no LinkedIn.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>

  )
}

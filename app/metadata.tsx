import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos em Cristo — Jogos Cristãos Divertidos e Educativos para Toda a Família',
  description: 'Descubra jogos cristãos que fortalecem a fé, ensinam valores e proporcionam diversão para crianças, jovens e famílias. Jogue online, aprenda e cresça espiritualmente!',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Jogos em Cristo — Edifique sua fé brincando',
    description: 'Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão para todas as idades. Experimente gratuitamente!',
    url: 'https://www.jogosemcristo.com',
    images: ['/images/social-card.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogos em Cristo — Edifique sua fé brincando',
    description: 'Jogos bíblicos, educativos e gratuitos para toda a família. Comece agora!',
    images: ['/images/social-card.jpg'],
  },
}
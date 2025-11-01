import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos em Cristo — Jogos Cristãos Divertidos e Educativos para Toda a Família',
  description: 'Descubra jogos cristãos que fortalecem a fé, ensinam valores e proporcionam diversão para crianças, jovens e famílias. Jogue online, aprenda e cresça espiritualmente!',
  keywords: 'jogos cristãos, jogos bíblicos, jogo da memória bíblico, quiz bíblico, quem sou eu bíblico, restauração, joseph smith, família cristã, ensino religioso, lds, igreja, mormon',
  authors: [{ name: 'Edmozer Cavalcante' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Jogos em Cristo — Edifique sua fé brincando',
    description: 'Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão para todas as idades. Experimente gratuitamente!',
    url: 'https://www.jogosemcristo.com',
    images: [{ url: '/images/social-card.jpg' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogos em Cristo — Edifique sua fé brincando',
    description: 'Jogos bíblicos, educativos e gratuitos para toda a família cristã.',
    images: ['/images/social-card.jpg'],
  },
}
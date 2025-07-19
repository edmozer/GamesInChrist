import React, { useEffect, useState } from "react";

const images = [
  "/images/family-playing-games.png",
  "/images/family2.png",
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400); // tempo do fade-out
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={images[current]}
      alt="Família jogando jogos cristãos juntos"
      width={500}
      height={400}
      decoding="async"
      className={`rounded-xl object-cover shadow-2xl border-4 border-white transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
      style={{ color: "transparent" }}
      data-nimg="1"
    />
  );
}

import { useState, useEffect } from 'react';

interface CardSize {
  min: number;
  max: number;
}

interface UseCardSizeResult {
  cardSize: CardSize;
  setCardSize: React.Dispatch<React.SetStateAction<CardSize>>;
}

export function useCardSize(numPairs: number): UseCardSizeResult {
  const [cardSize, setCardSize] = useState<CardSize>({ min: 140, max: 160 });

  useEffect(() => {
    function calculateCardSize() {
      if (typeof window === 'undefined') return;

      const totalCards = numPairs * 2;
      const margin = 16; // margin between cards
      const containerPadding = 32; // padding around the container
      const headerHeight = 80; // header height
      const scoreboardHeight = 120; // scoreboard height
      const bottomBarHeight = 64; // height of bottom controls bar
      
      // Available space calculation accounting for all UI elements
      const availableWidth = window.innerWidth - containerPadding * 2;
      const availableHeight = window.innerHeight - headerHeight - scoreboardHeight - bottomBarHeight - containerPadding * 2;

      // Calculate optimal grid dimensions based on aspect ratio
      const aspectRatio = availableWidth / availableHeight;
      const optimalColumns = Math.min(
        6, // max columns allowed
        Math.max(
          2, // min columns allowed
          Math.round(Math.sqrt(totalCards * aspectRatio))
        )
      );
      const optimalRows = Math.ceil(totalCards / optimalColumns);

      // Calculate maximum possible card size based on available space
      const maxWidthSize = (availableWidth - (optimalColumns + 1) * margin) / optimalColumns;
      const maxHeightSize = (availableHeight - (optimalRows + 1) * margin) / optimalRows;

      // Use the smaller dimension to ensure cards fit both width and height
      const baseSize = Math.min(maxWidthSize, maxHeightSize);

      // Apply size constraints while maintaining aspect ratio
      const minSize = 120; // absolute minimum size
      const maxSize = 220; // absolute maximum size
      
      // Calculate final size within constraints
      const constrainedSize = Math.min(maxSize, Math.max(minSize, baseSize));
      
      setCardSize({
        min: constrainedSize - 20, // Allow slight shrinking for flexibility
        max: constrainedSize
      });
    }

    calculateCardSize();
    window.addEventListener('resize', calculateCardSize);
    
    return () => window.removeEventListener('resize', calculateCardSize);
  }, [numPairs]);

  return { cardSize, setCardSize };
}
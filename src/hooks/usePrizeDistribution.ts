import { useState, useCallback } from 'react';

interface PrizeDistributionParams {
  totalValue: number;
  minValue: number;
  numberOfPrizes: number;
}

export const usePrizeDistribution = () => {
  const [error, setError] = useState<string | null>(null);

  const distributePrizes = useCallback(
    ({ totalValue, minValue, numberOfPrizes }: PrizeDistributionParams) => {
      try {
        if (totalValue < minValue * numberOfPrizes) {
          throw new Error('Total value is too low for the minimum prize requirement');
        }

        const prizes = Array.from({ length: numberOfPrizes }, (_, id) => ({
          id,
          value: minValue,
          isAvailable: true,
        }));

        let remainingValue = totalValue - minValue * numberOfPrizes;
        
        // Distribute remaining value randomly
        while (remainingValue > 0) {
          const randomIndex = Math.floor(Math.random() * numberOfPrizes);
          const addedValue = Math.min(Math.random() * remainingValue, remainingValue);
          prizes[randomIndex].value += Math.floor(addedValue);
          remainingValue -= addedValue;
        }

        setError(null);
        return prizes;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to distribute prizes');
        return null;
      }
    },
    []
  );

  return { distributePrizes, error };
};
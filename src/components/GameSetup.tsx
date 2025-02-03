"use client";

import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { usePrizeDistribution } from '@/hooks/usePrizeDistribution';

export function GameSetup() {
  const { dispatch } = useGame();
  const { distributePrizes, error } = usePrizeDistribution();
  const [formData, setFormData] = useState({
    numberOfPrizes: '',
    totalValue: '',
    minValue: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prizes = distributePrizes({
      numberOfPrizes: Number(formData.numberOfPrizes),
      totalValue: Number(formData.totalValue),
      minValue: Number(formData.minValue),
    });

    if (prizes) {
      dispatch({
        type: 'SETUP_GAME',
        payload: {
          prizes,
          totalValue: Number(formData.totalValue),
          minValue: Number(formData.minValue),
        },
      });
    }
  };

  return (
    <div className="anime-card max-w-md mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        ✨ Game Setup ✨
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="numberOfPrizes" className="block text-sm font-medium text-gray-700">
            Number of Prizes
          </label>
          <input
            type="number"
            id="numberOfPrizes"
            value={formData.numberOfPrizes}
            onChange={(e) => setFormData(prev => ({ ...prev, numberOfPrizes: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="totalValue" className="block text-sm font-medium text-gray-700">
            Total Prize Value
          </label>
          <input
            type="number"
            id="totalValue"
            value={formData.totalValue}
            onChange={(e) => setFormData(prev => ({ ...prev, totalValue: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="minValue" className="block text-sm font-medium text-gray-700">
            Minimum Prize Value
          </label>
          <input
            type="number"
            id="minValue"
            value={formData.minValue}
            onChange={(e) => setFormData(prev => ({ ...prev, minValue: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            min="0"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="anime-button w-full"
        >
          Start Adventure!
        </button>
      </form>
    </div>
  );
}

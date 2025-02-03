"use client";

import { useGame } from '@/contexts/GameContext';

export function PrizeDisplay() {
  const { state } = useGame();
  const availablePrizes = state.prizes.filter(prize => prize.isAvailable);

  return (
    <div className="anime-card max-w-md mx-auto p-8 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        🎁 Prizes 🎁
      </h2>
      
      <div className="mb-6 text-center">
        <p className="text-lg font-medium text-purple-700">
          Remaining Prizes: {availablePrizes.length} / {state.prizes.length}
        </p>
      </div>

      {state.currentWinner && (
        <div className="winner-announcement mb-6">
          <strong className="font-bold">🎉 Congratulations {state.currentWinner.name}! 🎉</strong>
          <p className="block sm:inline mt-2">
            You won ${state.currentWinner.prize.toFixed(2)}!
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {state.prizes.map((prize, index) => (
          <div
            key={prize.id}
            className={`prize-box ${
              prize.isAvailable 
                ? 'sparkle' 
                : 'opacity-50 bg-gray-100'
            }`}
          >
            <span className="font-bold text-lg">{index + 1}</span>
            {!prize.isAvailable && (
              <p className="text-xs mt-1 text-gray-500">Claimed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';

export function PlayerInput() {
  const { state, dispatch } = useGame();
  const [selectedNumber, setSelectedNumber] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNumber !== '' && state.playerName) {
      dispatch({
        type: 'CLAIM_PRIZE',
        payload: {
          prizeId: Number(selectedNumber),
          playerName: state.playerName,
        },
      });
      setSelectedNumber('');
    }
  };

  const availablePrizes = state.prizes.filter(prize => prize.isAvailable);

  return (
    <div className="anime-card max-w-md mx-auto p-8 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        🎮 Pick Your Prize 🎮
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="playerName"
            value={state.playerName}
            onChange={(e) => dispatch({ type: 'SET_PLAYER_NAME', payload: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label htmlFor="prizeNumber" className="block text-sm font-medium text-gray-700">
            Select Prize Number (1-{state.prizes.length})
          </label>
          <input
            type="number"
            id="prizeNumber"
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            min="1"
            max={state.prizes.length}
            required
          />
        </div>

        <button
          type="submit"
          className="anime-button w-full"
          disabled={!availablePrizes.length}
        >
          Try Your Luck! ✨
        </button>
      </form>
    </div>
  );
}

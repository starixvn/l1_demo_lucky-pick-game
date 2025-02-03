"use client";

import { GameSetup } from "@/components/GameSetup";
import { PlayerInput } from "@/components/PlayerInput";
import { PrizeDisplay } from "@/components/PrizeDisplay";
import { useGame } from "@/contexts/GameContext";

export default function Home() {
  const { state } = useGame();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Lucky Pick Game
        </h1>
        {!state.isGameStarted ? (
          <GameSetup />
        ) : (
          <>
            <PlayerInput />
            <PrizeDisplay />
          </>
        )}
      </div>
    </main>
  );
}
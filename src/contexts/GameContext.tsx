"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface Prize {
  id: number;
  value: number;
  isAvailable: boolean;
}

interface GameState {
  prizes: Prize[];
  totalValue: number;
  minValue: number;
  playerName: string;
  isGameStarted: boolean;
  currentWinner: {
    name: string;
    prize: number;
  } | null;
}

type GameAction =
  | { type: 'SETUP_GAME'; payload: { prizes: Prize[]; totalValue: number; minValue: number } }
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'CLAIM_PRIZE'; payload: { prizeId: number; playerName: string } }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  prizes: [],
  totalValue: 0,
  minValue: 0,
  playerName: '',
  isGameStarted: false,
  currentWinner: null,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SETUP_GAME':
      return {
        ...state,
        ...action.payload,
        isGameStarted: true,
      };
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
      };
    case 'CLAIM_PRIZE':
      return {
        ...state,
        prizes: state.prizes.map(prize =>
          prize.id === action.payload.prizeId
            ? { ...prize, isAvailable: false }
            : prize
        ),
        currentWinner: {
          name: action.payload.playerName,
          prize: state.prizes.find(p => p.id === action.payload.prizeId)?.value || 0,
        },
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
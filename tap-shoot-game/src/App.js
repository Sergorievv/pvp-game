import React, { useState, useEffect } from 'react';

export default function TapShootGame() {
  const [tapCount, setTapCount] = useState(0);
  const [opponentTapCount, setOpponentTapCount] = useState(0); // Simulated opponent
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
  const [mode, setMode] = useState('free'); // 'free' or 'paid'
  const [targetTaps, setTargetTaps] = useState(20);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setOpponentTapCount((prev) => {
          if (prev + 1 >= targetTaps) {
            setGameState('lost');
            return targetTaps;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleTap = () => {
    if (gameState !== 'playing') return;
    setTapCount((prev) => {
      if (prev + 1 >= targetTaps) {
        setGameState('won');
        return targetTaps;
      }
      return prev + 1;
    });
  };

  const startGame = (selectedMode) => {
    setMode(selectedMode);
    setTapCount(0);
    setOpponentTapCount(0);
    setGameState('playing');
  };

  return (
    <div className="w-full h-screen bg-yellow-100 flex flex-col items-center justify-center font-mono">
      {gameState === 'waiting' && (
        <div className="space-y-4">
          <h1 className="text-2xl">🔥 Tap & Shoot PvP 🔫</h1>
          <button onClick={() => startGame('free')} className="bg-green-500 text-white px-4 py-2 rounded-xl">Play Free</button>
          <button onClick={() => startGame('paid')} className="bg-red-500 text-white px-4 py-2 rounded-xl">Play Paid ($0.1 + Stake)</button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4 text-center">
          <div className="text-lg">Mode: {mode} | First to {targetTaps} taps</div>
          <div className="flex justify-around w-full max-w-md">
            <div>
              <div className="text-sm">You</div>
              <div className="text-xl font-bold">{tapCount}</div>
            </div>
            <div>
              <div className="text-sm">Opponent</div>
              <div className="text-xl font-bold">{opponentTapCount}</div>
            </div>
          </div>
          <button onClick={handleTap} className="bg-blue-600 text-white px-6 py-4 rounded-full text-xl">TAP!</button>
        </div>
      )}

      {gameState === 'won' && (
        <div className="text-center space-y-4">
          <div className="text-2xl text-green-700">🎉 You shot first and won!</div>
          <button onClick={() => setGameState('waiting')} className="bg-blue-500 text-white px-4 py-2 rounded">Play Again</button>
        </div>
      )}

      {gameState === 'lost' && (
        <div className="text-center space-y-4">
          <div className="text-2xl text-red-700">💥 Opponent shot first. You lost.</div>
          <button onClick={() => setGameState('waiting')} className="bg-blue-500 text-white px-4 py-2 rounded">Try Again</button>
        </div>
      )}
    </div>
  );
}

"use client"

interface ScoreboardProps {
  players: Array<{
    name: string;
    score: number;
  }>;
  totalMoves: number;
}

export function Scoreboard({ players, totalMoves }: ScoreboardProps) {
  return (
    <div className="fixed top-20 right-4 bg-brand-primary-50 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-brand-primary-100/30">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-brand-primary-900/90">Placar</h2>
        <div className="space-y-2">
          {players.map((player, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg transition-colors bg-brand-primary-50 text-brand-primary-800 font-medium">
              <span className="font-medium truncate mr-2">{player.name}</span>
              <span className="font-bold whitespace-nowrap">{player.score} pares</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-brand-primary-100/30">
          <div className="flex justify-between items-center">
            <span className="text-brand-primary-800/90">Movimentos:</span>
            <span className="font-semibold text-brand-primary-900/90">{totalMoves}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

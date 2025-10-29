'use client';

import { Participant } from '@/types/participant';

interface WinnersBlockProps {
    winners: Participant[];
    onRemoveWinner: (id: string) => void;
    className?: string;
    selectRandomWinner: () => void;
    isNewWinnerDisabled: boolean;
}

export default function WinnersBlock({ winners, onRemoveWinner, className, selectRandomWinner, isNewWinnerDisabled }: WinnersBlockProps) {
    return (
        <div className={`flex items-center gap-5 bg-white rounded-lg shadow-md p-6 ${className}`}>
            <h2 className="text-lg font-bold text-gray-800">WINNERS:</h2>

            {winners.length === 0 ? (
                <div className="text-center text-gray-400">
                    No winners yet
                </div>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {winners.map((winner, index) => (
                        <div
                            key={index}
                            className="bg-cyan-500 text-white px-2 py-1 rounded-md flex items-center gap-2 text-sm"
                        >
                            <span className="font-bold">{winner.name}</span>
                            <button
                                onClick={() => onRemoveWinner(winner.id)}
                                className="text-white hover:text-cyan-800 font-bold text-lg leading-none transition-colors"
                                aria-label="Remove winner"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* New Winner Button */}
            <div className="flex items-start col-span-1 ml-auto">
                <button
                    onClick={selectRandomWinner}
                    disabled={isNewWinnerDisabled}
                    className={`rounded-sm font-bold text-base transition-colors py-1 px-3 ${isNewWinnerDisabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    New winner
                </button>
            </div>
        </div>
    );
}

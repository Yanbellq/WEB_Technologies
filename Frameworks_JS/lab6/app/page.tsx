'use client';

import { useEffect, useState } from 'react';
import { Participant } from '@/types/participant';
import WinnersBlock from '@/components/WinnersBlock';
import RegisterForm from '@/components/RegisterForm';
import ParticipantsTable from '@/components/ParticipantsTable';

export default function Home() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [winners, setWinners] = useState<Participant[]>([]);

    const addParticipant = (participant: Omit<Participant, 'id'>) => {
        const newParticipant: Participant = {
            ...participant,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        setParticipants(prev => [...prev, newParticipant]);
    };

    const selectRandomWinner = () => {
        if (participants.length === 0 || winners.length >= 3) return;

        const availableParticipants = participants.filter(
            p => !winners.some(w => w.id === p.id)
        );

        if (availableParticipants.length === 0) return;

        const randomIndex = Math.floor(Math.random() * availableParticipants.length);
        const winner = availableParticipants[randomIndex];

        setWinners(prev => [...prev, winner]);
    };

    const removeWinner = (id: string) => {
        setWinners(prev => prev.filter(w => w.id !== id));
    };

    const isNewWinnerDisabled = participants.length === 0 || winners.length >= 3;


    useEffect(() => {
        console.log(participants);
    }, [participants])

    return (
        <main className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Winners Block */}
                    <div className="lg:col-span-2">
                        <WinnersBlock winners={winners} onRemoveWinner={removeWinner} className={`col-span-2`} selectRandomWinner={selectRandomWinner} isNewWinnerDisabled={isNewWinnerDisabled} />
                    </div>

                    {/* Register Form */}
                    <div className='lg:col-span-2'>
                        <RegisterForm onAddParticipant={addParticipant} />
                    </div>
                </div>

                {/* Participants Table */}
                <ParticipantsTable participants={participants} />
            </div>
        </main>
    );
}

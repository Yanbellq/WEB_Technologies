'use client';

import { useState, useMemo } from 'react';
import { Participant, SortField, SortOrder } from '@/types/participant';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import WinnersBlock from '@/components/WinnersBlock';
import RegisterForm from '@/components/RegisterForm';
import ParticipantsTable from '@/components/ParticipantsTable';
import SearchBar from '@/components/SearchBar';
import EditParticipantModal from '@/components/EditParticipantModal';
import Button from '@/components/ui/Button';

export default function Home() {
    const [participants, setParticipants, isLoaded] = useLocalStorage<Participant[]>('lottery-participants', []);
    const [winners, setWinners] = useState<Participant[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);

    const addParticipant = (participant: Omit<Participant, 'id'>) => {
        const newParticipant: Participant = {
            ...participant,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        setParticipants(prev => [...prev, newParticipant]);
    };

    const updateParticipant = (updatedParticipant: Participant) => {
        setParticipants(prev =>
            prev.map(p => p.id === updatedParticipant.id ? updatedParticipant : p)
        );
    };

    const deleteParticipant = (id: string) => {
        setParticipants(prev => prev.filter(p => p.id !== id));
        setWinners(prev => prev.filter(w => w.id !== id));
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

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // Filtered and sorted participants
    const processedParticipants = useMemo(() => {
        let result = [...participants];

        // Filter by search query
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sortField) {
            result.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === 'dateOfBirth') {
                    aValue = new Date(aValue).getTime().toString();
                    bValue = new Date(bValue).getTime().toString();
                }

                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [participants, searchQuery, sortField, sortOrder]);

    const isNewWinnerDisabled = participants.length === 0 || winners.length >= 3;

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-2xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Winners Block */}
                    <div className="lg:col-span-2">
                        <WinnersBlock  
                            className={`col-span-2`}
                            winners={winners} 
                            onRemoveWinner={removeWinner} 
                            selectRandomWinner={selectRandomWinner} 
                            isNewWinnerDisabled={isNewWinnerDisabled}
                        />
                    </div>

                    {/* Register Form */}
                    <div className="lg:col-span-2">
                        <RegisterForm
                            onAddParticipant={addParticipant}
                            participants={participants}
                        />
                    </div>
                </div>

                {/* Search Bar */}
                <SearchBar className={`lg:col-span-2`} value={searchQuery} onChange={setSearchQuery} />

                {/* Participants Table */}
                <ParticipantsTable
                    participants={processedParticipants}
                    onEdit={setEditingParticipant}
                    onDelete={deleteParticipant}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                />

                {/* Edit Modal */}
                <EditParticipantModal
                    isOpen={!!editingParticipant}
                    onClose={() => setEditingParticipant(null)}
                    participant={editingParticipant}
                    onUpdate={updateParticipant}
                    participants={participants}
                />
            </div>
        </main>
    );
}

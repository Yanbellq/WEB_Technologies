'use client';

import { Participant } from '@/types/participant';

interface ParticipantsTableProps {
    participants: Participant[];
}

export default function ParticipantsTable({ participants }: ParticipantsTableProps) {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}.${day}.${year}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {participants.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    No participants yet
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b-2 border-gray-300">
                                <th className="text-left p-3 font-semibold text-gray-700">#</th>
                                <th className="text-left p-3 font-semibold text-gray-700">Name</th>
                                <th className="text-left p-3 font-semibold text-gray-700">Date of Birth</th>
                                <th className="text-left p-3 font-semibold text-gray-700">Email</th>
                                <th className="text-left p-3 font-semibold text-gray-700">Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map((participant, index) => (
                                <tr
                                    key={participant.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3 text-gray-500">{index + 1}</td>
                                    <td className="p-3 text-gray-500">{participant.name}</td>
                                    <td className="p-3 text-gray-500">{formatDate(participant.dateOfBirth)}</td>
                                    <td className="p-3 text-gray-500">{participant.email}</td>
                                    <td className="p-3 text-gray-500">{participant.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

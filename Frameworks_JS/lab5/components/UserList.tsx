'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import UserCard from './UserCard';
import styles from './UserList.module.css';

interface UserListProps {
    users: User[];
}

export default function UserList({ users }: UserListProps) {
    const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');

    // Фільтрація користувачів за статтю
    const filteredUsers = users.filter(user => {
        if (genderFilter === 'all') return true;
        return user.gender === genderFilter;
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список користувачів</h1>

            {/* Toolbar з фільтрами */}
            <div className={styles.toolbar}>
                <button
                    className={`${styles.filterBtn} ${genderFilter === 'all' ? styles.active : ''}`}
                    onClick={() => setGenderFilter('all')}
                >
                    Всі
                </button>
                <button
                    className={`${styles.filterBtn} ${genderFilter === 'male' ? styles.active : ''}`}
                    onClick={() => setGenderFilter('male')}
                >
                    Чоловіки
                </button>
                <button
                    className={`${styles.filterBtn} ${genderFilter === 'female' ? styles.active : ''}`}
                    onClick={() => setGenderFilter('female')}
                >
                    Жінки
                </button>
            </div>

            {/* Умовне відображення списку або повідомлення */}
            {filteredUsers.length === 0 ? (
                <div className={styles.emptyMessage}>
                    <p>Список користувачів пустий</p>
                </div>
            ) : (
                <div className={styles.userGrid}>
                    {filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}

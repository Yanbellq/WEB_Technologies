'use client';

import { User } from '@/types/user';
import styles from './UserCard.module.css';
import Image from 'next/image';

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    // Визначаємо клас в залежності від віку
    const getAgeClass = (age: number) => {
        if (age < 18) return styles.cardYoung;
        if (age >= 18 && age < 25) return styles.cardAdult;
        return styles.cardMature;
    };

    return (
        <div className={`${styles.card} ${getAgeClass(user.age)}`}>
            <div className={styles.cardHeader}>
                <img
                    src={user.photo}
                    alt={`${user.firstName} ${user.lastName}`}
                    className={styles.photo}
                    // width={120}
                    // height={120}
                    // priority={false}
                />
            </div>

            <div className={styles.cardBody}>
                <h3 className={styles.name}>
                    {user.firstName} {user.lastName}
                </h3>

                <p className={styles.position}>{user.position}</p>

                <div className={styles.info}>
                    <p><strong>Стать:</strong> {user.gender === 'male' ? 'Чоловіча' : 'Жіноча'}</p>

                    {/* Показуємо вік тільки якщо більше 18 (аналог v-if) */}
                    {user.age > 18 && (
                        <p><strong>Вік:</strong> {user.age} років</p>
                    )}
                </div>

                {/* Виведення хобі (аналог v-for) */}
                <div className={styles.hobbies}>
                    <strong>Хобі:</strong>
                    <ul>
                        {user.hobbies.map((hobby, index) => (
                            <li key={index}>{hobby}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

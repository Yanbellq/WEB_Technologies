export interface User {
    id: number;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    age: number;
    position: string;
    photo: string;
    hobbies: string[];
}

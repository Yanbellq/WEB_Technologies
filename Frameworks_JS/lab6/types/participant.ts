export interface Participant {
    id: string;
    name: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
}

export interface FormErrors {
    name?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
}

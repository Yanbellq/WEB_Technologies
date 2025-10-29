'use client';

import { useState } from 'react';
import { Participant, FormErrors } from '@/types/participant';
import { validateEmail, validatePhone, validateDateNotFuture, formatPhoneNumber } from '@/utils/validation';

interface RegisterFormProps {
    onAddParticipant: (participant: Omit<Participant, 'id'>) => void;
}

export default function RegisterForm({ onAddParticipant }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState({
        name: false,
        dateOfBirth: false,
        email: false,
        phoneNumber: false,
    });

    const validateField = (fieldName: keyof typeof formData, value: string): string | undefined => {
        switch (fieldName) {
            case 'name':
                return value.trim() === '' ? 'This value is required.' : undefined;

            case 'dateOfBirth':
                if (value === '') return 'This value is required.';
                if (!validateDateNotFuture(value)) return 'Date of birth cannot be in the future.';
                return undefined;

            case 'email':
                if (value.trim() === '') return 'This value is required.';
                if (!validateEmail(value)) return 'Please enter a valid email address.';
                return undefined;

            case 'phoneNumber':
                if (value.trim() === '') return 'This value is required.';
                if (!validatePhone(value)) return 'Please enter a valid phone number: (XXX) XXX-XXXX';
                return undefined;

            default:
                return undefined;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let processedValue = value;
        if (name === 'phoneNumber') {
            processedValue = formatPhoneNumber(value);
        }

        setFormData(prev => ({ ...prev, [name]: processedValue }));

        if (touched[name as keyof typeof touched]) {
            const error = validateField(name as keyof typeof formData, processedValue);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        const error = validateField(name as keyof typeof formData, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {
            name: validateField('name', formData.name),
            dateOfBirth: validateField('dateOfBirth', formData.dateOfBirth),
            email: validateField('email', formData.email),
            phoneNumber: validateField('phoneNumber', formData.phoneNumber),
        };

        setErrors(newErrors);
        setTouched({
            name: true,
            dateOfBirth: true,
            email: true,
            phoneNumber: true,
        });

        const hasErrors = Object.values(newErrors).some(error => error !== undefined);

        if (!hasErrors) {
            onAddParticipant(formData);

            setFormData({
                name: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
            });

            setErrors({});
            setTouched({
                name: false,
                dateOfBirth: false,
                email: false,
                phoneNumber: false,
            });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800">REGISTER FORM</h2>
            <p className="text-md text-gray-500 mb-6">Please fill in all the fields.</p>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter user name"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition ${errors.name && touched.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                            }`}
                    />
                    {errors.name && touched.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Date of Birth */}
                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-700 mb-1">
                        Date of Birth
                    </label>
                    <input
                        type="text"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="mm.dd.yyyy"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                            }`}
                    />
                    {errors.dateOfBirth && touched.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter email"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition ${errors.email && touched.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                            }`}
                    />
                    {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-1">
                        Phone number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Phone number"
                        maxLength={14}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                            }`}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-cyan-600 text-white py-1 px-3 rounded-sm hover:bg-cyan-700 transition-colors font-bold ml-auto"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

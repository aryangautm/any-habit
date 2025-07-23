
import React, { useState } from 'react';
import { AuthIcons } from '../constants.tsx';

interface CustomTextFieldProps {
    label: string;
    id: string;
    type: 'text' | 'email' | 'password';
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, id, type, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-400 mb-2 block">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    >
                        {isPasswordVisible ? <AuthIcons.EyeOff /> : <AuthIcons.Eye />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomTextField;

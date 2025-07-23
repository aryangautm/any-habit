
import React from 'react';
import clsx from 'clsx';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={clsx(
                "w-full bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;

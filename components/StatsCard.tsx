import React from 'react';

interface StatsCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    children?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, children }) => {
    return (
        <div className="bg-[#1C1C1E] rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
            <div>
                <div className="flex items-center space-x-2 text-gray-400">
                    {icon}
                    <span className="text-sm font-medium">{label}</span>
                </div>
                <p className="text-3xl font-semibold text-white mt-1">{value}</p>
            </div>
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
};

export default StatsCard;
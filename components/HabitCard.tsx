
import React from 'react';
import { motion } from 'framer-motion';
import type { HabitWithCompletions } from '../types';
import HabitGrid from './HabitGrid';
import { ICONS, ActionIcons } from '../constants.tsx';

interface HabitCardProps {
    habit: HabitWithCompletions;
    isCompleted: boolean;
    onCardClick: () => void;
    onToggleCompletion: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, isCompleted, onCardClick, onToggleCompletion }) => {

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleCompletion();
    };

    return (
        <div 
            className="bg-[#1C1C1E] rounded-2xl p-4 space-y-4 cursor-pointer transition-transform transform hover:scale-[1.02]"
            onClick={onCardClick}
            role="button"
            aria-label={`View details for ${habit.name}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: habit.theme.dark, opacity: 0.3 }}>
                        <span style={{ color: habit.color }}>{ICONS[habit.icon]}</span>
                    </div>
                    <div>
                        <h2 className="font-semibold text-white">{habit.name}</h2>
                        <p className="text-sm text-gray-400">{habit.description}</p>
                    </div>
                </div>
                <motion.div whileTap={{ scale: 0.9 }}>
                   <div onClick={handleActionClick} aria-label={isCompleted ? `Mark ${habit.name} as not completed` : `Mark ${habit.name} as completed`}>
                        {isCompleted ? <ActionIcons.Check color={habit.color} /> : <ActionIcons.Plus />}
                   </div>
                </motion.div>
            </div>
            <HabitGrid completions={habit.completions} color={habit.color} />
        </div>
    );
};

export default HabitCard;


import React, { useState, useMemo } from 'react';
import type { HabitWithCompletions } from '../types';
import { ICONS, DetailIcons } from '../constants.tsx';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarModalProps {
    habit: HabitWithCompletions;
    onClose: () => void;
    onToggleCompletion: (habitId: string, dateString: string) => void;
    onViewStats: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ habit, onClose, onToggleCompletion, onViewStats }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const completionSet = useMemo(() => new Set(habit.completions.map(c => c.date)), [habit.completions]);

    const changeMonth = (amount: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const weekDayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Mon-Sun week

    const calendarDays = Array.from({ length: weekDayOffset + daysInMonth }, (_, i) => {
        if (i < weekDayOffset) return null;
        const day = i - weekDayOffset + 1;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateString = date.toISOString().split('T')[0];
        return {
            day,
            dateString,
            isCompleted: completionSet.has(dateString),
            isFuture: date > new Date(),
        };
    });

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 flex items-end justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-[#1C1C1E] w-full max-w-md rounded-t-2xl p-4 pt-6 space-y-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center">
                         <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: habit.theme.dark, opacity: 0.3 }}>
                                <span style={{ color: habit.color }}>{ICONS[habit.icon]}</span>
                            </div>
                            <div>
                                <h2 className="font-semibold text-white">{habit.name}</h2>
                                <p className="text-sm text-gray-400">{habit.description}</p>
                            </div>
                        </div>
                        <button onClick={onClose} aria-label="Close modal"><DetailIcons.Close /></button>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => changeMonth(-1)} aria-label="Previous month"><DetailIcons.Back/></button>
                            <h3 className="font-semibold text-lg">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                             <button onClick={() => changeMonth(1)} aria-label="Next month"><DetailIcons.Forward/></button>
                        </div>
                        <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-400 mb-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day}>{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-y-2">
                             {calendarDays.map((dayInfo, i) => (
                                <div key={i} className="flex justify-center items-center h-10">
                                   {dayInfo && (
                                       <button 
                                            onClick={() => !dayInfo.isFuture && onToggleCompletion(habit.id, dayInfo.dateString)}
                                            disabled={dayInfo.isFuture}
                                            className={clsx(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                { 'text-white': dayInfo.isCompleted, 'text-gray-400': !dayInfo.isCompleted },
                                                { 'hover:bg-gray-700': !dayInfo.isCompleted && !dayInfo.isFuture },
                                                { 'cursor-not-allowed': dayInfo.isFuture }
                                            )}
                                            style={dayInfo.isCompleted ? { backgroundColor: habit.color } : {}}
                                       >
                                            {dayInfo.day}
                                       </button>
                                   )}
                                </div>
                            ))}
                        </div>
                    </div>
                     <p className="text-center text-xs text-gray-500">Tap dates to add or remove completions.</p>
                     <button onClick={onViewStats} className="w-full text-center py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors">View Full Stats</button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CalendarModal;


import React, { useState } from 'react';
import type { HabitWithCompletions } from '../types';
import HabitCard from './HabitCard';
import CalendarModal from './CalendarModal';
import { HeaderIcons } from '../constants.tsx';

interface DashboardProps {
    habits: HabitWithCompletions[];
    onSelectHabit: (habit: HabitWithCompletions) => void;
    onToggleCompletion: (habitId: string, date: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, onSelectHabit, onToggleCompletion }) => {
    const [modalHabit, setModalHabit] = useState<HabitWithCompletions | null>(null);

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-4">
            <header className="flex justify-between items-center py-2">
                <button aria-label="Settings"><HeaderIcons.Settings /></button>
                <h1 className="text-xl font-bold">HabitKit</h1>
                <div className="flex items-center space-x-4">
                    <button aria-label="Statistics"><HeaderIcons.Stats /></button>
                    <button aria-label="Add new habit"><HeaderIcons.Add /></button>
                </div>
            </header>
            <main>
                <div className="space-y-4">
                    {habits.map((habit) => {
                        const isCompletedToday = habit.completions.some(c => c.date === today);
                        return (
                            <HabitCard 
                                key={habit.id} 
                                habit={habit} 
                                isCompleted={isCompletedToday}
                                onCardClick={() => setModalHabit(habit)}
                                onToggleCompletion={() => onToggleCompletion(habit.id, today)}
                            />
                        );
                    })}
                </div>
            </main>
            {modalHabit && (
                <CalendarModal 
                    habit={modalHabit} 
                    onClose={() => setModalHabit(null)} 
                    onToggleCompletion={onToggleCompletion}
                    onViewStats={() => {
                        setModalHabit(null);
                        onSelectHabit(modalHabit);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;

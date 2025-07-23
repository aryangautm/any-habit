
import React, { useState, useCallback, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import HabitDetail from './components/HabitDetail';
import AuthScreen from './components/AuthScreen';
import OnboardingScreen from './components/OnboardingScreen';
import ShareScreen from './components/ShareScreen';
import { HABITS as initialHabits, mockCompletions as initialCompletions } from './data/mockData';
import type { Habit, HabitWithCompletions, Completion, OnboardingData } from './types';

type View = 'auth' | 'onboarding' | 'dashboard' | 'habitDetail' | 'share';

const App: React.FC = () => {
    const [view, setView] = useState<View>('auth');
    const [habits, setHabits] = useState<Habit[]>(initialHabits);
    const [completions, setCompletions] = useState<{ [key: string]: Completion[] }>(initialCompletions);
    const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

    const habitsWithCompletions: HabitWithCompletions[] = useMemo(() => {
        return habits.map(habit => ({
            ...habit,
            completions: completions[habit.id] || []
        }));
    }, [habits, completions]);

    const navigateTo = (newView: View, habitId?: string) => {
        setView(newView);
        setSelectedHabitId(habitId || null);
    };

    const handleToggleCompletion = useCallback((habitId: string, date: string) => {
        setCompletions(prevCompletions => {
            const habitCompletions = prevCompletions[habitId] || [];
            const completionIndex = habitCompletions.findIndex(c => c.date === date);
            let newHabitCompletions;

            if (completionIndex > -1) {
                newHabitCompletions = habitCompletions.filter(c => c.date !== date);
            } else {
                newHabitCompletions = [...habitCompletions, { date }];
            }

            return {
                ...prevCompletions,
                [habitId]: newHabitCompletions,
            };
        });
    }, []);

    const handleOnboardingComplete = (data: OnboardingData) => {
        const newHabit: Habit = {
            id: data.name.toLowerCase().replace(/\s/g, '_'),
            name: data.name,
            description: data.intention,
            icon: 'learn', // default icon
            color: '#3b82f6', // default color (blue-500)
            theme: { light: 'bg-blue-200', dark: 'bg-blue-500', text: 'text-blue-500' },
        };
        setHabits(prev => [...prev, newHabit]);
        setCompletions(prev => ({...prev, [newHabit.id]: []}));
        navigateTo('dashboard');
    };

    const selectedHabit = useMemo(() => {
        if (!selectedHabitId) return null;
        return habitsWithCompletions.find(h => h.id === selectedHabitId) || null;
    }, [selectedHabitId, habitsWithCompletions]);


    const renderContent = () => {
        switch (view) {
            case 'auth':
                return <AuthScreen onNavigate={() => navigateTo('onboarding')} />;
            case 'onboarding':
                return <OnboardingScreen onComplete={handleOnboardingComplete} />;
            case 'habitDetail':
                return selectedHabit ? <HabitDetail habit={selectedHabit} onBack={() => navigateTo('dashboard')} onShare={() => navigateTo('share', selectedHabit.id)} /> : <Dashboard habits={habitsWithCompletions} onSelectHabit={(habit) => navigateTo('habitDetail', habit.id)} onToggleCompletion={handleToggleCompletion} />;
            case 'share':
                return selectedHabit ? <ShareScreen habit={selectedHabit} onBack={() => navigateTo('habitDetail', selectedHabit.id)} /> : null;
            case 'dashboard':
            default:
                return <Dashboard habits={habitsWithCompletions} onSelectHabit={(habit) => navigateTo('habitDetail', habit.id)} onToggleCompletion={handleToggleCompletion} />;
        }
    };

    return (
        <div className="bg-black min-h-screen font-sans text-white">
            <div className="container mx-auto max-w-md p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;

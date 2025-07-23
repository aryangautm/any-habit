
import type { Habit, Completion } from '../types';

export const HABITS: Habit[] = [
    {
        id: 'walk',
        name: 'Walk around the block',
        description: 'Go for a short walk to clear the mind',
        icon: 'walk',
        color: '#22c55e', // green-500
        theme: { light: 'bg-green-200', dark: 'bg-green-500', text: 'text-green-500' },
    },
    {
        id: 'learn',
        name: 'Learn Norwegian',
        description: 'Three lessons per day',
        icon: 'learn',
        color: '#a855f7', // purple-500
        theme: { light: 'bg-purple-200', dark: 'bg-purple-500', text: 'text-purple-500' },
    },
    {
        id: 'fruit',
        name: 'Eat a piece of fruit',
        description: 'Stay healthy and don\'t overeat',
        icon: 'fruit',
        color: '#f43f5e', // rose-500
        theme: { light: 'bg-rose-200', dark: 'bg-rose-500', text: 'text-rose-500' },
    },
    {
        id: 'stretch',
        name: 'Stretch for 5 minutes',
        description: 'Improve flexibility and relax muscles',
        icon: 'stretch',
        color: '#f97316', // orange-500
        theme: { light: 'bg-orange-200', dark: 'bg-orange-500', text: 'text-orange-500' },
    },
    {
        id: 'breathing',
        name: 'Deep breathing exercise',
        description: 'Calm your mind with a quick exercise',
        icon: 'breathing',
        color: '#38bdf8', // light-blue-400
        theme: { light: 'bg-sky-200', dark: 'bg-sky-500', text: 'text-sky-500' },
    },
];

const generateCompletions = (days: number, frequency: number): Completion[] => {
    const completions: Completion[] = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        if (Math.random() < frequency) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            completions.push({ date: date.toISOString().split('T')[0] });
        }
    }
    return completions;
};

export const mockCompletions: { [key: string]: Completion[] } = {
    'walk': generateCompletions(365, 0.8),
    'learn': generateCompletions(365, 0.6),
    'fruit': generateCompletions(365, 0.7),
    'stretch': generateCompletions(365, 0.5),
    'breathing': generateCompletions(365, 0.9),
};

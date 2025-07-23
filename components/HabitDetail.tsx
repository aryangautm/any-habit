
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { HabitWithCompletions } from '../types';
import { ICONS, DetailIcons } from '../constants.tsx';
import StatsCard from './StatsCard';

interface HabitDetailProps {
    habit: HabitWithCompletions;
    onBack: () => void;
    onShare: () => void;
}

const getCompletionsByMonth = (completions: HabitWithCompletions['completions']) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(month => ({ name: month, Completions: 0 }));

    completions.forEach(comp => {
        const monthIndex = new Date(comp.date).getMonth();
        monthlyData[monthIndex].Completions++;
    });

    return monthlyData;
}

const getCompletionsByTime = (completions: HabitWithCompletions['completions']) => {
    // Mocking data for time-based chart as we don't have time in completions
    return [
        { name: '06:00', Completions: Math.floor(Math.random() * 5) },
        { name: '', Completions: Math.floor(Math.random() * 10) },
        { name: '12:00', Completions: Math.floor(Math.random() * 20) },
        { name: '', Completions: Math.floor(Math.random() * 15) },
        { name: '18:00', Completions: Math.floor(Math.random() * 12) },
    ];
}


const HabitDetail: React.FC<HabitDetailProps> = ({ habit, onBack, onShare }) => {

    const monthlyData = getCompletionsByMonth(habit.completions);
    const timeData = getCompletionsByTime(habit.completions);
    const totalCompletions = habit.completions.length;

    // Basic streak calculation
    const sortedCompletions = [...habit.completions].map(c=>new Date(c.date)).sort((a, b) => b.getTime() - a.getTime());
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    if (sortedCompletions.length > 0) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        let lastDate = new Date(sortedCompletions[0]);
        
        if (lastDate.getTime() === today.getTime() || lastDate.getTime() === yesterday.getTime()) {
            tempStreak = 1;
            currentStreak = 1;
        }
        
        for(let i=1; i<sortedCompletions.length; i++) {
             const currentDate = new Date(sortedCompletions[i]);
             const prevDate = new Date(sortedCompletions[i-1]);
             const diff = (prevDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
             if (diff === 1) {
                 tempStreak++;
             } else {
                 longestStreak = Math.max(longestStreak, tempStreak);
                 tempStreak = 1;
             }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
        
        if (new Date(sortedCompletions[0]).getTime() < yesterday.getTime()) {
            currentStreak = 0;
        }
    }


    return (
        <div className="space-y-6 pb-12">
            <header className="flex justify-between items-center py-2">
                <button onClick={onBack} className="p-2 -ml-2" aria-label="Go back"><DetailIcons.Back /></button>
                <div className="flex items-center gap-4">
                    <button onClick={onShare} aria-label="Share habit"><DetailIcons.Share /></button>
                    <button onClick={onBack} className="bg-[#1C1C1E] text-white px-4 py-1.5 rounded-lg font-semibold">Done</button>
                </div>
            </header>

            <div className="bg-[#1C1C1E] rounded-2xl p-4 flex items-center space-x-3">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: habit.theme.dark, opacity: 0.3 }}>
                        <span style={{ color: habit.color }}>{ICONS[habit.icon]}</span>
                    </div>
                <div>
                    <h2 className="font-semibold text-white">{habit.name}</h2>
                    <p className="text-sm text-gray-400">{habit.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatsCard icon={<DetailIcons.Hash />} label="Completions" value={totalCompletions.toString()} />
                <StatsCard icon={<DetailIcons.Clock />} label="Avg Time" value="12:37 PM">
                    <div className="w-full h-16 -mb-4 -mr-4">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={timeData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}/>
                                <Area type="monotone" dataKey="Completions" stroke={habit.color} fill={habit.color} fillOpacity={0.2} strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </StatsCard>
            </div>
            
            <div className="bg-[#1C1C1E] rounded-2xl p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Completions / Month</h3>
                    <DetailIcons.TrendingUp />
                </div>
                <div className="w-full h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2E" />
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}/>
                            <Area type="monotone" dataKey="Completions" stroke={habit.color} fill={habit.color} fillOpacity={0.2} strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <StatsCard icon={<DetailIcons.Droplet />} label="Current Streak" value={currentStreak.toString()} />
                 <StatsCard icon={<DetailIcons.Droplet />} label="Longest Streak" value={longestStreak.toString()} />
            </div>
        </div>
    );
};

export default HabitDetail;

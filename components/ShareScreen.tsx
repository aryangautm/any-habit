
import React, { useState } from 'react';
import type { HabitWithCompletions } from '../types';
import { DetailIcons, ICONS, ActionIcons, ShareIcons } from '../constants.tsx';
import HabitGrid from './HabitGrid';
import clsx from 'clsx';

interface ShareScreenProps {
    habit: HabitWithCompletions;
    onBack: () => void;
}

const colors = ["#22c55e", "#a855f7", "#f43f5e", "#f97316", "#3b82f6", "#6366f1", "#ec4899"];

const ShareScreen: React.FC<ShareScreenProps> = ({ habit, onBack }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showStreak, setShowStreak] = useState(false);
    const [selectedColor, setSelectedColor] = useState(habit.color);

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center py-2">
                 <button onClick={onBack} className="p-2 -ml-2" aria-label="Go back"><DetailIcons.Close /></button>
                <h1 className="text-xl font-bold">Share Habit</h1>
                <button aria-label="Share"><DetailIcons.Share /></button>
            </header>

            {/* Preview Card */}
            <div className={clsx("p-4 rounded-2xl", isDarkTheme ? 'bg-[#0E0E10]' : 'bg-white')}>
                <div className="border border-gray-700 rounded-xl p-4 space-y-4" style={{ backgroundColor: isDarkTheme ? '#1C1C1E' : '#F3F4F6' }}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: selectedColor, opacity: 0.2 }}>
                                <span style={{ color: selectedColor }}>{ICONS[habit.icon]}</span>
                            </div>
                            <div>
                                <h2 className={clsx("font-semibold", isDarkTheme ? 'text-white' : 'text-black')}>{habit.name}</h2>
                                {showDescription && <p className={clsx("text-sm", isDarkTheme ? 'text-gray-400' : 'text-gray-500')}>{habit.description}</p>}
                            </div>
                        </div>
                         <ActionIcons.Check color={selectedColor} />
                    </div>
                    <HabitGrid completions={habit.completions} color={selectedColor} />
                    <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-gray-500">HabitKit</p>
                         {showStreak && <p className="text-xs text-gray-500">🔥 45 Day Streak</p>}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-400 text-sm">APPEARANCE</h3>
                
                <div className="bg-[#1C1C1E] p-4 rounded-xl space-y-4">
                    {/* Theme */}
                    <div className="flex justify-between items-center">
                        <label className="text-white">Theme</label>
                        <div className="flex items-center bg-gray-700 rounded-lg p-1">
                            <button onClick={() => setIsDarkTheme(false)} className={clsx("px-3 py-1 text-sm rounded", !isDarkTheme && "bg-gray-500")}>Light</button>
                            <button onClick={() => setIsDarkTheme(true)} className={clsx("px-3 py-1 text-sm rounded", isDarkTheme && "bg-gray-500")}>Dark</button>
                        </div>
                    </div>
                    {/* Color */}
                     <div className="flex justify-between items-center">
                        <label className="text-white">Color</label>
                         <div className="flex space-x-2">
                             {colors.map(color => (
                                 <button key={color} onClick={() => setSelectedColor(color)} className="w-6 h-6 rounded-full" style={{backgroundColor: color}}>
                                     {selectedColor === color && <div className="w-full h-full rounded-full border-2 border-white"></div>}
                                 </button>
                             ))}
                        </div>
                    </div>
                    {/* Toggles */}
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                         <div className="flex justify-between items-center">
                            <label htmlFor="show-desc" className="text-white">Show Description</label>
                            <button id="show-desc" onClick={() => setShowDescription(!showDescription)}>{showDescription ? <ShareIcons.ToggleRight className="text-indigo-500" /> : <ShareIcons.ToggleLeft className="text-gray-500" />}</button>
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="show-streak" className="text-white">Show Streak</label>
                            <button id="show-streak" onClick={() => setShowStreak(!showStreak)}>{showStreak ? <ShareIcons.ToggleRight className="text-indigo-500" /> : <ShareIcons.ToggleLeft className="text-gray-500" />}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareScreen;

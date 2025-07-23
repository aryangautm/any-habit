
import { Settings, BarChart3, Plus, Check, ArrowLeft, ArrowRight, Hash, Clock, TrendingUp, Droplet, Sun, Moon, Palette, ToggleLeft, ToggleRight, Info, Share2, X, Apple, Dumbbell, BookOpen, Activity, Wind, Eye, EyeOff } from 'lucide-react';
import React from 'react';

export const ICONS: { [key: string]: React.ReactNode } = {
    'walk': <Activity size={24} />,
    'learn': <BookOpen size={24} />,
    'fruit': <Apple size={24} />,
    'stretch': <Dumbbell size={24} />,
    'breathing': <Wind size={24} />,
};

export const HeaderIcons = {
    Settings: () => <Settings className="text-gray-400" />,
    Stats: () => <BarChart3 className="text-gray-400" />,
    Add: () => <Plus className="text-gray-400" size={28} />,
};

export const ActionIcons = {
    Check: ({ color }: { color: string }) => <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors`} style={{ backgroundColor: color }}><Check size={20} className="text-black" /></div>,
    Plus: () => <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center transition-colors hover:bg-gray-600"><Plus size={20} className="text-gray-300" /></div>,
};

export const DetailIcons = {
    Back: () => <ArrowLeft size={24} />,
    Forward: () => <ArrowRight size={24} />,
    Hash: () => <Hash size={18} className="text-gray-400" />,
    Clock: () => <Clock size={18} className="text-gray-400" />,
    TrendingUp: () => <TrendingUp size={24} className="text-gray-400" />,
    Droplet: () => <Droplet size={18} className="text-gray-400" />,
    Share: () => <Share2 size={24} />,
    Close: () => <X size={24} className="text-gray-500" />
};

export const ShareIcons = {
    Sun: () => <Sun />,
    Moon: () => <Moon />,
    Palette: () => <Palette />,
    ToggleLeft: (props: React.ComponentProps<typeof ToggleLeft>) => <ToggleLeft size={36} {...props} />,
    ToggleRight: (props: React.ComponentProps<typeof ToggleRight>) => <ToggleRight size={36} {...props} />,
    Info: () => <Info />,
}

export const AuthIcons = {
    Eye: () => <Eye size={20} className="text-gray-400"/>,
    EyeOff: () => <EyeOff size={20} className="text-gray-400"/>,
}
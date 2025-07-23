
import React, { useMemo } from 'react';
import type { Completion } from '../types';
import clsx from 'clsx';

interface HabitGridProps {
    completions: Completion[];
    color: string;
}

const HabitGrid: React.FC<HabitGridProps> = ({ completions, color }) => {
    const gridDays = 23 * 7; // 23 columns, 7 rows

    const completionSet = useMemo(() => {
        return new Set(completions.map(c => c.date));
    }, [completions]);

    const squares = useMemo(() => {
        const today = new Date();
        today.setHours(0,0,0,0);

        const cells = [];
        for (let i = gridDays - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const isCompleted = completionSet.has(dateString);
            const isFuture = date > today;
            
            let cellColor = 'bg-[#2C2C2E]';
            let opacity = 1;
            let style = {};

            if (isFuture) {
                 cellColor = 'bg-transparent';
            } else if (isCompleted) {
                cellColor = ''; 
                opacity = Math.random() * 0.7 + 0.3;
                style = { backgroundColor: color, opacity };
            }

            cells.push(
                <div 
                    key={i} 
                    className={clsx('w-3 h-3 rounded-[3px]', cellColor)}
                    style={style}
                />
            );
        }
        return cells;
    }, [gridDays, completionSet, color]);

    return (
        <div className="grid grid-cols-[repeat(23,minmax(0,1fr))] gap-1">
            {squares}
        </div>
    );
};

export default HabitGrid;

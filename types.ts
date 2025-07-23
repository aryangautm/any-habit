
export interface Habit {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    theme: {
        light: string;
        dark: string;
        text: string;
    };
}

export interface Completion {
    date: string; // ISO 8601 format: "YYYY-MM-DD"
}

export interface HabitWithCompletions extends Habit {
    completions: Completion[];
}

export interface OnboardingData {
    identity: string;
    name: string;
    intention: string;
    stack: string;
}


import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import type { OnboardingData } from '../types';

interface OnboardingScreenProps {
    onComplete: (data: OnboardingData) => void;
}

const steps = [
    {
        title: "Who do you want to become?",
        subtitle: "True change comes from identity. Don't think about habits, think about the person.",
        key: 'identity' as keyof OnboardingData,
        placeholder: "e.g., A writer, a healthy person, a musician"
    },
    {
        title: "What's a tiny, two-minute action that person would do?",
        subtitle: "The 'Two-Minute Rule' makes it easy to start. What's a small gateway habit?",
        key: 'name' as keyof OnboardingData,
        placeholder: "e.g., Write one sentence, eat one piece of fruit"
    },
    {
        title: "When and where will you do this?",
        subtitle: "This is your 'implementation intention'. Be specific to make it real.",
        key: 'intention' as keyof OnboardingData,
        placeholder: "e.g., At 8 AM at my kitchen table"
    },
    {
        title: "How will you remember? Link it to a current habit.",
        subtitle: "This is 'habit stacking'. After my current habit, I will do my new habit.",
        key: 'stack' as keyof OnboardingData,
        placeholder: "e.g., After I brush my teeth..."
    },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<OnboardingData>({ identity: '', name: '', intention: '', stack: ''});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({ ...prev, [steps[currentStep].key]: e.target.value }));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(data);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentKey = steps[currentStep].key;
    const isNextDisabled = !data[currentKey] || data[currentKey].trim() === '';

    return (
        <div className="flex flex-col justify-between min-h-screen -my-4 py-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
                <p className="text-gray-400 mb-8">{steps[currentStep].subtitle}</p>
                <input
                    type="text"
                    value={data[currentKey]}
                    onChange={handleInputChange}
                    placeholder={steps[currentStep].placeholder}
                    className="w-full bg-transparent text-white text-2xl border-b-2 border-gray-700 focus:outline-none focus:border-indigo-500 py-2"
                    autoFocus
                />
            </div>
            
            <div className="space-y-4">
                 <div className="flex justify-center space-x-2">
                    {steps.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-white' : 'bg-gray-700'}`}></div>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    {currentStep > 0 && <button onClick={prevStep} className="text-gray-400 font-semibold px-4 py-3 rounded-lg hover:bg-[#1C1C1E]">Back</button>}
                    <PrimaryButton onClick={nextStep} disabled={isNextDisabled} className={isNextDisabled ? 'bg-gray-600' : ''}>
                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;


import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import CustomTextField from './CustomTextField';

interface AuthScreenProps {
    onNavigate: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onNavigate }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen -my-4">
            <div className="w-full max-w-sm">
                <h1 className="text-4xl font-bold text-center mb-8">HabitKit</h1>

                <div className="bg-[#1C1C1E] p-8 rounded-2xl">
                    <div className="flex mb-6">
                        <button 
                            onClick={() => setIsLogin(true)} 
                            className={`flex-1 pb-2 font-semibold ${isLogin ? 'text-white border-b-2 border-white' : 'text-gray-500'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setIsLogin(false)} 
                            className={`flex-1 pb-2 font-semibold ${!isLogin ? 'text-white border-b-2 border-white' : 'text-gray-500'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNavigate(); }}>
                        {!isLogin && <CustomTextField label="Username" id="username" type="text" />}
                        <CustomTextField label="Email" id="email" type="email" />
                        <CustomTextField label="Password" id="password" type="password" />

                        <PrimaryButton type="submit">
                            {isLogin ? 'Login' : 'Create Account'}
                        </PrimaryButton>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    By continuing, you agree to our <a href="#" className="underline">Terms of Service</a>.
                </p>
            </div>
        </div>
    );
};

export default AuthScreen;

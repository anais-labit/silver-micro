import React, { useState } from 'react';
import FormInput from './FormInput';
import ValidateButton from './ValidateButton';
import userImg from '../assets/user.png';
import lockImg from '../assets/lock.png';
import mailImg from '../assets/mail.png';

export default function AuthForm() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 bg-white rounded-t-xl">
            {showSignUp && (
                <form className="flex flex-col items-center space-y-2 py-6">

                    <div className='flex flex-row-2 space-x-2'>

                        <div className="flex flex-row items-center space-y-2 relative">
                            <img className="absolute right-1 bottom-2" src={userImg} alt="User" />
                            <FormInput placeholder="Lastname" />
                        </div>
                        <div className="flex flex-row items-center space-y-2 relative">
                            <img className="absolute right-1 bottom-2" src={userImg} alt="User" />
                            <FormInput placeholder="Firstname" />
                        </div>
                    </div>

                    <div className='flex flex-row-2 space-x-2'>
                        <div className="flex flex-row items-center space-y-2 relative">
                            <img className="absolute right-1 bottom-2" src={lockImg} alt="Password" />
                            <FormInput placeholder="Password" />
                        </div>
                        <div className="flex flex-row items-center space-y-2 relative">
                            <img className="absolute right-1 bottom-2" src={lockImg} alt="Password" />
                            <FormInput placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div>
                    <div className="flex flex-row items-center space-y-2 relative">
                        <img className="absolute right-2 bottom-2" src={mailImg} alt="Mail" />
                        <FormInput placeholder="Email" />
                    </div>

                    <div className="flex items-center space-y-4 w-full pt-4">
                        <ValidateButton className="space-y-2" label="Sign up" />
                    </div>
                    </div>

                    <div className="flex flex-row items-center justify-center space-x-2 w-full pt-6">
                        <p className="text-xs text-gray-500">Have an account ?</p>
                        <a className="text-xs text-blue-500" onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>Sign in</a>
                    </div>
                </form>
            )}
            {showSignIn && (
                <form className="flex flex-col items-center space-y-2">
                    <div className="flex flex-row items-center space-y-2 relative">
                        <img className="absolute right-1 bottom-2" src={userImg} alt="User" />
                        <FormInput placeholder="Email" />
                    </div>
                    <div className="flex flex-row items-center space-y-2 relative">
                        <img className="absolute right-1 bottom-2" src={lockImg} alt="Password" />
                        <FormInput placeholder="Password" />
                    </div>
                    <div className="flex items-center space-y-4 w-full pt-2">
                        <ValidateButton className="space-y-2" label="Sign in" />
                    </div>
                    <div className="flex flex-row items-center justify-center space-x-2 w-full pt-6">
                        <p className="text-xs text-gray-500">Don't have an account yet ?</p>
                        <a className="text-xs text-blue-500 underline" onClick={() => { setShowSignUp(true); setShowSignIn(false); }}>Sign up</a>
                    </div>

                </form>
            )}
        </div>
    );
}

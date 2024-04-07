import React from 'react';
import FormInput from './FormInput';
import ValidateButton from './ValidateButton';
import userImg from '../assets/user.png';
import lockImg from '../assets/lock.png';


export default function AuthForm() {
    return React.createElement("div", {
        className: "flex flex-col items-center justify-center w-full h-full space-y-4 bg-white rounded-t-xl"
    }, 
        React.createElement("form", {
            className: "flex flex-col items-center space-y-2"
        }, 
            React.createElement("div", {
                className: "flex flex-row items-center space-y-2 relative"
            },
                React.createElement("img", { className:"absolute right-1 bottom-2", src: userImg, alt: "User" }), // Image "user.png" incluse dans le div
                React.createElement(FormInput, {
                    placeholder: "Email" })
            ),
            React.createElement("div", {
                className: "flex flex-row items-center space-y-2 relative"
            },
                React.createElement("img", { className:"absolute right-1 bottom-2", src: lockImg, alt: "User" }), // Image "user.png" incluse dans le div
                React.createElement(FormInput, {
                    placeholder: "Password" })
            ),
            React.createElement("div", {
                className: "flex items-center space-y-4 w-full"
            }, 
                React.createElement(ValidateButton, {
                    className: "space-y-2",
                    label: "Login"
                })
            ),
            React.createElement("div", {
                className: "flex flex-row items-center space-x-2 w-full"
            }, 
            React.createElement("p", {
                className: "text-xs text-gray-500"
            }, "Don't have an account yet ?"), 
            React.createElement("a", {
                className: "text-xs text-blue-500"
            }, "Sign up")
               
            ),
            
        )
                
    );
}

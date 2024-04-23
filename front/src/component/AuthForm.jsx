import React, { useState } from "react";
import FormInput from "./FormInput";
import ValidateButton from "./ValidateButton";
import userImg from "../assets/user.png";
import lockImg from "../assets/lock.png";
import mailImg from "../assets/mail.png";

const PATH = import.meta.env.VITE_PATH;

export default function AuthForm() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPwd: "",
  });

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(PATH + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }
      console.log("Inscription réussie");
    } catch {
      console.error("Erreur", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 bg-white rounded-t-xl">
      {showSignUp && (
        <form
          onSubmit={handleSignUpSubmit}
          className="flex flex-col items-center space-y-2 py-6"
        >
          <div className="flex flex-row-2 space-x-2">
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-1 bottom-2"
                src={userImg}
                alt="User"
              />
              <FormInput
                placeholder="Firstname"
                value={signUpForm.firstName}
                onChange={(e) => {
                  setSignUpForm({
                    ...signUpForm,
                    firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-1 bottom-2"
                src={userImg}
                alt="User"
              />
              <FormInput
                placeholder="Lastname"
                value={signUpForm.lastName}
                onChange={(e) => {
                  setSignUpForm({
                    ...signUpForm,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="flex flex-row-2 space-x-2">
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-1 bottom-2"
                src={lockImg}
                alt="Password"
              />
              <FormInput
                placeholder="Password"
                value={signUpForm.password}
                onChange={(e) => {
                  setSignUpForm({
                    ...signUpForm,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-1 bottom-2"
                src={lockImg}
                alt="Password"
              />
              <FormInput
                placeholder="Confirm Password"
                value={signUpForm.confPwd}
                onChange={(e) => {
                  setSignUpForm({
                    ...signUpForm,
                    confPwd: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-2 bottom-2"
                src={mailImg}
                alt="Mail"
              />
              <FormInput
                placeholder="Email"
                value={signUpForm.email}
                onChange={(e) => {
                  setSignUpForm({
                    ...signUpForm,
                    email: e.target.value,
                  });
                }}
              />
            </div>

            <div className="flex items-center space-y-4 w-full pt-4">
              <ValidateButton className="space-y-2" label="Sign up" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center space-x-2 w-full pt-6">
            <p className="text-xs text-gray-500">Have an account ?</p>
            <a
              className="text-xs text-blue-500"
              onClick={() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }}
            >
              Sign in
            </a>
          </div>
        </form>
      )}
      {showSignIn && (
        <form className="flex flex-col items-center space-y-2">
          <div className="flex flex-row items-center space-y-2 relative">
            <img
              className="absolute right-1 bottom-2"
              src={userImg}
              alt="User"
            />
            <FormInput placeholder="Email" />
          </div>
          <div className="flex flex-row items-center space-y-2 relative">
            <img
              className="absolute right-1 bottom-2"
              src={lockImg}
              alt="Password"
            />
            <FormInput placeholder="Password" />
          </div>
          <div className="flex items-center space-y-4 w-full pt-2">
            <ValidateButton className="space-y-2" label="Sign in" />
          </div>
          <div className="flex flex-row items-center justify-center space-x-2 w-full pt-6">
            <p className="text-xs text-gray-500">Don't have an account yet ?</p>
            <a
              className="text-xs text-blue-500 underline"
              onClick={() => {
                setShowSignUp(true);
                setShowSignIn(false);
              }}
            >
              Sign up
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

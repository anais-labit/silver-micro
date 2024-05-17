import React, { useState } from "react";
import FormInput from "./FormInput";
import ValidateButton from "./ValidateButton";
import userImg from "../assets/user.png";
import lockImg from "../assets/lock.png";
import mailImg from "../assets/mail.png";
import { useNavigate } from "react-router-dom";

const PATH = import.meta.env.VITE_PATH;

export default function AuthForm() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();
  // const [token, setToken] = useState(null);
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

  const handleSignUp = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (signUpForm.password !== signUpForm.confPwd) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(PATH + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });

      const errorData = await response.json();
      if (errorData.status === false) {
        throw new Error(errorData.error.message);
      }
      console.log("Inscription réussie");
      setShowSignUp(false);
      setShowSignIn(true);

    } catch (error) {
      console.error("Erreur", error.message);
    }
  };

  const handleSignIn = (e) => {
    const { name, value } = e.target;
    setSignInForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    
    const signInData = { signInForm };
    console.log(signInData);

    try {
      const response = await fetch(PATH + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInForm),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      const { token, user } = data.data;

      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        id: user.id,
        jwtToken: token,
      };

      Object.entries(userInfo).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      // setToken(token);

      console.log("Connexion réussie");

      navigate("/restaurants");



    } catch (error) {
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
                type="text"
                placeholder="Firstname"
                name="firstName"
                value={signUpForm.firstName}
                onChange={handleSignUp}
              />
            </div>
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-1 bottom-2"
                src={userImg}
                alt="User"
              />
              <FormInput
                type="text"
                placeholder="Lastname"
                name="lastName"
                value={signUpForm.lastName}
                onChange={handleSignUp}
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
                type="password"
                placeholder="Password"
                name="password"
                value={signUpForm.password}
                onChange={handleSignUp}
              />
            </div>
            <div className="flex flex-row items-center space-y-2 relative">
              <img
                className="absolute right-1 bottom-2"
                src={lockImg}
                alt="Password"
              />
              <FormInput
                type="password"
                placeholder="Confirm Password"
                name="confPwd"
                value={signUpForm.confPwd}
                onChange={handleSignUp}
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
                type="email"
                placeholder="Email"
                name="email"
                value={signUpForm.email}
                onChange={handleSignUp}
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
        <form
          onSubmit={handleSignInSubmit}
          className="flex flex-col items-center space-y-2"
        >
          <div className="flex flex-row items-center space-y-2 relative">
            <img
              className="absolute right-1 bottom-2"
              src={userImg}
              alt="User"
            />
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              value={signInForm.email}
              onChange={handleSignIn}
            />
          </div>
          <div className="flex flex-row items-center space-y-2 relative">
            <img
              className="absolute right-1 bottom-2"
              src={lockImg}
              alt="Password"
            />
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              value={signInForm.password}
              onChange={handleSignIn}
            />
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

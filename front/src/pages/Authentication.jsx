import React from "react";
import AuthForm from "../components/AuthForm";
import banner from "../assets/banner.jpg";

export default function Authentication() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center flex-col max-[430px]:h-screen lg:h-screen bg-black max-[430px]:border-0 lg:border-2 border-gray-300 max-[430px]:w-full lg:w-1/4">
        <div className="h-3/5 flex w-full justify-center items-center">
          <img
            src={banner}
            alt="banner"
            className="max-[430px]:w-full lg:w-full h-full brightness-125"
          />
        </div>
        <div className="flex h-full max-[430px]:w-screen lg:w-full justify-center items-center rounded-t-xl">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

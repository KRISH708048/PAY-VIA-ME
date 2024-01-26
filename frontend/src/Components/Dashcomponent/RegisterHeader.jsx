import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RegisterHeader = (props) => {
        const handleLoginClick = () => {
          props.setLogin((e)=>!e);
          props.setSignup(false); 
        };
      
        const handleSignupClick = () => {
          props.setSignup((e)=>!e);
          props.setLogin(false);
        };
  return (
    <div className="w-full flex flex-wrap justify-between items-center p-4 border-b-2 z-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r via-blue-400 from-blue-800 to-blue-400 inline-block text-transparent bg-clip-text">
        PAYVIAME
      </h1>
      <div>
        <ul className="flex justify-evenly items-center gap-5 ">
          <Link className="text-2xl font-semibold">Home</Link>
          <Link className="text-2xl font-semibold">About</Link>
          <div className="flex flex-wrap justify-between items-center gap-5">
            <Link >
              <button onClick={handleLoginClick} className="hover:bg-green-300 w-full pl-4 pr-4 pt-2 pb-2 text-2xl font-semibold rounded-xl ">
                Login
              </button>
            </Link>
            <Link >
              <button onClick={handleSignupClick} className="hover:bg-green-300 w-full p-2 text-2xl font-semibold  rounded-xl ">
                Register
              </button>
            </Link>
          </div>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4">
        <h2 className="text-2xl">Hello,User</h2>
        {localStorage.getItem("token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            log out
          </button>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default RegisterHeader;

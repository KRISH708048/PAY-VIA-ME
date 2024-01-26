import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
    useEffect(()=>{
        console.log("restart")
    },[localStorage.getItem("token")])
  return (
    <div className="w-full flex flex-wrap justify-between items-center p-4 border-b-2">
      <h1 className="text-4xl font-bold bg-gradient-to-r via-blue-400 from-blue-800 to-blue-400 inline-block text-transparent bg-clip-text">
        PAYVIAME
      </h1>{" "}
      <div className="flex flex-wrap gap-4">       
        <h2 className="text-2xl">Hello,User</h2>
       {localStorage.getItem("token") ? <button onClick={()=>{localStorage.removeItem("token"); navigate("/")}}>log out</button> : " "}
      </div>
    </div>
  );
};

export default Header;

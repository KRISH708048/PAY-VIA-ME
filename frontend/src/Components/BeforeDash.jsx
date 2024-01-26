import React, { useState, useEffect } from "react";
import RegisterHeader from "./Dashcomponent/RegisterHeader";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const BeforeDash = () => {
  const [isLogin, setLogin] = useState(false);
  const [isSignup, setSignup] = useState(false);

  useEffect(() => {
    console.log("restart");
  }, [localStorage.getItem("token")]);

  return (
    <div className="flex flex-col h-full w-full">
      <RegisterHeader setLogin={setLogin} setSignup={setSignup} />
      <div>
        {isLogin ? <SignIn setLogin={setLogin} setSignup={setSignup}/> : ""}
        {isSignup ? <SignUp setLogin={setLogin} setSignup={setSignup} /> : ""}
      </div>
      {isLogin===false && isSignup}
    </div>
  );
};

export default BeforeDash;

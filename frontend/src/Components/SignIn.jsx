import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const nav = () => {
    navigate("/user");
  };
  const handleSignupClick = () => {
    props.setSignup((prevSignup) => !prevSignup);
    props.setLogin(false);
  };
  const addData = () => {
    fetch("http://localhost:3000/api/v1/user/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.status == 200) {
          alert(json.message);
          let token = json.token;
          localStorage.setItem("token", "Bearer" + " " + token);
          nav();
        } else {
          alert(json.message);
        }
        setEmail((prevEmail) => "");
        setPassword((prevPassword) => "");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const field = [
    {
      label: "Email",
      type: "email",
      input: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      input: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <div className="w-full h-lvh bg-blue-400 pt-24 ">
      <div className=" w-80 rounded-lg bg-white m-auto flex flex-col items-center p-8 ">
        <div className="text-center">
          <h1 className="text-3xl  font-bold">Sign In</h1>
          <p className="text-gray-500 font-semibold">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="w-full mt-4">
          {field.map((e, i) => (
            <div key={i} className="flex flex-col w-full gap-1 mb-3">
              <label className=" font-semibold">{e.label}</label>
              <input
                value={e.value}
                type={e.type}
                onChange={e.onChange}
                className="bg-gray-100 focus:outline-none focus:border-sky-500 p-1 border border-slate-300 rounded-md"
              />
            </div>
          ))}
        </div>
        <button
          onClick={addData}
          className="w-full text-white bg-black p-2 rounded-md"
        >
          Sign In
        </button>
        <p className="text-sm mt-2 font-semibold">
          Don't have an account?{" "}
          <button onClick={handleSignupClick} className="text-blue-800 underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

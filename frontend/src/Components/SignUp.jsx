import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin=()=>{
    props.setLogin((e)=>!e);
    props.setSignup(false); 
  }
  const addData = () => {
    fetch("http://localhost:3000/api/v1/user/sign-up", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        firstName: firstname,
        lastName: lastname,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.status == 411) {
          alert(res.message||"invalid inputs");
        }
        else if (res.status == 400) {
          alert(json.message);
        } else {
          console.log("Parsed JSON:", json);
          alert("added");
          // localStorage.setItem("token", "Bearer" + " " + token);
          handlelogin();
        }
        setEmail((prevEmail) => "");
        setFirstname((prevFirstname) => "");
        setLastname((prevLastname) => "");
        setPassword((prevPassword) => "");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const field = [
    {
      label: "First Name",
      type: "text",
      input: "firstName",
      value: firstname,
      onChange: (e) => setFirstname(e.target.value),
    },
    {
      label: "Last Name",
      type: "text",
      input: "lastName",
      value: lastname,
      onChange: (e) => setLastname(e.target.value),
    },
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
    <div className="w-full h-lvh pt-12 bg-blue-400  ">
      <div className=" w-80 rounded-lg bg-white m-auto flex flex-col items-center p-8 ">
        <div className="text-center">
          <h1 className="text-3xl  font-bold">Sign Up</h1>
          <p className="text-gray-500 font-semibold">
            Enter your information to create an account
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
          Sign Up
        </button>
        <p className="text-sm mt-2 font-semibold">
          Already have an account?{" "}
          <span onClick={handlelogin} className="text-blue-800 underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

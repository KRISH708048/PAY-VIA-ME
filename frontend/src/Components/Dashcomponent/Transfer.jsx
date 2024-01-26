import React, { useState } from "react";

const Transfer = ({ setTransfer, index, data }) => {
  const [amount, setAmount] = useState("");
  
  const initiateTransfer =()=>{
    fetch("http://localhost:3000/api/v1/account/transfer",{
        method:"POST",
        body : JSON.stringify({
            to:data[index]._id,
            amount : amount
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`, // Include the token in the Authorization header
          },
    }
    ).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then((result)=>{
        alert(result.message);
        setTransfer((prev)=>!prev);
      })
  }
  return (
    <div className=" w-96 rounded-lg bg-white m-auto flex flex-col items-center p-10 border-4 ">
      <div className="text-center">
        <h1 className="text-3xl  font-bold">Send Money</h1>
      </div>
      <div className="w-full mt-16">
        <div className="flex flex-col w-full gap-1 mb-3">
          <h1 className="text-2xl font-semibold">{data[index].firstName}</h1>
          <h3 className="text-sm font-medium">Ammount in Rs.</h3>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 w-full bg-gray-200 rounded-lg"
          />
        </div>
      </div>
      <button onClick={initiateTransfer} className="bg-green-400 w-full p-2 rounded-xl">Initiate Money</button>
    </div>
  );
};

export default Transfer;

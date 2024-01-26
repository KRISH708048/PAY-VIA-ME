import React, { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/account/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setBalance(json.balance);
        } else {
          console.error("Error fetching balance:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchBalance();
  }, []); 

  return <div className="p-4 text-3xl">Balance: <span className="text-2xl">{parseInt(balance)}</span></div>;
};

export default Balance;

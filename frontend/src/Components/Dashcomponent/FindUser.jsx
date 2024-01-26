import React, { useState } from "react";
import Transfer from "./Transfer";

const FindUser = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [transfer, setTransfer] = useState(false);
  const [index,setIndex] = useState(-1);
  const fetchUsers = () => {
    const encodedFilter = encodeURIComponent(filter);

    fetch(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        // Check if the response structure includes the expected "users" array
        if (result && result.user) {
          setData(result.user);
          setError(null);
        } else {
          setData([]);
          setError("No users found with the specified filter");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setData([]);
        setError("Error fetching users. Please try again later.");
      });
  };
  const handleSendMoneyClick = (i) => {
    setIndex(i);
    setTransfer(!transfer);
  };
  return (
    <div className="flex flex-col w-full items-center gap-4">
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-2/4 p-2 border-2 border-blue-400 rounded-xl"
        placeholder="seach user"
      />
      <button
        onClick={fetchUsers}
        className="ml-2 p-2 w-24 bg-blue-400 text-white rounded-xl"
      >
        Search
      </button>

      <div className="w-2/4">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : !transfer ? (
          data.map((user,i) => (
            <div key={user._id} index={i}  className="flex flex-col p-2 border-b-2 ">
              <div className="flex justify-between w-full">
                <div className="flex gap-2 text-2xl">
                  {user.firstName} {user.lastName}
                </div>
                <button
                  onClick={()=>handleSendMoneyClick(i)}
                  className="bg-black text-white p-2 rounded-lg"
                >
                  Send Money
                </button>
              </div>
            </div>
          ))
        ) : (
          <Transfer setTransfer={setTransfer} index={index} data={data}/>
        )}
      </div>
    </div>
  );
};

export default FindUser;

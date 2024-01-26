import React, { useContext } from "react";
import Header from "./Dashcomponent/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import Balance from "./Dashcomponent/Balance";
import FindUser from "./Dashcomponent/FindUser";

const Dashboard = () => {
  useEffect(() => {
    console.log("restart");
  }, [localStorage.getItem("token")]);
  return (
    <div className="flex flex-col h-full w-full">
      <Header  />

      <div className="flex flex-col w-full pt-12">
        <Balance />
        <FindUser />
      </div>
    </div>
  );
};

export default Dashboard;

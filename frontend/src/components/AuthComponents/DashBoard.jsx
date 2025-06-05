import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import SwitchBtn from "../../../UI/SwitchBtn";

const DashBoard = () => {
  const [authMode, setAuthMode] = useState("login");
  const authOptions = [
    { label: "Login", value: "login" },
    { label: "Register", value: "register" },
  ];

  const authChangeHandler = (newValue) => {
    setAuthMode(newValue);
  };

  return (
    <div className="max-w-[400px]">
      <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
      <p className="text-sm text-zinc-500 text-center">
        Welcome Back, Please enter your details{" "}
      </p>
      <SwitchBtn
        options={authOptions}
        currentValue={authMode}
        onChange={authChangeHandler}
      />
      {authMode === "login" && <Login />}
      {authMode === "register" && <Register />}
    </div>
  );
};

export default DashBoard;

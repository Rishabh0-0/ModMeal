import React from "react";
import mailIcon from "../../assets/mail_6438139.png";

const Login = () => {
  return (
    <form className="flex flex-col gap-2 w-full">
      <div className="border-1 h-16 border-gray-300 py-3 rounded-xl flex divide-x-1 divide-gray-300 items-center gap-6">
        <div className="w-24 h-full flex items-center justify-center">
          <img className="w-6" src={mailIcon} alt="" />
        </div>
        <div className="flex flex-col w-full mr-18">
          <label
            htmlFor=""
            className="font-semibold text-gray-400 text-sm px-2"
          >
            Email Address
          </label>
          <input
            placeholder="you@example.com"
            className="font-bold px-2 focus:outline-none"
          />
        </div>
      </div>
      <button className="h-16 w-full bg-fuchsia-500 hover:bg-fuchsia-600 py-3 rounded-xl text-zinc-100 focus:outline-none focus:shadow-outline disabled:opacity-50 transition-all duration-300">
        Continue
      </button>
    </form>
  );
};

export default Login;

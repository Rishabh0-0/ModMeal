import React from "react";

const AddBtn = ({ onClick, className }) => {
  const classes = `${className} bg-emerald-500 active:bg-emerald-600 rounded-r-xl min-w-9 h-full flex justify-center items-center transition-all duration-300 active:shadow-sm active:translate-y-[-2px] hover:shadow-md hover:translate-y-[-5px] transform cursor-pointer`;

  return (
    <button onClick={onClick} className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};

export default AddBtn;

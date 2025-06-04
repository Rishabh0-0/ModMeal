import React, { useRef } from "react";

const InputForm = ({
  id,
  name,
  title,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
  icon = null,
  className = "",
  ...rest
}) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`border h-16 border-gray-300 py-3 rounded-xl flex items-center  px-4 ${
        icon ? "divide-x divide-gray-300" : ""
      }`}
    >
      {icon && (
        <div
          onClick={handleIconClick}
          className="w-12 h-full flex items-center justify-center pr-4 mr-4"
        >
          <img src={icon} alt="" className="w-6 h-6" />
        </div>
      )}
      <div className="flex flex-col w-full">
        {title && (
          <label htmlFor={id} className=" text-gray-400 text-sm">
            {title}
          </label>
        )}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`font-bold focus:outline-none text-black text-sm ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
};

export default InputForm;

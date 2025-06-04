import React from "react";

const FormBtn = ({
  type = "text",
  children,
  variant = "primary", // primary, secondary, outline
  size = "lg",
  fullWidth = true,
  disabled = false,
  onClick,
  className = "",
}) => {
  const baseStyles =
    "rounded-xl text-zinc-100 focus:outline-none focus:shadow-outline transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900",
    secondary:
      "bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700",
    outline:
      "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-zinc-100 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-800 dark:hover:text-zinc-100",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-16 px-8 text-lg",
  };

  const width = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${width}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default FormBtn;

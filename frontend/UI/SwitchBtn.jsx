import React from "react";

const SwitchBtn = ({ options, currentValue, onChange, id }) => {
  // Basic validation for options
  if (!options || !Array.isArray(options) || options.length === 0) {
    return (
      <div className="text-red-500 p-2 bg-red-100 rounded-md">
        Switch Error: 'options' prop must be a non-empty array.
      </div>
    );
  }

  const selectedIndex = options.findIndex(
    (option) => option.value === currentValue
  );
  const itemWidth = 100 / options.length;

  return (
    <div className="relative flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1 w-full my-2">
      {/* Sliding background */}
      <div
        className="absolute h-12 bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all duration-300 ease-out"
        style={{
          width: `${itemWidth}%`,
          left: `${selectedIndex * itemWidth}%`,
        }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative flex-1 px-4 py-2 h-12 text-sm font-medium rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 ${
            currentValue === option.value
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-600 dark:text-slate-300"
          }`}
          type="button"
          id={`${id}-tab-${option.value}`}
        >
          <span className="flex items-center justify-center whitespace-nowrap">
            {option.icon && (
              <span className="hidden sm:inline-flex mr-2">{option.icon}</span>
            )}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SwitchBtn;

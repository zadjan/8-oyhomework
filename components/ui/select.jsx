"use client";

import { useState } from "react";

export default function Select({ options = [], defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue || options[0] || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="inline-block w-full">
      <select
        value={value}
        onChange={handleChange}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-3
          py-2
          bg-white
          text-gray-900
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
          duration-150
        "
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

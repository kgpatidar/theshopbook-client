import React from "react";

const Input = ({
  type = "text",
  name = "",
  label = "",
  placeholder = "Enter here",
  value,
  required = false,
  onChange = () => {},
  extraProps = {},
}) => {
  return (
    <label className="py-1 flex flex-col text-sm">
      <span className="font-normal">
        {label}
        <span className={`text-red-500 ${required ? "visible" : "invisible"}`}>
          &nbsp;&#42;
        </span>
      </span>
      <input
        className="border outline-none py-1 px-2 rounded"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...extraProps}
      />
    </label>
  );
};

export default Input;

import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function Input(props) {
  const { label, name, isCheckBox, ...rest } = props;
  return (
    <div
      className={`grid mt-5 mx-7  ${
        isCheckBox
          ? "grid-flow-col w-max space-x-3 items-center"
          : "grid-cols-1"
      }`}
    >
      <label
        className="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className="px-3 py-2 mt-1 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        id={name}
        name={name}
        {...rest}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;

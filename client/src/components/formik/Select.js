import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="grid grid-cols-1 mt-5 mx-7">
      <label
        className="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className="px-3 py-2 mt-1 border-2 border-purple-300 rounded-lg form-select focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        as="select"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;

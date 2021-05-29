import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function CheckboxGroup(props) {
  const { label, name, isCheckBox, options, ...rest } = props;
  return (
    <div
      className={`grid grid-flow-col-dense mt-5 mx-7  ${
        isCheckBox ? " items-center lg:w-max" : ""
      }`}
    >
      <label
        className="mr-2 text-xs font-semibold text-gray-500 uppercase md:text-sm text-light"
        htmlFor={name}
      >
        <strong>{label}</strong>
      </label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  className="w-8 h-8 text-purple-600"
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label
                  className="text-xs font-semibold text-gray-600 uppercase md:text-sm text-light"
                  htmlFor={option.value}
                >
                  {option.key}
                </label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default CheckboxGroup;
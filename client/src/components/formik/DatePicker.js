import { ErrorMessage, Field } from "formik";
import React from "react";
import DateView from "react-datepicker";
import TextError from "./TextError";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="grid grid-cols-1 mt-5 mx-7 ">
      <label
        className="text-xs font-semibold text-gray-500 uppercase md:text-sm text-light"
        htmlFor={name}
      >
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              className="px-3 py-3 mt-1 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id={name}
              {...field}
              {...rest}
              selected={(value && new Date(value)) || null}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DatePicker;

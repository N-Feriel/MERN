import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../../../components/formik/FormikControl";

function RegisterFormClient() {
  const sources = [
    { key: "Select Origin Type", value: "" },
    { key: "PPC", value: "PPC" },
    { key: "SITE", value: "SITE" },
    { key: "Facebook", value: "Facebook" },
    { key: "CLSC", value: "CLSC" },
    { key: "LOT", value: "LOT" },
    { key: "OTHERS", value: "OTHERS" },
  ];

  const listGM = [];

  const initialValues = {
    email: " ",
    first_name: "",
    last_name: "",
    phone: Number,
  };

  const validationSchema = Yup.object({});

  const onSubmit = (values) => {
    console.log("values submited", values);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full mt-32 bg-gray-200">
      <h2 className="font-bold uppercase mb-9">Client form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="md:w-4/5">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 ">
                <FormikControl
                  control="input"
                  type="text"
                  label="First Name"
                  name="first_name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Last Name"
                  name="last_name"
                />
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Phone"
                  name="phone"
                />
              </div>

              <div className="flex items-center justify-center gap-4 pt-5 pb-5 md:gap-8">
                <button
                  className="w-auto px-4 py-2 font-medium text-white bg-purple-500 rounded-lg shadow-xl hover:bg-purple-700"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Save
                </button>
                <button
                  className="w-auto px-4 py-2 font-medium text-white bg-gray-500 rounded-lg shadow-xl hover:bg-gray-700"
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegisterFormClient;

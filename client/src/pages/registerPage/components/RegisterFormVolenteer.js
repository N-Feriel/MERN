import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../../../components/formik/FormikControl";
import HeaderForm from "./HeaderForm";

function RegisterFormVolenteer() {
  const sources = [
    { key: "Select Origin Type", value: "" },
    { key: "PPC", value: "PPC" },
    { key: "SITE", value: "SITE" },
    { key: "Facebook", value: "Facebook" },
    { key: "CLSC", value: "CLSC" },
    { key: "OTHERS", value: "OTHERS" },
  ];

  const languages = [
    { _id: "EN", key: "English", value: "english" },
    { _id: "FR", key: "French", value: "french" },
    { _id: "AR", key: "Arabic", value: "arabic" },
    { _id: "ES", key: "Espanol", value: "espanol" },
  ];

  const training = [
    { _id: "J1", value: "DAY_1", key: "DAY 1" },
    { _id: "J2", value: "DAY_2", key: "DAY 2" },
    { _id: "J3", value: "DAY_3", key: "DAY 3" },
  ];
  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "123456",
    phone: Number,
    address: {
      city: "",
      zipCode: "",
      street: "",
      state: "",
    },
    isMember: false,
    isAdmin: false,
    languages: [],
    origin: "",
    startDate: null,
    training: [],
    isActif: false,
  };

  const phoneRegExp = /\d{3}-\d{3}-\d{4}/;

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Must be Valid Email").required("Required"),
    origin: Yup.string().required("Required"),
    languages: Yup.array().required("Must Select at least one"),
    startDate: Yup.date().required("Required").nullable(),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number format 123-456-7890")
      .required("Required"),
  });

  const onSubmit = (values) => {
    console.log("values submited", values);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-32 bg-gray-200">
      <div className="m-3">
        <HeaderForm />
      </div>

      <h2 className="font-bold uppercase mb-9">Volenteer form</h2>

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

              <FormikControl
                control="input"
                type="text"
                label="Street"
                name="address.street"
              />

              <div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                  <FormikControl
                    control="input"
                    type="text"
                    label="City"
                    name="address.city"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="State/Province"
                    name="address.state"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="zipCode"
                    name="address.zipCode"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Member of PPC"
                  name="isMember"
                  isCheckBox
                />
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Admin"
                  name="isAdmin"
                  isCheckBox
                />

                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Actif"
                  name="isActif"
                  isCheckBox
                />
              </div>

              <FormikControl
                control="select"
                label="Source"
                name="origin"
                options={sources}
              />

              <FormikControl
                control="checkbox"
                label="Languages"
                name="languages"
                options={languages}
                isCheckBox
              />

              <FormikControl
                control="checkbox"
                label="Training"
                name="training"
                options={training}
                isCheckBox
              />

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

export default RegisterFormVolenteer;

import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "../../../components/formik/FormikControl";
import HeaderForm from "./HeaderForm";

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
    email: "",
    first_name: "",
    last_name: "",
    phone: Number,
    address: {
      city: "",
      zipCode: "",
      street: "",
      state: "",
    },
    isMember: false,
    origin: "",
    dueDate: null,
    infoParent: {
      isContact: false,
      name: "",
    },
    assignTo: {
      isAssign: false,
      assignGM: "",
    },
    isActif: false,
  };

  const phoneRegExp = /\d{3}-\d{3}-\d{4}/;

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Must be Valid Email").required("Required"),
    origin: Yup.string().required("Required"),
    //   dueDate: Yup.date().required("Required").nullable(),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number format 123-456-7890")
      .required("Required"),

    assignTo: Yup.object({
      assignGM: Yup.string().required("Required"),
    }),
  });

  const onSubmit = (values) => {
    console.log("values submited", values);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full mt-32 bg-gray-200">
      <div className="m-3">
        <HeaderForm />
      </div>

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
                  label="Actif"
                  name="isActif"
                  isCheckBox
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <FormikControl
                  control="input"
                  type="checkbox"
                  label="Contact Parent"
                  name="infoParent.isContact"
                  isCheckBox
                />

                <FormikControl
                  control="input"
                  type="text"
                  label="Name parent"
                  name="infoParent.name"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3">
                <FormikControl
                  control="date"
                  label="Due Date/ Date of Birth"
                  name="dueDate"
                />
                <FormikControl
                  control="select"
                  label="Source"
                  name="origin"
                  options={sources}
                />

                <FormikControl
                  control="select"
                  label="Assign Volenteer Name"
                  name="assignTo.assignGM"
                  options={listGM}
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

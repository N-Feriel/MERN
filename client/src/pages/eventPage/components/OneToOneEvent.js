import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import * as Yup from "yup";
import FormikControl from "../../../components/formik/FormikControl";
import { UserContext } from "../../../components/UserContext";

function OneToOneEvent({ userClient, timeSubmitedCallback }) {
  const { user } = useContext(UserContext);
  const initialValues = {
    name: "Client Time OneToOne",
    participants: {
      numberOfParticipants: 1,
      participantsName: [userClient._id, user._id],
    },
    time: Number,
    eventDate: new Date().toISOString(),
    type: "OneToOne",
    typeOneToOne: "DEFAULT",
  };
  const jwt = localStorage.getItem("token");
  const [errors, setErrors] = useState("");

  const validationSchema = Yup.object({
    time: Yup.number().required("Required").positive("Must be Positive Number"),
  });

  const url = `/api/event`;

  const communicationTypes = [
    { value: "DEFAULT", key: "DEFAULT" },
    { value: "SMS", key: "SMS" },
    { value: "PHONE", key: "PHONE" },
    { value: "EMAIL", key: "EMAIL" },
    { value: "Others", key: "OTHERS" },
  ];

  const onSubmit = async (values) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        timeSubmitedCallback();
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="flex">
      {errors && <div>{errors}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="select"
                label="Communication Type"
                name="typeOneToOne"
                options={communicationTypes}
              />
              <FormikControl
                control="input"
                type="text"
                label="Time"
                name="time"
              />

              <div className="flex items-center justify-center gap-4 pt-5 pb-5 mt-3 md:gap-8">
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

export default OneToOneEvent;

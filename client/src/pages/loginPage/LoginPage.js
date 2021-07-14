import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Redirect, useHistory, useLocation } from "react-router";
import * as Yup from "yup";
import FormikControl from "../../components/formik/FormikControl";
import { getCurrentUser, login } from "../../services/authService";

function LoginPage() {
  const initialValues = { email: "", password: "" };

  const [error, setError] = useState("");

  const history = useHistory();
  const { state } = useLocation();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email Format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await login(values);

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        localStorage.setItem("token", responseBody.data);
        history.push(state.redirectTo);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setError(error);
    }
  };

  if (getCurrentUser()) return <Redirect to="/" />;

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-32 bg-purple-300 h-96 lg:w-3/4 rounded-3xl">
      {error && <div className="text-red-200">{error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col w-4/5 ">
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />

              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
              />
              <button
                className="px-4 py-2 mx-auto my-6 mr-0 bg-purple-100 rounded-md hover:bg-purple-600 hover:text-purple-100"
                type="submit"
                disabled={!formik.isValid}
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginPage;

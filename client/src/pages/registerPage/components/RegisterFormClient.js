import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import * as Yup from "yup";
import FormikControl from "../../../components/formik/FormikControl";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { AssignContext } from "../../../components/AssignContext";
import ModalComp from "../../../components/ModelCom";

function RegisterFormClient() {
  const [errors, setErrors] = useState("");
  const url = "/api/register/client";
  const jwt = localStorage.getItem("token");
  const { state } = useLocation();

  const { listVolenteers } = useContext(AssignContext);

  const history = useHistory();

  const sources = [
    { key: "Select Origin Type", value: "" },
    { key: "PPC", value: "PPC" },
    { key: "SITE", value: "SITE" },
    { key: "Facebook", value: "Facebook" },
    { key: "CLSC", value: "CLSC" },
    { key: "LOT", value: "LOT" },
    { key: "OTHERS", value: "OTHERS" },
  ];

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
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
      assignGM: Yup.string(),
    }),
  });

  const [modalIsOpen, setIsOpenModal] = useState(false);
  const [messageNotification, setMessageNotification] = useState(null);

  const createNotification = async (values) => {
    let notificationData = {
      name: "New Client is Assign to you",
      isSeen: false,
      sendBy: "",
      eventDate: Date.now(),
      userId: values.assignTo.assignGM,
      clientId: values.email,
    };

    try {
      let responseNot = await fetch(`/api/notification`, {
        method: "POST",
        body: JSON.stringify(notificationData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      let responseBodyNotify = await responseNot.json();

      if (responseBodyNotify.status === 201) {
        setMessageNotification("Notification was send to volenteer");
        setIsOpenModal(true);
      } else {
        throw responseBodyNotify.message;
        //redirect user to resend email!!!
      }
    } catch (error) {
      setErrors(error);
    }
  };

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
        createNotification(values);
        history.push(state.redirectTo);
      } else {
        console.log(responseBody);
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-200">
      <h2 className="text-xl font-bold text-purple-800 uppercase m-9 lg:text-2xl">
        Client form
      </h2>

      <ModalComp modalIsOpen={modalIsOpen}>
        <>
          <h4 className="mb-4 text-center lg:text-xl">{messageNotification}</h4>
          <button
            className="px-4 py-2 ml-auto mr-4 bg-red-300 rounded-lg w-min"
            onClick={() => setIsOpenModal(false)}
          >
            close
          </button>
        </>
      </ModalComp>
      {errors && (
        <div className="flex text-red-500 lg:text-lg">
          <ExclamationCircleIcon className="h-6 mx-2" />
          {errors}
        </div>
      )}

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
                  label="State / Province"
                  name="address.state"
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="zip Code"
                  name="address.zipCode"
                />
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
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
                <FormikControl
                  control="date"
                  label="Due Date/ Date of Birth"
                  name="dueDate"
                />
              </div>

              <div className="grid lg:grid-cols-2">
                <FormikControl
                  control="select"
                  label="Source"
                  name="origin"
                  options={sources}
                />

                <FormikControl
                  control="select"
                  label="Assign To"
                  name="assignTo.assignGM"
                  options={listVolenteers}
                />
              </div>
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

export default RegisterFormClient;

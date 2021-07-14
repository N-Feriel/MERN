import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { AssignContext } from "../../components/AssignContext";
import FormikControl from "../../components/formik/FormikControl";
import { UserContext } from "../../components/UserContext";
import { updateClientData } from "../../store/reducers/Client/actions";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

function UpdatePage({ isClient, initialState, setClientData }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");

  const jwt = localStorage.getItem("token");

  const { user } = useContext(UserContext);
  const { listVolenteers } = useContext(AssignContext);

  let url;

  let hasAccess = user ? user.isAdmin : false;

  const sources = [
    { key: "Select Origin Type", values: "" },
    { key: "PPC", value: "PPC" },
    { key: "SITE", value: "SITE" },
    { key: "Facebook", value: "Facebook" },
    { key: "CLSC", value: "CLSC" },
    { key: "LOT", value: "LOT" },
    { key: "OTHERS", value: "OTHERS" },
  ];

  !isClient ? (url = `/api/users/volenteers`) : (url = `/api/users/clients`);

  console.log(url, "url");

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

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 201) {
        if (isClient) {
          dispatch(updateClientData(responseBody.data));
          setClientData(responseBody.data);

          if (
            hasAccess &&
            initialState.assignTo.assignGM !== values.assignTo.assignGM
          ) {
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
                alert("Notification was send to Volenteer");
              } else {
                // redirect user to resend email!!!
                console.log(responseBodyNotify);

                throw responseBodyNotify.message;
              }
            } catch (error) {
              setErrors(error);
            }
          }
        } else {
          dispatch(updateClientData(responseBody.data));
        }

        alert("The user is updated");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="grid p-4 ">
      {errors && (
        <div className="flex text-red-500 lg:text-lg">
          <ExclamationCircleIcon className="h-6 mx-2" />
          {errors}
        </div>
      )}

      <Formik
        initialValues={initialState}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div>
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

              {isClient ? (
                <>
                  <div className="grid items-center mx-1 md:grid-flow-col md:grid-cols-2">
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

                  <div>
                    <FormikControl
                      control="select"
                      label="Source"
                      name="origin"
                      options={sources}
                    />
                  </div>

                  {hasAccess && (
                    <FormikControl
                      control="select"
                      label="AssignGM"
                      name="assignTo.assignGM"
                      options={listVolenteers}
                    />
                  )}
                </>
              ) : (
                <>
                  <div>
                    <FormikControl
                      control="date"
                      label="Start Date"
                      name="startDate"
                    />

                    <FormikControl
                      control="input"
                      type="checkbox"
                      label="Admin"
                      name="isAdmin"
                      isCheckBox
                    />
                  </div>

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
                </>
              )}

              <div className="flex justify-end gap-4 pt-5 pb-5 mt-3 md:gap-8">
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

export default UpdatePage;

import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { Formik, Form } from "formik";
import FormikControl from "../../components/formik/FormikControl";
import { UserContext } from "../../components/UserContext";
import ModalComp from "../../components/ModelCom";
import TextError from "../../components/formik/TextError";

function EventPage() {
  const url = `/api/event`;
  const [errors, setErrors] = useState("");
  const history = useHistory();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  const { user } = useContext(UserContext);
  const eventTypes = [
    { key: "Select event Type", value: "" },
    { value: "meeting", key: "Meeting" },
    { value: "training", key: "Training" },
    { value: "oneToOne", key: "OneToOne" },
    { value: "volunteer", key: "Volunteer" },
    { value: "faceBook", key: "FaceBook" },
    { value: "others", key: "Others" },
  ];
  const initialValues = {
    name: "",
    participants: {
      numberOfParticipants: 1,
      participantsName: [],
    },
    time: 1,
    eventDate: null,
    type: "",
    typeOneToOne: "DEFAULT",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    time: Yup.number().required("Required").positive("Must be Positive Number"),
    participants: Yup.object({
      numberOfParticipants: Yup.number()
        .required("Required")
        .positive("Must be Positive Number"),
      participantsName: Yup.array().required("Required"),
    }),
    eventDate: Yup.date().required("Required").nullable(),
    type: Yup.string().required("Required"),
  });

  const jwt = localStorage.getItem("token");

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
        setMessageAl(`Success - The event was submited `);
        setIsOpen(true);
      } else {
        // console.log("resonpse", responseBody);
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
      console.log(errors, "erros");
    }
  };

  function closeModal() {
    setIsOpen(false);
    history.push("/home");
  }

  return (
    <div>
      <ModalComp
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      >
        <h4 className="mb-4 text-center lg:text-xl">{messageAl}</h4>
        <div className="flex mx-auto mt-5">
          <button
            className="px-4 py-2 ml-auto mr-4 text-sm text-white uppercase bg-purple-500 rounded-lg w-min "
            onClick={() => setIsOpen(false)}
          >
            Ok
          </button>
        </div>
      </ModalComp>
      {errors && <TextError>{errors}</TextError>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="m-auto md:w-4/5">
              <div className="grid grid-cols-1">
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                />
                <FormikControl
                  control="select"
                  label="Communication Type"
                  name="type"
                  options={eventTypes}
                />

                <FormikControl
                  control="date"
                  label="Event Date"
                  name="eventDate"
                />

                <FormikControl
                  control="input"
                  type="text"
                  label="Number Of Participants"
                  name="participants.numberOfParticipants"
                />

                <FormikControl
                  control="input"
                  type="text"
                  label="Time"
                  name="time"
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

export default EventPage;

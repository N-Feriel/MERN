import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "../../components/formik/FormikControl";

function EventPage() {
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
    time: Number,
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

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
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

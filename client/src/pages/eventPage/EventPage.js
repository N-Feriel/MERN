import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Error from "../../components/Error";

import FormikControl from "../../components/formik/FormikControl";
import Loading from "../../components/Loading";
import ModalComp from "../../components/ModelCom";

function EventPage() {
  const { _id } = useParams();
  const [statusEvent, setStatusEvent] = useState("loading");
  const [eventDetails, setEventsData] = useState([]);
  const [errors, setErrors] = useState("");
  const [isUpdate, setUpdate] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  const url = `/api/event`;

  const history = useHistory();

  var moment = require("moment");
  const jwt = localStorage.getItem("token");

  const getEventDetails = async () => {
    try {
      const responseHeader = await fetch(`${url}/${_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const response = await responseHeader.json();

      if (response.status === 200) {
        setEventsData(response.data);
        setStatusEvent("error");
      } else {
        throw response.message;
      }
    } catch (error) {
      setErrors(error);
      setStatusEvent("error");
    }
  };

  const onSubmit = async (values) => {
    try {
      const responseHeader = await fetch(`${url}/${_id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const response = await responseHeader.json();

      if (response.status === 201) {
        setEventsData(response.data);
        setStatusEvent("idle");
        setUpdate(false);
        setMessageAl("Event was updated");
        setIsOpen(true);
      } else {
        throw response.message;
      }
    } catch (error) {
      // console.log(error);
      setErrors(error);
      setStatusEvent("error");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const responseHeader = await fetch(`${url}/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const response = await responseHeader.json();

      if (response.status === 200) {
        setMessageAl("Event was deleted");
        setIsOpen(true);
      } else {
        throw response.message;
      }
    } catch (error) {
      setStatusEvent("error");
      setErrors(error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    history.push("/admin");
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  if (statusEvent === "loading") {
    return <Loading />;
  } else if (statusEvent === "error") {
    return <Error />;
  } else if (statusEvent === "idle") {
    return (
      <main className="grid px-6 py-4 bg-yellow-200 gap-y-5 lg:grid-flow-row lg:grid-cols-3 rounded-xl">
        <ModalComp modalIsOpen={modalIsOpen}>
          <h4 className="mb-4 text-center lg:text-xl">{messageAl}</h4>
          <div className="flex mx-auto mt-5">
            <button
              className="px-4 py-2 ml-auto mr-4 text-sm text-white uppercase bg-purple-500 rounded-lg w-min "
              onClick={handleClose}
            >
              Ok
            </button>
          </div>
        </ModalComp>
        <div className="w-4/5 col-span-1 p-6 m-auto space-y-4 bg-yellow-100 rounded-3xl ">
          <h4 className="ml-6 text-lg font-bold text-yellow-900 lg:text-2xl lg:font-semibold">
            Event details
          </h4>
          <div>
            <strong>Name: </strong>
            {eventDetails.name}
          </div>
          <div>
            <strong>Time: </strong>
            {eventDetails.time} min
          </div>
          <div>
            <strong>Type: </strong>
            {eventDetails.type}
          </div>
          <div>
            <strong>Date: </strong>
            {moment(eventDetails.eventDate).format("MMM Do YYYY")}
          </div>
        </div>

        {isUpdate ? (
          <div className="w-4/5 p-6 m-auto space-y-4 bg-yellow-100 lg:col-span-2 rounded-3xl ">
            <Formik
              initialValues={eventDetails}
              enableReinitialize
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Name"
                      name="name"
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

                    <div className="flex items-end justify-center gap-4 pt-5 pb-5 mt-3 md:gap-8 md:mb-auto">
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
        ) : (
          <div className="flex justify-around lg:max-h-10 lg:self-end">
            <button
              className="px-4 py-1 text-white uppercase bg-green-600 rounded-md "
              onClick={() => setUpdate(!isUpdate)}
            >
              Update
            </button>
            <button
              className="px-4 py-1 text-white uppercase bg-red-600 rounded-md"
              onClick={() => handleDelete(eventDetails._id)}
            >
              Delete
            </button>
          </div>
        )}
      </main>
    );
  }
}

export default EventPage;

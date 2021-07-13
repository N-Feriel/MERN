import React, { useContext, useEffect, useState } from "react";
import TextError from "../../../components/formik/TextError";
import { UserContext } from "../../../components/UserContext";
import moment from "moment";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import FormikControl from "../../../components/formik/FormikControl";

import {
  PhoneIcon,
  LocationMarkerIcon,
  MailIcon,
  CalendarIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  GlobeIcon,
  BookOpenIcon,
  XIcon,
  PencilAltIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { logout } from "../../../services/authService";
import { useHistory } from "react-router-dom";

function Settings({ setErrors, setMessageUpdate, setIsOpenModal1, errors }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [userEvents, setUserEvents] = useState([]);
  const [statusErrorEvents, setStatusErrorEvents] = useState("");
  const [userStatus, setUserStatus] = useState("loading");
  const [userData, setUserData] = useState([]);

  const [isMore, setIsMore] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(8, "min of 8 characters"),

    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Required"),
  });

  const jwt = localStorage.getItem("token");

  const getUsertime = async () => {
    try {
      const url = `/api/event/totalTime/${user._id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        setUserEvents(responseBody.data);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setStatusErrorEvents(error);
    }
  };

  const getUserData = async () => {
    try {
      const url = `/api/users/volenteers/${user._id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setUserData(responseBody.data);
        setUserStatus("idle");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      //   console.log(error);
      setUserStatus(error);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      let response = await fetch(`/api/auth/login/changePassword`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        localStorage.setItem("token", responseBody.token);
        setIsOpen(false);
        setMessageUpdate(responseBody.message);
        setIsOpenModal1(true);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const handleLogOut = () => {
    logout();
    history.push("/");
  };

  useEffect(() => {
    getUserData();
    getUsertime();
  }, []);

  if (userStatus === "loading") return <div>...Loading</div>;
  else if (userStatus === "error") return <div>...Error</div>;
  else if (userStatus === "idle")
    return (
      <div>
        {statusErrorEvents && <TextError>{statusErrorEvents}</TextError>}

        <div className="relative p-6 bg-yellow-900 shadow-inner bg-opacity-20 rounded-3xl">
          <div>
            {isOpen ? (
              <div className="relative p-4 bg-yellow-100 rounded-3xl">
                <XIcon
                  className="absolute h-6 text-purple-500 cursor-pointer right-4"
                  onClick={() => setIsOpen(false)}
                />
                {errors && <TextError>{errors}</TextError>}

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleChangePassword}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormikControl
                          control="input"
                          type="password"
                          label="Old Password"
                          name="password"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="New Password"
                          name="newPassword"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="Confirm new Password"
                          name="confirmNewPassword"
                        />
                        <div className="flex justify-center p-4 space-x-4">
                          <button
                            className="p-2 text-white bg-purple-400 rounded-lg cursor-pointer w-min hover:bg-purple-600"
                            type="submit"
                            disabled={!formik.isValid}
                          >
                            Save
                          </button>
                          <button
                            type="reset"
                            className="p-2 text-white bg-gray-300 rounded-lg cursor-pointer w-min hover:bg-gray-600"
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
              <button onClick={() => setIsOpen(true)}>
                <PencilAltIcon className="absolute h-8 text-yellow-700 cursor-pointer right-4" />
              </button>
            )}

            <h2 className="mb-1 text-gray-400">Account Details </h2>
            <div className="flex items-end p-2 space-x-2">
              <UserIcon className="h-6 text-yellow-900" />
              <h2 className="text-sm">
                {userData.first_name} {userData.last_name}
              </h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <CalendarIcon className="h-6 text-yellow-900" />
              <h3 className="text-sm">
                Member since:
                {moment(userData.startDate).format("MMM Do YY")}
              </h3>
            </div>

            <h2 className="text-gray-400">Contact </h2>

            <div className="flex items-end p-2 space-x-2">
              <MailIcon className="h-6 text-yellow-900" />
              <h2 className="text-sm">{userData.email}</h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <PhoneIcon className="h-6 text-yellow-900" />
              <h2 className="text-sm">{userData.phone}</h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <LocationMarkerIcon className="h-6 text-yellow-900" />
              <h2 className="text-sm">
                {userData.address.city || "Saint Lambert"} |{" "}
                {userData.address.zipCode || "J4P"}
              </h2>
            </div>

            {isMore ? (
              <div className="relative grid p-4 bg-white bg-opacity-60 rounded-xl">
                <XIcon
                  className="absolute right-0 h-6 text-yellow-900 cursor-pointer"
                  onClick={() => setIsMore(false)}
                />
                <div className="flex items-end p-2 space-x-2">
                  <GlobeIcon className="h-6 text-yellow-900" />
                  <h2 className="text-sm">Languages:</h2>

                  {userData.languages.length > 0 ? (
                    <div className="flex flex-wrap space-x-4">
                      {userData.languages.map((langugae) => (
                        <div key={langugae}>
                          <p className="text-sm text-gray-500 uppercase">
                            {langugae}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h2>No languge is set to your profile</h2>
                  )}
                </div>

                <div className="flex items-end p-2 space-x-2">
                  <BookOpenIcon className="h-6 text-yellow-900" />
                  <h2 className="text-sm">Training : </h2>
                  {userData.training.length > 0 ? (
                    <div className="flex flex-wrap space-x-4">
                      {userData.training.map((training) => (
                        <div key={training}>
                          <p className="text-sm text-gray-500 ">{training}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h2>No training is set to your profile</h2>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-end p-2 space-x-2">
                <DotsCircleHorizontalIcon
                  className="h-6 text-yellow-900 cursor-pointer"
                  onClick={() => setIsMore(true)}
                />
                <h2 className="text-sm">more!</h2>
              </div>
            )}

            <h2 className="mb-1 text-gray-400">Total time</h2>
            {userEvents.length > 0 ? (
              <div className="flex flex-wrap space-x-6">
                {userEvents.map((eventType) => (
                  <div key={eventType._id}>
                    {eventType._id} : <strong>{eventType.total} </strong> (mn)
                  </div>
                ))}
              </div>
            ) : (
              <div>No total time Yet in your account</div>
            )}
          </div>
        </div>

        <div className="mr-0" onClick={handleLogOut}>
          <button className="flex px-4 py-2 mx-auto my-4 bg-gray-300 rounded-lg cursor-pointer hover:bg-pink-600">
            <LogoutIcon className="h-6 mx-2" /> logout
          </button>
        </div>
      </div>
    );
}

export default Settings;

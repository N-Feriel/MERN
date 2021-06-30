import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import { UserContext } from "../../components/UserContext";
import ModalComp from "../../components/ModelCom";
import OneToOneEvent from "../eventPage/components/OneToOneEvent";
import UpdatePage from "../updatePage/UpdatePage";

import {
  PhoneIcon,
  LocationMarkerIcon,
  MailIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/outline";

function ClientPage() {
  const { _id } = useParams();
  const [statusClientData, setStatusClientData] = useState("loading");
  const [addTime, setAddTime] = useState(false);

  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState("");

  const [clientData, setClientData] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  const [isDelete, setIsDelete] = useState(false);
  const [messageNotification, setMessageNotification] = useState(
    "Are you sure to delete the user permantely"
  );
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const [totalTime, getTotalTime] = useState(0);
  const history = useHistory();

  const { pathname } = useLocation();

  const location = {
    pathname: `/register/${user}`,
    state: {
      redirectTo: pathname,
    },
  };
  const jwt = localStorage.getItem("token");

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/users/clients/${_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        setClientData(responseBody.data);
        setStatusClientData("idle");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
      setStatusClientData("error");
    }
  };

  const getUsertime = async (clientId) => {
    try {
      const url = `/api/event/oneToOne/totalTime/${clientId}`;

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
        if (responseBody.total[0]) {
          getTotalTime(responseBody.total[0].total);
        }
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/clients/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setIsDelete(true);
        setMessageNotification(`Volenteer with ${clientData.first_name} ${clientData.last_name}
          was deleted form Data Base`);
        setIsOpenModalDelete(true);
        history.push("/admin");
      } else {
        setMessageNotification(`Something goes wrong The Client with ${clientData.first_name} ${clientData.last_name}
        is still in the Data Base - CLose and try again`);
        setIsDelete(true);
        setIsOpenModalDelete(true);
        throw responseBody.message;
      }
    } catch (error) {
      setStatusClientData("error");
    }
  };

  const handleAddTime = () => {
    setAddTime(!addTime);
  };

  const timeSubmitedCallback = () => {
    setAddTime(false);
    setMessageAl("Time Submited");
    setIsOpen(true);
  };

  const handleArchive = async () => {
    try {
      const response = await fetch(`/api/users/clients/user`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          isActif: !clientData.isActif,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        setClientData(responseBody.data);
        setStatusClientData("idle");
        setMessageAl(`The user has change the state `);
        setIsOpen(true);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUsertime(_id);
  }, [addTime]);

  if (statusClientData === "loading") return <div>...Loading</div>;
  else if (statusClientData === "error") return <div>...Error</div>;
  else if (statusClientData === "idle" && clientData) {
    const hasAccess = clientData.assignTo.assignGM === user._id;
    console.log(hasAccess, clientData);

    return (
      <main className="flex flex-col px-4">
        <ModalComp modalIsOpen={isOpenModalDelete}>
          <h4 className="mb-4 text-center lg:text-xl">{messageNotification}</h4>
          <div className="flex mx-auto mt-5">
            {isDelete ? (
              <button
                className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-blue-300 rounded-lg w-min"
                onClick={() => setIsOpenModalDelete(false)}
              >
                Close
              </button>
            ) : (
              <>
                <button
                  className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-red-300 rounded-lg w-min"
                  onClick={() => handleDelete(clientData._id)}
                >
                  yes
                </button>

                <button
                  className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-green-500 rounded-lg w-min "
                  onClick={() => setIsOpenModalDelete(false)}
                >
                  cancel
                </button>
              </>
            )}
          </div>
        </ModalComp>

        <ModalComp modalIsOpen={modalIsOpen}>
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

        <div className="flex justify-between px-10 my-4 lg:span-row-1 row-span-full">
          <h1 className="text-xl lg:text-3xl">Edit Client</h1>
          <button
            className="px-4 py-1 text-white uppercase bg-green-600 rounded-md"
            onClick={() => history.push("/register/client")}
          >
            Create
          </button>
        </div>

        <div className="grid gap-6 px-5 lg:grid-flow-col lg:grid-cols-4">
          <div className="grid p-4 space-y-3 bg-white shadow-inner rounded-xl opacity-90 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div
                className={`w-16 h-16 rounded-full items-center flex justify-center text-white uppercase ${
                  clientData.isActif ? "bg-pink-600 " : "bg-gray-400 "
                }`}
              >
                {clientData.isActif ? "client" : "archive"}
              </div>
              <div>
                <h2>@ {clientData.first_name}</h2>
              </div>
            </div>
            <h2 className="mb-1 text-gray-400">Account Details </h2>
            <div className="flex items-end p-2 space-x-2">
              <UserIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">
                {clientData.first_name} {clientData.last_name}
              </h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <CalendarIcon className="h-6 text-purple-900" />
              <h3 className="text-sm">Date {clientData.dueDate}</h3>
            </div>

            <h2 className="text-gray-400">Contact </h2>

            <div className="flex items-end p-2 space-x-2">
              <MailIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">{clientData.email}</h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <PhoneIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">{clientData.phone}</h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <LocationMarkerIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">
                {clientData.address.city} | {clientData.address.zipCode}
              </h2>
            </div>
            <div className="flex">
              <h2>Total Time : </h2>
              <p>{totalTime || 0} mn</p>
            </div>

            <div className="flex justify-around mt-6">
              <button
                className="w-auto px-4 py-2 font-medium text-white bg-yellow-500 rounded-lg shadow-xl hover:bg-yellow-700"
                onClick={handleArchive}
              >
                {clientData.isActif ? "Archive" : "Activate"}
              </button>
              <button
                className="w-auto px-4 py-2 font-medium text-white bg-red-500 rounded-lg shadow-xl hover:bg-red-700"
                onClick={() => setIsOpenModalDelete(true)}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="p-4 bg-white shadow-inner rounded-2xl lg:col-span-3">
            <h2 className="ml-6 text-lg font-bold lg:text-2xl lg:font-semibold">
              Edit
            </h2>
            <UpdatePage
              initialState={clientData}
              setClientData={setClientData}
              isClient
            />
          </div>
        </div>

        {hasAccess && (
          <button
            className={clientData.isActif ? "" : "disabled"}
            disabled={clientData.isActif === false}
            onClick={handleAddTime}
          >
            add Time
          </button>
        )}

        {addTime && (
          <OneToOneEvent
            userGD={clientData}
            timeSubmitedCallback={timeSubmitedCallback}
          />
        )}
      </main>
    );
  }
}

export default ClientPage;

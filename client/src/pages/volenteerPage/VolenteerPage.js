import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

import UpdatePage from "../updatePage/UpdatePage";
import ModalComp from "../../components/ModelCom";
import {
  PhoneIcon,
  LocationMarkerIcon,
  MailIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function VolenteerPage() {
  const { _id } = useParams();
  const jwt = localStorage.getItem("token");
  const history = useHistory();

  const [volenteerData, setVolenteerData] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [statusVolenteer, setStatusVolenteer] = useState("loading");

  const [clientListAssigned, setClientListAssigned] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [messageAl, setMessageAl] = useState("");

  const [isDelete, setIsDelete] = useState(false);
  const [messageNotification, setMessageNotification] = useState(
    "Are you sure to delete the user permantely"
  );
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/users/volenteers/${_id}`);

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setVolenteerData(responseBody.data);
        setStatusVolenteer("idle");
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      //   console.log(error);
      setStatusVolenteer(error);
    }
  };

  const getUsertime = async () => {
    try {
      const url = `/api/event/totalTime/${_id}`;

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
      //   console.log(error);
      setStatusVolenteer(error);
    }
  };

  const handleArchive = async () => {
    try {
      const response = await fetch(`/api/users/volenteers/user`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          isActif: !volenteerData.isActif,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        setVolenteerData(responseBody.data);
        setStatusVolenteer("idle");
        setMessageAl(`The user has change the state `);
        setIsOpen(true);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setStatusVolenteer("error");
      //   console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/volenteers/${_id}`, {
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
        setMessageNotification(`Volenteer with ${volenteerData.first_name} ${volenteerData.last_name}
          was deleted form Data Base`);
        setIsOpenModalDelete(true);
        history.push("/admin");
      } else {
        setMessageNotification(`Something goes wrong The Client with ${volenteerData.first_name} ${volenteerData.last_name}
        is still in the Data Base - CLose and try again`);
        setIsDelete(true);
        setIsOpenModalDelete(true);
        throw responseBody.message;
      }
    } catch (error) {
      setStatusVolenteer("error");
    }
  };

  const getClientAssigned = async () => {
    let url = `/api/users/clientList/${_id}`;

    try {
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
        setClientListAssigned(responseBody.data);
      } else {
        throw responseBody.mesage;
      }
    } catch (error) {
      setStatusVolenteer("error");
    }
  };

  useEffect(() => {
    getUserData();
    getUsertime();
    getClientAssigned();
  }, []);

  if (statusVolenteer === "loading") return <Loading />;
  else if (statusVolenteer === "error") return <Error />;
  else if (statusVolenteer === "idle")
    return (
      <main className="flex flex-col px-4 ">
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
                  onClick={() => handleDelete(volenteerData._id)}
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
              className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-purple-500 rounded-lg w-min "
              onClick={() => setIsOpen(false)}
            >
              Ok
            </button>
          </div>
        </ModalComp>
        <div className="flex justify-between px-10 my-4 lg:span-row-1 row-span-full">
          <h1 className="text-xl lg:text-3xl">Edit Volenteer</h1>
          <button
            className="px-4 py-1 text-white uppercase bg-green-600 rounded-md"
            onClick={() => history.push("/register/volenteer")}
          >
            Create
          </button>
        </div>

        <div className="grid gap-6 px-5 lg:grid-flow-col lg:grid-cols-4">
          <div className="grid p-4 space-y-3 bg-white shadow-inner rounded-xl opacity-90 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div
                className={`w-16 h-16 rounded-full items-center flex justify-center text-white ${
                  volenteerData.isActif ? "bg-green-600 " : "bg-gray-400 "
                }`}
              >
                {volenteerData.isAdmin ? "ADMIN" : "USER"}
              </div>
              <div>
                <h2>@ {volenteerData.first_name}</h2>

                <p className="text-sm text-gray-400">
                  {volenteerData.isAdmin
                    ? "Administrator && Volenteer"
                    : " Volenteer"}
                </p>
              </div>
            </div>
            <h2 className="mb-1 text-gray-400">Account Details </h2>
            <div className="flex items-end p-2 space-x-2">
              <UserIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">
                {volenteerData.first_name} {volenteerData.last_name}
              </h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <CalendarIcon className="h-6 text-purple-900" />
              <h3 className="text-sm">
                Volenteer since {volenteerData.start_Date}
              </h3>
            </div>

            <h2 className="text-gray-400">Contact </h2>

            <div className="flex items-end p-2 space-x-2">
              <MailIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">{volenteerData.email}</h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <PhoneIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">{volenteerData.phone}</h2>
            </div>
            <div className="flex items-end p-2 space-x-2">
              <LocationMarkerIcon className="h-6 text-purple-900" />
              <h2 className="text-sm">
                {volenteerData.address.city} | {volenteerData.address.zipCode}
              </h2>
            </div>

            <h2 className="text-gray-400">Activities </h2>

            <div>
              <h4 className="my-3 text-purple-900">Total time</h4>
              {userEvents.length > 0 ? (
                <div className="flex flex-wrap">
                  {userEvents.map((eventType) => (
                    <div key={eventType._id}>
                      {eventType._id} : <strong>{eventType.total}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="px-4 text-xs text-gray-300">
                  No total time Yet in your account
                </p>
              )}

              {clientListAssigned ? (
                <div className="grid grid-flow-col gap-2 mt-5 mb-3 lg:grid-flow-row lg:grid-cols-2 lg:grid-row-2">
                  <h4 className="text-purple-900 lg:row-span-1 lg:col-span-2">
                    Number of Clients:{" "}
                  </h4>
                  <div className="flex">
                    Actives:
                    <p className="px-2 font-semibold">
                      {clientListAssigned.actifs
                        ? clientListAssigned.actifs.length
                        : " 0 "}
                    </p>
                  </div>
                  <div className="flex">
                    Archives :
                    <p className="px-2 font-semibold">
                      {clientListAssigned.archives
                        ? clientListAssigned.archives.length
                        : " 0 "}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="px-4 text-xs text-gray-300">
                  No Clients assigned yet
                </p>
              )}
            </div>

            <div className="flex justify-around mt-6">
              <button
                className="w-auto px-4 py-2 font-medium text-white bg-yellow-500 rounded-lg shadow-xl hover:bg-yellow-700"
                onClick={handleArchive}
              >
                {volenteerData.isActif ? "Archive" : "Activate"}
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
            <UpdatePage initialState={volenteerData} />
          </div>
          {/* <div
              className={`w-32 h-32 rounded-2xl shadow-inner items-center flex justify-center text-white ${
                volenteerData.isActif ? "bg-green-600 " : "bg-gray-400 "
              }`}
            >
              {volenteerData.isAdmin ? "ADMIN" : "USER"}
            </div> */}
        </div>
      </main>
    );
}

export default VolenteerPage;

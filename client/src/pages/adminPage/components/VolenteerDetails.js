import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import {
  updateVolenteerData,
  removeVolenteer,
  receiveVolenteerDataError,
} from "../../../store/reducers/Volenteer/actions";
import ModalComp from "../../../components/ModelCom";

import {
  ArchiveIcon,
  TrashIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";

function VolenteerDetails({ volenteer }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const url = "/api/users/volenteers";
  const jwt = localStorage.getItem("token");

  const [modalIsOpen, setIsOpenModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [messageNotification, setMessageNotification] = useState(
    "Are you sure to delete the user permantely"
  );

  const handleVolenteerDetails = (_id) => {
    history.push(`/volenteerDetails/${_id}`);
  };

  const handleArchive = async (user) => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: user._id,
          isActif: !user.isActif,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 201) {
        // setStatusGMData("idle");
        dispatch(updateVolenteerData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveVolenteerDataError(error));
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${url}/${_id}`, {
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
        setMessageNotification(`Volenteer with ${volenteer.first_name} ${volenteer.last_name}
          was deleted form Data Base`);
        setIsOpenModal(true);

        dispatch(removeVolenteer(volenteer));
      } else {
        setMessageNotification(`Something goes wrong The Client with ${volenteer.first_name} ${volenteer.last_name}
         is still in the Data Base - CLose and try again`);
        setIsDelete(true);
        setIsOpenModal(true);
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveVolenteerDataError(error));
    }
  };

  return (
    <div
      className={`grid grid-flow-row grid-cols-12 gap-5 py-4 px-6 rounded-xl ${
        volenteer.isActif ? "bg-pink-900" : "bg-pink-200 text-gray-400"
      }`}
    >
      <ModalComp modalIsOpen={modalIsOpen}>
        <h4 className="mb-4 text-center lg:text-xl">{messageNotification}</h4>
        <div className="flex mx-auto mt-5">
          {isDelete ? (
            <button
              className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-blue-300 rounded-lg w-min"
              onClick={() => setIsOpenModal(false)}
            >
              Close
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-red-300 rounded-lg w-min"
                onClick={() => handleDelete(volenteer._id)}
              >
                yes
              </button>

              <button
                className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-green-500 rounded-lg w-min "
                onClick={() => setIsOpenModal(false)}
              >
                cancel
              </button>
            </>
          )}
        </div>
      </ModalComp>
      <div className="col-span-3">
        {volenteer.first_name} {volenteer.last_name}
      </div>
      <div className="col-span-4">{volenteer.email}</div>
      <div className="col-span-2">{volenteer.phone}</div>
      <div
        className="col-span-1"
        onClick={() => handleVolenteerDetails(volenteer._id)}
      >
        <InformationCircleIcon className="h-6 " />
      </div>
      <div className="col-span-1" onClick={() => handleArchive(volenteer)}>
        {volenteer.isActif ? (
          <ArchiveIcon className="h-6 text-gray-400" />
        ) : (
          <ShieldCheckIcon className="h-6 text-green-600" />
        )}
      </div>
      <div className="col-span-1 " onClick={() => setIsOpenModal(true)}>
        <TrashIcon className="h-6 text-red-500" />
      </div>
    </div>
  );
}

export default VolenteerDetails;

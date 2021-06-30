import React, { useState } from "react";
import { useSelector } from "react-redux";
import ClientSlot from "./ClientSlot";

function Actives({ setMessageUpdate, setIsOpenModal1 }) {
  const { status, userClientsData } = useSelector((state) => state.user);

  const usersClientActive = userClientsData.filter(
    (user) => user.isActif === true
  );

  const [currentOpenIndex, setCurrentOpenIndex] = useState(-1);

  const timeSubmitedCallback = () => {
    setCurrentOpenIndex(-1);
    setMessageUpdate("success, Time Submited");
    setIsOpenModal1(true);
  };

  return (
    <div className="p-6 bg-blue-900 shadow-inner bg-opacity-20 rounded-3xl ">
      {usersClientActive.length === 0 ? (
        <h2 className="font-bold text-center text-gray-600 uppercase">
          No Active clients
        </h2>
      ) : (
        <div className="p-4 m-auto rounded-3xl">
          <h3 className="my-4 font-bold text-center text-pink-800 ">
            List of active Clients
          </h3>
          {usersClientActive.map((userClient, i) => (
            <ClientSlot
              key={userClient._id}
              userClient={userClient}
              isOpen={currentOpenIndex === i}
              setIsOpen={() => setCurrentOpenIndex(i)}
              timeSubmitedCallback={timeSubmitedCallback}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Actives;

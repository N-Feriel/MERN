import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import OneToOneEvent from "../../eventPage/components/OneToOneEvent";

function ClientSlot({
  userClient,
  isOpen,
  setIsOpen,
  timeSubmitedCallback,
  isArchived,
}) {
  const history = useHistory();

  const { pathname } = useLocation();

  const handleClientDetails = (userId) => {
    const location = {
      pathname: `/clientDetails/${userId}`,
      state: {
        redirectTo: pathname,
      },
    };

    history.push(location);
  };

  const handleAddTime = () => {
    setIsOpen();
  };
  return (
    <div key={userClient._id}>
      <div className="grid grid-flow-col grid-cols-5 my-4 bg-white rounded-xl bg-opacity-30">
        <div className="flex flex-wrap justify-center col-span-3 p-2 m-auto space-x-4 ">
          <p className="text-sm font-bold lg:text-lg">
            {userClient.last_name} {userClient.first_name}
          </p>

          <p className="text-sm text-gray-600">{userClient.phone}</p>
        </div>

        <div className="flex justify-between col-span-2 p-4">
          <button
            className="p-1 text-xs text-white bg-blue-300 rounded-lg cursor-pointer w-min hover:bg-blue-600 lg:px-2 "
            onClick={() => handleClientDetails(userClient._id)}
          >
            Details
          </button>

          {!isArchived && (
            <button
              className="p-1 text-xs text-white bg-pink-300 rounded-lg cursor-pointer hover:bg-pink-600"
              onClick={() => handleAddTime()}
            >
              Add time
            </button>
          )}
        </div>
      </div>
      <div className="m-auto">
        {isOpen && (
          <OneToOneEvent
            userClient={userClient}
            timeSubmitedCallback={timeSubmitedCallback}
          />
        )}
      </div>
    </div>
  );
}

export default ClientSlot;

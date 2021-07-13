import React from "react";
import { useSelector } from "react-redux";
import ClientSlot from "./ClientSlot";

function ClientsList() {
  const { userClientsData } = useSelector((state) => state.user);

  return (
    <div className="p-6 bg-gray-900 shadow-inner bg-opacity-20 rounded-3xl ">
      {userClientsData.length === 0 ? (
        <h2 className="font-bold text-center text-white uppercase">
          No clients in your list
        </h2>
      ) : (
        <div className="p-4 m-auto rounded-3xl">
          <h3 className="my-4 font-bold text-center text-pink-800 ">
            List of all Clients
          </h3>
          {userClientsData.map((userClient, i) => (
            <ClientSlot
              key={userClient._id}
              userClient={userClient}
              isArchived={userClient.isActif}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientsList;

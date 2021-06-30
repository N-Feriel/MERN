import React from "react";
import { useSelector } from "react-redux";
import ClientSlot from "./ClientSlot";

function Archives() {
  const { userClientsData } = useSelector((state) => state.user);

  const usersClientArchive = userClientsData.filter(
    (user) => user.isActif === false
  );

  return (
    <div className="p-6 bg-gray-900 shadow-inner bg-opacity-20 rounded-3xl ">
      {usersClientArchive.length === 0 ? (
        <h2 className="font-bold text-center text-white uppercase">
          No Archive clients
        </h2>
      ) : (
        <div className="p-4 m-auto rounded-3xl">
          <h3 className="my-4 font-bold text-center text-pink-800 ">
            List of archive Clients
          </h3>
          {usersClientArchive.map((userClient, i) => (
            <ClientSlot
              key={userClient._id}
              userClient={userClient}
              isArchived
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Archives;

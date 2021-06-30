import React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

function NotificationDetails({ notification, deleteNotifcation }) {
  const jwt = localStorage.getItem("token");

  const handleInvitaion = async (key) => {
    const values = key
      ? {
          email: notification.clientId,
          assignTo: {
            assignGM: notification.userId,
          },
        }
      : {
          email: notification.clientId || "",
          assignTo: {
            assignGM: "",
          },
        };

    try {
      const response = await fetch(`/api/users/clients/user`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();
      if (responseBody.status === 201) {
        const responseN = await fetch(`/api/notification/${notification._id}`, {
          method: "DELETE",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": `${jwt}`,
          },
        });

        const responseBodyNotify = await responseN.json();

        if (responseBodyNotify.status === 200) {
          deleteNotifcation(notification._id);
        } else {
          throw responseBodyNotify.message;
        }
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between p-2 bg-pink-200 rounded-xl">
      <p>{notification.name}</p>
      <p>{notification.clientId}</p>
      <CheckIcon
        className="h-6 text-green-500 cursor-pointer"
        onClick={() => handleInvitaion(true)}
      />
      <XIcon
        className="h-6 text-red-500 cursor-pointer"
        onClick={() => handleInvitaion(false)}
      />
    </div>
  );
}

export default NotificationDetails;

import React from "react";
import NotificationDetails from "./NotificationDetails";

function Notification({ userNotifications, setUserNotifications }) {


  const deleteNotifcation = (id) => {
    const notifications = userNotifications.filter(
      (notification) => notification._id !== id
    );
    setUserNotifications(notifications);

  };
  return userNotifications.length > 0 ? (
    <div className="p-6 space-y-4 bg-pink-700 shadow-inner rounded-3xl">
      {userNotifications.map((notification) => (
        <NotificationDetails
          key={notification._id}
          notification={notification}
          deleteNotifcation={deleteNotifcation}
        />
      ))}
    </div>
  ) : (
    <h2>No new Notification</h2>
  );
}

export default Notification;

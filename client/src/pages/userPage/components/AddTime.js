import React from "react";
import EventPage from "../../eventPage/EventPage";

function AddTime({ setUserList }) {
  const types = [
    { _id: "Vulonteer", name: "Vulonteer", text: "VOLUNTEER" },
    { _id: "Training", name: "Training", text: "TRAINING" },
    { _id: "Facebook", name: "Facebook", text: "FACEBOOK" },
    { _id: "OneToOne", name: "OneToOne", text: "CLIENT" },
    { _id: "Others", name: "Others", text: "OTHERS" },
  ];

  return (
    <div>
      <EventPage types={types} setUserList={setUserList} />
    </div>
  );
}

export default AddTime;

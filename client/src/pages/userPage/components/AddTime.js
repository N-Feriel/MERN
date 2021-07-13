import React from "react";
import Event from "../../eventPage/components/Event";

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
      <Event types={types} setUserList={setUserList} />
    </div>
  );
}

export default AddTime;

import React from "react";
import Event from "./Event";
import OneToOneEvent from "./OneToOneEvent";

function RegisterEventPage({ isOneToOneEvent }) {
  return <div>{isOneToOneEvent ? <OneToOneEvent /> : <Event />}</div>;
}

export default RegisterEventPage;

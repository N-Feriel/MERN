import React from "react";
import EventPage from "../EventPage";
import OneToOneEvent from "./OneToOneEvent";

function RegisterEventPage({ isOneToOneEvent }) {
  return <div>{isOneToOneEvent ? <OneToOneEvent /> : <EventPage />}</div>;
}

export default RegisterEventPage;

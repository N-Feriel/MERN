import React from "react";
import { useHistory } from "react-router";

function EventDetails({ event }) {
  var moment = require("moment");

  const history = useHistory();

  const handleEventDetails = (_id) => {
    history.push(`/event/${_id}`);
  };

  return (
    <div className="details" key={event._id}>
      <div>
        <div>{event.name}</div>

        <div>{event.type}</div>
      </div>
      <div>{moment(event.eventDate).format("MMM Do YY, h:mm a")}</div>

      <div>
        <button onClick={() => handleEventDetails(event._id)}>Details</button>
      </div>
    </div>
  );
}

export default EventDetails;

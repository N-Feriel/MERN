import React from "react";
import { useHistory } from "react-router";

function EventDetails({ event }) {
  var moment = require("moment");

  const history = useHistory();

  const handleEventDetails = (_id) => {
    history.push(`/eventDetails/${_id}`);
  };

  return (
    <div className="grid grid-flow-row grid-cols-6 gap-5 px-6 py-4 mx-auto mt-10 bg-yellow-400 rounded-xl">
      <div className="col-span-3">{event.name}</div>
      <div className="col-span-2 text-xs align-center lg:text-sm">
        {moment(event.eventDate).format("MMM Do YY, h:mm a")}
      </div>

      <div className="col-span-1">
        <button
          className="w-auto px-4 py-2 text-xs text-yellow-200 bg-purple-500 rounded-lg shadow-xl hover:bg-purple-700 lg:text-sm"
          onClick={() => handleEventDetails(event._id)}
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default EventDetails;

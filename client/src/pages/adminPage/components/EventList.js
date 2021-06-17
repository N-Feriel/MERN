import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ReactPaginate from "react-paginate";

import {
  requestEventData,
  receiveEventData,
  receiveEventError,
} from "../../../store/reducers/Event/actions";

function EventList() {
  const { status, events } = useSelector((state) => state.event);

  const { stats } = useSelector((state) => state.stat);

  var moment = require("moment");

  const dispatch = useDispatch();

  const jwt = localStorage.getItem("token");

  const [currentType, setCurrentType] = useState("OneToOne");

  const [pageNumber, setPageNumber] = useState(0);

  const eventsPerPage = 5;
  const pagesVisited = pageNumber * eventsPerPage;

  const history = useHistory();

  const handleEventDetails = (_id) => {
    history.push(`/event/${_id}`);
  };

  const getFilteredEvent = async (type) => {
    dispatch(requestEventData());
    try {
      const url = `/api/event/events/${type}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        dispatch(receiveEventData(responseBody.data[0].events));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveEventError(error));
    }
  };
  if (status === "error") return <div>Error...</div>;
  else if (status === "loading") return <div>...Loading</div>;
  else if (status === "idle") {
    const displayEvents = events
      .slice(pagesVisited, pagesVisited + eventsPerPage)
      .map((event, i) => {
        return (
          <div className="" key={i}>
            <div>
              <div>{event.name}</div>

              <div>{event.type}</div>
            </div>
            <div>{moment(event.eventDate).format("MMM Do YY, h:mm a")}</div>

            <div>
              <button onClick={() => handleEventDetails(event._id)}>
                Details
              </button>
            </div>
          </div>
        );
      });
    const pageCount = Math.ceil(events.length / eventsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    return (
      <div>
        <div className="flex justify-center mb-5 space-x-10 align-middle">
          {stats.map((category) => (
            <div
              className={`py-2 px-4 rounded-lg
              ${
                currentType === category._id
                  ? "bg-blue-500 text-pink-200"
                  : "bg-pink-200 text-blue-900 "
              }
              `}
              key={category._id}
              onClick={() => setCurrentType(category._id)}
            >
              {category._id}
            </div>
          ))}
        </div>

        <div>
          {displayEvents}

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          )}
        </div>
      </div>
    );
  }
}

export default EventList;

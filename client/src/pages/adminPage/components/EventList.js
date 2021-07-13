import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ReactPaginate from "react-paginate";

import {
  requestEventData,
  receiveEventData,
  receiveEventError,
} from "../../../store/reducers/Event/actions";
import EventDetails from "./EventDetails";

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

  useEffect(() => {
    getFilteredEvent(currentType);
  }, [currentType]);

  if (status === "error") return <div>Error...</div>;
  else if (status === "loading") return <div>...Loading</div>;
  else if (status === "idle") {
    const displayEvents = events
      .slice(pagesVisited, pagesVisited + eventsPerPage)
      .map((event, i) => {
        return <EventDetails key={i} event={event} />;
      });
    const pageCount = Math.ceil(events.length / eventsPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    return (
      <div className="w-full">
        <div className="flex justify-center mb-5 space-x-5 align-middle lg:space-x-10">
          {stats.map((category) => (
            <div
              className={`py-2 px-4 rounded-lg
              ${
                currentType === category._id
                  ? "bg-yellow-500 text-purple-600"
                  : "bg-yellow-200 text-purple-900 "
              }
              `}
              key={category._id}
              onClick={() => setCurrentType(category._id)}
            >
              {category._id}
            </div>
          ))}
        </div>

        <div className="space-y-4">
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

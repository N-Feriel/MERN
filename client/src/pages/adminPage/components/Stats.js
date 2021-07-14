import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";

import {
  requestStatData,
  receiveStatData,
  receiveStatDataError,
  receiveVolenteerData,
  receiveClientData,
  receiveOneToData,
} from "../../../store/reducers/Stat/actions";
import ChartRep from "./ChartRep";

function Stats({ setValueList }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const { status, stats, statClients, statVolenteers, statOneToOne } =
    useSelector((state) => state.stat);

  const handleDetails = () => {
    setIsOpen(!isOpen);
  };

  const getStats = async () => {
    dispatch(requestStatData());

    try {
      const url = `/api/event/stat/totalTime/`;

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
        dispatch(receiveStatData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
      console.log(error);
    }
  };

  const getVolenteerStats = async () => {
    dispatch(requestStatData());

    try {
      const url = "/api/users/stat/volenteer";

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
        dispatch(receiveVolenteerData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
    }
  };

  const getClientStats = async () => {
    dispatch(requestStatData());

    try {
      const url = "/api/users/stat/client";

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
        dispatch(receiveClientData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
    }
  };

  const getOneToOneStats = async () => {
    dispatch(requestStatData());

    try {
      const url = "/api/event/oneToOne/totalTime";

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
        dispatch(receiveOneToData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveStatDataError());
    }
  };

  useEffect(() => {
    getStats();
    getVolenteerStats();
    getClientStats();
    getOneToOneStats();
  }, []);

  if (status === "loading") return <Loading />;
  else if (status === "error") return <Error />;
  else if (status === "idle")
    return (
      <div className="grid mx-auto bg-blue-100 lg:grid-flow-row lg:grid-cols-2 ">
        <div className="p-4 space-y-2 text-center bg-blue-200 lg:col-start-1 lg:row-span-1">
          {statVolenteers ? (
            <>
              <h2>Volenteers</h2>
              {statVolenteers.map((volenteer, i) => (
                <div className="px-4 py-2 bg-indigo-300 rounded-md" key={i}>
                  <p>
                    {volenteer._id === true ? "Actives" : "Archives"}:
                    <strong> {volenteer.count}</strong>
                  </p>
                </div>
              ))}
            </>
          ) : (
            <h2>No Volenteers in the list</h2>
          )}
        </div>

        <div className="p-4 space-y-2 text-center bg-blue-200 lg:col-start-2 lg:row-span-1">
          {statClients ? (
            <>
              <h2>Clients</h2>
              {statClients.map((client, i) => (
                <div className="px-4 py-2 bg-indigo-300 rounded-md" key={i}>
                  <p>
                    {client._id === true ? "Actives" : "Archives"}:
                    <strong> {client.count}</strong>
                  </p>
                </div>
              ))}
            </>
          ) : (
            <h2>No Clients in the list</h2>
          )}
        </div>

        {stats ? (
          <div className="relative p-4 space-y-2 text-center bg-blue-200 lg:col-span-3 lg:row-span-1">
            <h2 className="mb-4 text-xl font-bold">Total Time (mn)</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {stats.map((stat) => (
                <div
                  className="px-4 py-2 bg-indigo-300 rounded-md"
                  key={stat._id}
                >
                  {stat._id === "OneToOne" ? (
                    <>
                      <div
                        onClick={handleDetails}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {stat._id} : <strong> {stat.total}</strong>
                      </div>
                      {isOpen && (
                        <div className="detailsOneToOne">
                          {statOneToOne && (
                            <>
                              {statOneToOne.map((statOne) => {
                                return (
                                  <div
                                    key={statOne._id}
                                    style={{ margin: "10px 2px" }}
                                  >
                                    {statOne._id}:{" "}
                                    <strong>{statOne.total}</strong>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      {stat._id} : <strong> {stat.total}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h2>No stats events in database</h2>
        )}
        <ChartRep />
      </div>
    );
}

export default Stats;

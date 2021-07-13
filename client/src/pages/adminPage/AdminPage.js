import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Register from "./components/Register";
import SideBar from "./components/SideBar";
import Stats from "./components/Stats";
import VolenteerList from "./components/VolenteerList";
import ClientList from "./components/ClientList";
import {
  requestVolenteerData,
  receiveVolenteerData,
  receiveVolenteerDataError,
} from "../../store/reducers/Volenteer/actions";

import {
  requestClientData,
  receiveClientData,
  receiveClientDataError,
} from "../../store/reducers/Client/actions";

import {
  requestEventData,
  receiveEventData,
  receiveEventError,
} from "../../store/reducers/Event/actions";
import EventList from "./components/EventList";

function AdminPage() {
  const [valueList, setValueList] = useState("default");
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("token");

  const getVolenteerData = async () => {
    dispatch(requestVolenteerData());
    try {
      const response = await fetch("/api/users/volenteers", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveVolenteerData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveVolenteerDataError(error));
    }
  };

  const getClientData = async () => {
    dispatch(requestClientData());
    try {
      const response = await fetch("/api/users/clients", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveClientData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveClientDataError(error));
    }
  };

  const getEventData = async () => {
    dispatch(requestEventData());
    try {
      const response = await fetch("/api/event", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });
      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveEventData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveEventError(error));
    }
  };

  const project = () => {
    switch (valueList) {
      case "default":
        return <Stats setValueList={setValueList} />;
      case "register":
        return <Register />;
      case "volenteer":
        return <VolenteerList />;
      case "client":
        return <ClientList />;
      case "event":
        return <EventList />;

      default:
        return <h1>No component match</h1>;
    }
  };

  useEffect(() => {
    getVolenteerData();
    getClientData();
    getEventData();
  }, []);

  return (
    <div className="grid mx-auto lg:grid-cols-5 opacity-80 lg:w-11/12 ">
      <SideBar setValueList={setValueList} valueList={valueList} />
      <div className="mx-10 my-10 text-white bg-indigo-400 lg:ml-10 lg:mx-auto lg:w-full lg:min-h-screen p-9 rounded-3xl lg:col-span-4 bg-opacity-60">
        {project()}
      </div>
    </div>
  );
}

export default AdminPage;

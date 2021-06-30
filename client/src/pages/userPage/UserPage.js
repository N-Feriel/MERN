import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { UserContext } from "../../components/UserContext";
import { logout } from "../../services/authService";
import {
  requestUserData,
  receiveUserData,
  receiveUserDataError,
} from "../../store/reducers/user/actions";

import Clients from "./components/Clients";

import {
  CogIcon,
  BellIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import userImg from "../../assets/user_icon.svg";
import Archives from "./components/Archives";
import Actives from "./components/Actives";
import AddTime from "./components/AddTime";
import Settings from "./components/Settings";
import ModalComp from "../../components/ModelCom";
import Banner from "../../components/Banner";
import Notification from "./components/Notification";

function UserPage() {
  const url = `/api/users/clientList`;

  const dispatch = useDispatch();

  const { user } = useContext(UserContext);

  const history = useHistory();
  const [errors, setErrors] = useState("");

  const { status, userClientsData } = useSelector((state) => state.user);

  const [userList, setUserList] = useState("client");

  const [isDetails, setIsDetails] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [totalNew, setTotalNew] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [modalIsOpen, setIsOpenModal] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState(null);

  const [modalIsOpen1, setIsOpenModal1] = useState(false);

  const jwt = localStorage.getItem("token");

  const getCLientsAssigned = async () => {
    try {
      dispatch(requestUserData());

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveUserData(responseBody.data));
      } else {
        throw responseBody.mesage;
      }
    } catch (error) {
      dispatch(receiveUserDataError(error));
    }
  };

  const getTotalNewNotifications = (array) => {
    array.map((obj) => {
      if (!obj._id && obj.notifications.length) {
        setUserNotifications(obj.notifications);
        setTotalNew(obj.notifications.length);
      }
    });
  };

  const getNotifications = async () => {
    try {
      const response = await fetch(
        `/api/notification/totalNotifications/user`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Charset": "utf-8",
            "x-auth-token": `${jwt}`,
          },
        }
      );

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        getTotalNewNotifications(responseBody.data);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const displayNotifications = async () => {
    if (userNotifications.length > 0) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  };

  const getUsertime = async () => {
    try {
      const url = `/api/event/totalTime/${user._id}`;

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
        setUserEvents(responseBody.data);
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const handleUserInfo = () => {
    setIsDetails(!isDetails);
    setIsOpen(false);
    getUsertime();
  };

  const project = () => {
    switch (userList) {
      case "setting":
        return (
          <Settings
            setErrors={setErrors}
            setMessageUpdate={setMessageUpdate}
            setIsOpenModal1={setIsOpenModal1}
            errors={errors}
          />
        );
      case "time":
        return <AddTime setUserList={setUserList} />;
      case "notification":
        return (
          <Notification
            userNotifications={userNotifications}
            setUserNotifications={setUserNotifications}
          />
        );
      case "client":
        return <Clients setUserList={setUserList} />;
      case "archives":
        return <Archives />;
      case "actives":
        return (
          <Actives
            setMessageUpdate={setMessageUpdate}
            setIsOpenModal1={setIsOpenModal1}
          />
        );

      default:
        return <h1>No component match</h1>;
    }
  };

  useEffect(() => {
    getCLientsAssigned();
    getNotifications();
    displayNotifications();
  }, []);

  console.log(userNotifications, "notif");

  if (status === "error") return <div>Error...</div>;
  else if (status === "loading") return <div>...Loading</div>;
  else if (status === "idle") {
    return (
      <main className="p-6">
        <ModalComp modalIsOpen={modalIsOpen1}>
          <>
            <h4 className="mb-4 text-center lg:text-xl">{messageUpdate}</h4>
            <button
              className="px-4 py-2 ml-auto mr-4 text-sm uppercase bg-red-300 rounded-lg w-min"
              onClick={() => setIsOpenModal1(false)}
            >
              close
            </button>
          </>
        </ModalComp>
        <div className="flex justify-between align-center">
          <div className="self-end">
            <p className="text-gray-400">Hello,</p>
            {user && (
              <h2 className="text-lg font-bold">
                {user.first_name} {user.last_name}
              </h2>
            )}
          </div>
          <div className="pt-4 bg-red-100 rounded-lg ">
            <img alt="profile" src={userImg} className="h-16 lg:h-24" />
          </div>
        </div>

        <div className="p-4">
          <input type="text" />
        </div>

        <Banner />

        <div className="grid justify-around grid-flow-col gap-6 mx-auto my-10">
          <div
            onClick={() => setUserList("client")}
            className="flex flex-col justify-center lg:flex-row"
          >
            <div
              className={`flex justify-center w-24 h-24  border-2 shadow-inner cursor-pointer rounded-3xl hover:bg-yellow-300 ${
                userList === "client"
                  ? "bg-yellow-500 bg-opacity-40 "
                  : "bg-white bg-opacity-30 "
              }`}
            >
              <UsersIcon className="self-center h-8 text-blue-600 hover:text-white" />
            </div>
            <h2 className="self-center m-2 text-xs font-bold text-purple-900 uppercase lg:text-sm">
              clients
            </h2>
          </div>
          <div
            className="relative flex flex-col justify-center lg:flex-row"
            onClick={() => setUserList("notification")}
          >
            <div
              className={`flex justify-center w-24 h-24  border-2 shadow-inner cursor-pointer rounded-3xl hover:bg-pink-300 ${
                userList === "notification"
                  ? "bg-pink-500 bg-opacity-40 "
                  : "bg-white bg-opacity-30 "
              }`}
            >
              <BellIcon className="self-center h-8 text-pink-700 hover:text-white" />
            </div>
            <h2 className="self-center m-2 text-xs font-bold text-purple-900 uppercase lg:text-sm">
              Notification
            </h2>
            {totalNew > 0 && (
              <p className="absolute right-0 px-2 py-1 text-white bg-red-600 border-2 border-pink-200 shadow-inner rounded-xl">
                {totalNew}
              </p>
            )}
          </div>
          <div
            className="flex flex-col justify-center lg:flex-row"
            onClick={() => setUserList("time")}
          >
            <div
              className={`flex justify-center w-24 h-24  border-2 shadow-inner cursor-pointer rounded-3xl hover:bg-green-300 ${
                userList === "time"
                  ? "bg-green-500 bg-opacity-40 "
                  : "bg-white bg-opacity-30 "
              }`}
            >
              <ClockIcon className="self-center h-8 text-green-600 hover:text-white" />
            </div>
            <h2 className="self-center m-2 text-xs font-bold text-purple-900 uppercase lg:text-sm">
              Time
            </h2>
          </div>
          <div
            className="flex flex-col justify-center lg:flex-row"
            onClick={() => setUserList("setting")}
          >
            <div
              className={`flex justify-center w-24 h-24  border-2 shadow-inner cursor-pointer rounded-3xl hover:bg-gray-300 ${
                userList === "setting"
                  ? "bg-gray-500 bg-opacity-40 "
                  : "bg-white bg-opacity-30 "
              }`}
            >
              <CogIcon className="self-center h-8 text-gray-600 hover:text-white" />
            </div>
            <h2 className="self-center m-2 text-xs font-bold text-purple-900 uppercase lg:text-sm">
              Settings
            </h2>
          </div>
        </div>

        <div className="">{project()}</div>
      </main>
    );
  }
}

export default UserPage;

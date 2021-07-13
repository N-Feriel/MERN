import React from "react";
import { useHistory, useLocation } from "react-router";

function Register() {
  let history = useHistory();
  const { pathname } = useLocation();

  const handleNew = (type) => {
    const location = {
      pathname: `/register/${type}`,
      state: {
        redirectTo: pathname,
      },
    };
    history.push(location);
  };

  return (
    <div className="items-center p-10 m-auto space-y-10 bg-purple-100 rounded-xl lg:my-20">
      <h2 className="text-xl text-center text-purple-900 bold">
        Add / Register
      </h2>
      <ul className="space-y-4 uppercase lg:space-y-16">
        <li
          onClick={() => handleNew("volenteer")}
          className="py-4 text-center bg-purple-400 rounded-xl hover:bg-pink-400 hover:text-purple-900"
        >
          New Volenteer
        </li>
        <li
          onClick={() => handleNew("client")}
          className="py-4 text-center bg-purple-400 rounded-xl hover:bg-pink-400 hover:text-purple-900"
        >
          New Client
        </li>
        <li
          onClick={() => handleNew("event")}
          className="py-4 text-center bg-purple-400 rounded-xl hover:bg-pink-400 hover:text-purple-900"
        >
          New Event
        </li>
      </ul>
    </div>
  );
}

export default Register;

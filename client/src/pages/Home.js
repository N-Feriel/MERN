import React, { useContext } from "react";
import { useHistory } from "react-router";
import Footer from "../components/footer/Footer";

import { UserContext } from "../components/UserContext";

import plants from "../assets/plants.png";

function Home() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  console.log(user, "userConext");
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-gradient-to-t from-gray-100 to-transparent">
        <img loading="lazy" src={plants} alt="" />
      </div>
      <div className="absolute z-10 p-5 m-auto bg-red-100">
        <h1 className="text-2xl leading-tight text-blue-700">
          Welcome To Time Manager App
        </h1>
        <h2>Please Select user type to login </h2>
        <div className="flex items-center justify-center mt-5 space-x-3 ">
          <button
            onClick={() => history.push("/admin")}
            className="px-3 py-1 text-white bg-blue-500 rounded-md "
          >
            Admin
          </button>
          <button
            onClick={() => history.push("/user")}
            className="px-3 py-1 text-white bg-green-600 rounded-md "
          >
            User
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;

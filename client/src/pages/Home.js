import React from "react";
import { useHistory } from "react-router";
import Footer from "../components/footer/Footer";

import plants from "../assets/plants.png";

function Home() {
  const history = useHistory();

  return (
    <div className="relative grid w-full h-full md:grid-flow-col">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-gradient-to-t from-gray-100 to-transparent">
        <img loading="lazy" src={plants} alt="" />
      </div>
      <div className="z-10 flex flex-col justify-around w-1/2 p-5 mx-auto my-16 bg-red-100 h-96 align-center rounded-3xl">
        <h1 className="text-2xl leading-tight text-center text-blue-700">
          Welcome To Time Manager App
        </h1>
        <h2 className="text-center">Please Select user type to login </h2>
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

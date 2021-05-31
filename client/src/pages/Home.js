import React from "react";
import { useHistory } from "react-router";
import Footer from "../components/footer/Footer";

function Home() {
  const history = useHistory();
  return (
    <div className="m-auto bg-yellow-100 opacity-60">
      <div className="pt-1 ml-6">
        <h1 className="text-2xl leading-tight text-blue-700">
          Welcome To Time Manager App
        </h1>
        <h2>Please Select user type to login </h2>
        <div className="flex flex-col space-x-3 ">
          <button
            onClick={() => history.push("/admin")}
            className="flex items-center justify-center text-white bg-blue-500 rounded-md "
          >
            Admin
          </button>
          <button className="flex items-center justify-center rounded-md">
            User
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;

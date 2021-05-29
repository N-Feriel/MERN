import React from "react";
import RegisterFormClient from "./components/RegisterFormClient";
import RegisterFormVolenteer from "./components/RegisterFormVolenteer";

function RegisterPage(props) {
  return (
    <div>
      {props.isClient ? <RegisterFormClient /> : <RegisterFormVolenteer />}
    </div>
  );
}

export default RegisterPage;

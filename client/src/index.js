import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./components/UserContext";
import { AssignProvider } from "./components/AssignContext";
import { Provider } from "react-redux";
import configureStore from "./store/index";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <AssignProvider>
          <App />
        </AssignProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

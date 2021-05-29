import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";
import AdminPage from "./pages/adminPage/AdminPage";
import UserPage from "./pages/userPage/UserPage";
import Footer from "./components/footer/Footer";
import RegisterPage from "./pages/registerPage/RegisterPage";
import EventPage from "./pages/eventPage/EventPage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-gradient-to-t from-gray-400 to-indigo-200">
        <NavBar />

        <main className="mx-auto max-w-screen-2xl">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/user">
              <UserPage />
            </Route>

            {/* <Route path="/register">
              <RegisterPage isClient />
            </Route> */}

            <Route path="/register/event">
              <EventPage />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

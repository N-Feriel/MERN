import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";
import AdminPage from "./pages/adminPage/AdminPage";
import UserPage from "./pages/userPage/UserPage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import EventPage from "./pages/eventPage/EventPage";
import VolenteerPage from "./pages/volenteerPage/VolenteerPage";
import ClientPage from "./pages/clientPage/ClientPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-b from-pink-200 to-purple-200 ">
        <NavBar />

        <main className="mx-auto max-w-screen-2xl">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route path="/admin">
              <AdminPage />
            </Route> */}

            <ProtectedRoute
              exact
              path="/admin"
              authed={true}
              component={AdminPage}
            />

            <ProtectedRoute
              exact
              path="/register/volenteer"
              authed={true}
              component={RegisterPage}
            />

            <ProtectedRoute
              exact
              path="/register/client"
              authed={true}
              isClient={true}
              component={RegisterPage}
            />

            <ProtectedRoute
              exact
              path="/volenteerDetails/:_id"
              authed={true}
              component={VolenteerPage}
            />

            <ProtectedRoute
              exact
              path="/ClientDetails/:_id"
              component={ClientPage}
            />

            <ProtectedRoute
              exact
              path="/register/event"
              component={EventPage}
            />

            <ProtectedRoute exact path="/user" component={UserPage} />

            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

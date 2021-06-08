import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";
import AdminPage from "./pages/adminPage/AdminPage";
import UserPage from "./pages/userPage/UserPage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterFormClient from "./pages/registerPage/components/RegisterFormClient";
import ProtectedRoute from "./ProtectedRoute";

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
            {/* <Route path="/admin">
              <AdminPage />
            </Route> */}
            <ProtectedRoute
              exact
              path="/admin"
              authed={true}
              component={AdminPage}
            />

            <Route path="/user">
              <UserPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/register">
              <RegisterFormClient />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

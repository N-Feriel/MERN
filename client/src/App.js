import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";
import AdminPage from "./pages/adminPage/AdminPage";
import UserPage from "./pages/userPage/UserPage";

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
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

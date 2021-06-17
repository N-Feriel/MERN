import React, { useState, useEffect } from "react";

export const AssignContext = React.createContext(null);

const apiEndPoint = "/api/users/assignList";
const jwt = localStorage.getItem("token");

export const AssignProvider = ({ children }) => {
  const [listVolenteers, setListVolenteers] = useState([]);

  const getList = async () => {
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setListVolenteers([
          { value: "Select Origin Type", key: "", _id: "1" },
          ...responseBody.data[0].users,
        ]);
      } else {
        throw Error;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <AssignContext.Provider value={{ listVolenteers }}>
      {children}
    </AssignContext.Provider>
  );
};

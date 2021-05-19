import React, { useEffect, useState } from "react";

function UserList() {
  const [usersList, setUserList] = useState([]);

  const getUsersList = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Accept-Charset": "utf-8",
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        setUserList(responseBody.data);
        console.log(responseBody);
      } else {
        throw responseBody.message;
      }
    } catch (err) {
      console.log(err, "error");
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div>
      <h1>Users list</h1>
      {usersList && (
        <ul>
          {usersList.map((user) => (
            <li key={user._id}>{user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;

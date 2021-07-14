import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import ListType from "./ListType";

import ClientDetails from "./ClientDetails";
import {
  requestClientData,
  receiveClientData,
  receiveClientDataError,
} from "../../../store/reducers/Client/actions";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";

function ClientList() {
  const { status, clients } = useSelector((state) => state.client);

  const [selectedType, setSelectedType] = useState("toAssign");

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");

  const handleSelectedType = (type) => {
    setSelectedType(type._id);
  };

  const getFilteredUserData = async () => {
    dispatch(requestClientData());

    try {
      const response = await fetch(`/api/users/status/client/${selectedType}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${jwt}`,
        },
      });

      const responseBody = await response.json();

      if (responseBody.status === 200) {
        dispatch(receiveClientData(responseBody.data));
      } else {
        throw responseBody.message;
      }
    } catch (error) {
      dispatch(receiveClientDataError(error));
    }
  };

  useEffect(() => {
    getFilteredUserData();
  }, [selectedType]);

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  if (status === "error") return <Error />;
  else if (status === "loading") return <Loading />;
  else if (status === "idle") {
    const displayClients = clients
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((client) => <ClientDetails key={client._id} client={client} />);

    const pageCount = Math.ceil(clients.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
      <div className="p-4 m-auto space-y-4">
        <ListType
          selectedType={selectedType}
          onTypeSelected={handleSelectedType}
        />

        {displayClients}

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        )}
      </div>
    );
  }
}

export default ClientList;

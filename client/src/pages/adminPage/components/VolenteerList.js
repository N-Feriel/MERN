import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import VolenteerDetails from "./VolenteerDetails";

function VolenteerList() {
  const { status, volenteers } = useSelector((state) => state.volenteer);

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  if (status === "error") return <div>Error...</div>;
  else if (status === "loading") return <div>...Loading</div>;
  else if (status === "idle") {
    const displayVolenteers = volenteers
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((volenteer) => (
        <VolenteerDetails key={volenteer._id} volenteer={volenteer} />
      ));

    const pageCount = Math.ceil(volenteers.length / usersPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    return (
      <div className="p-4 m-auto space-y-4 ">
        {displayVolenteers}
        <div>
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
      </div>
    );
  }
}

export default VolenteerList;

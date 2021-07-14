import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

function Loading() {
  return (
    <div className="flex justify-center w-full h-full mt-48 align-center">
      <CircularProgress />
    </div>
  );
}

export default Loading;

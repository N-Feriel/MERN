import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <div className="err">4</div>
      <QuestionMarkCircleIcon className="h-8" size="150px" />
      <div className="err2">4</div>
      <div className="msg">
        Something goes wrong !!
        <p>
          Let's go
          <Link className="link" to="/">
            home
          </Link>
          and try from there.
        </p>
      </div>
    </div>
  );
}

export default Error;

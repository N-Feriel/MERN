import React from "react";

function TextError(props) {
  return <div className="p-2 text-xs text-red-400">{props.children}</div>;
}

export default TextError;

import React from "react";

function ListType({ selectedType, onTypeSelected }) {
  const allTypes = [
    { _id: "archive", name: "Archives" },
    { _id: "active", name: "Actives" },
    { _id: "toAssign", name: "To Assign" },
  ];

  return (
    <ul className="flex justify-center mb-5 space-x-10 align-middle">
      {allTypes.map((type) => (
        <li
          key={type._id}
          className={`py-2 px-4 rounded-lg
             ${
               type._id === selectedType
                 ? "bg-indigo-900 text-pink-200"
                 : "bg-pink-200 text-purple-900 "
             }
             `}
          onClick={() => onTypeSelected(type)}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
}

export default ListType;

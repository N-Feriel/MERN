import React from "react";
import {
  ChevronRightIcon,
  ViewListIcon,
  CollectionIcon,
} from "@heroicons/react/outline";

function Clients({ setUserList }) {
  return (
    <div className="grid gap-4 my-10 ">
      <div className="flex justify-between p-6">
        <h2 className="font-bold">List of CLients</h2>
        <div className="flex space-x-1 text-pink-500">
          <p>See All</p>
          <div className="flex justify-center align-middle bg-pink-300 rounded-lg">
            <ChevronRightIcon className="h-6 p-1 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-flow-col grid-cols-2 gap-6 p-6">
        <div className="p-6 bg-white border-2 shadow-inner cursor-pointer bg-opacity-30 rounded-3xl ">
          <div className="flex justify-between align-center rounded-3xl">
            <div className="p-4 mb-6 bg-pink-500 bg-opacity-5">
              <div className="p-2 text-white bg-pink-700 opacity-60">
                <ViewListIcon className="h-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h2 className="font-bold text-pink-500 uppercase"> 20</h2>
              <p className="text-sm text-gray-600">Actives</p>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 font-medium text-white bg-pink-500 rounded-lg shadow-xl hover:bg-pink-700"
            onClick={() => setUserList("actives")}
          >
            Open
          </button>
        </div>

        <div className="p-6 bg-white border-2 shadow-inner cursor-pointer bg-opacity-30 rounded-3xl">
          <div className="flex justify-between align-center rounded-3xl">
            <div className="p-4 mb-6 bg-blue-500 bg-opacity-5">
              <div className="p-2 text-white bg-blue-600 opacity-60">
                <CollectionIcon className="h-6" />
              </div>
            </div>
            <div className="p-4 text-center">
              <h2 className="font-bold text-blue-500 uppercase"> 20</h2>
              <p className="text-sm text-gray-600">Archives</p>
            </div>
          </div>
          <button
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg shadow-xl hover:bg-blue-900"
            onClick={() => setUserList("archives")}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clients;

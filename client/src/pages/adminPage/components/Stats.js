import React from "react";

function Stats() {
  return (
    <div className="grid gap-4 p-4 mx-auto space-y-5 bg-blue-100 xl:w-4/5 lg:grid-flow-col lg:grid-cols-3 ">
      <div className="p-4 space-y-2 text-center bg-blue-200">
        <h2>Volenteers</h2>
        <div className="px-4 py-2 bg-indigo-300 rounded-md">
          <p>Archives: 123</p>
        </div>
        <div className="px-4 py-2 bg-indigo-300 rounded-md">
          <p>Actives: 123</p>
        </div>
      </div>

      <div className="p-4 space-y-2 text-center bg-blue-200">
        <h2>Clients</h2>
        <div className="px-4 py-2 bg-indigo-300 rounded-md">
          <p>Archives: 123</p>
        </div>
        <div className="px-4 py-2 bg-indigo-300 rounded-md">
          <p>Actives: 123</p>
        </div>
      </div>

      <div className="relative p-4 space-y-2 text-center bg-blue-200 lg:col-span-2 lg:row-span-2">
        <h2 className="mb-4 text-xl font-bold">Total Time (mn)</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="px-4 py-2 bg-indigo-300 rounded-md">
            <p>Trainning: 123</p>
          </div>
          <div className="px-4 py-2 bg-indigo-300 rounded-md">
            <p>Volenteer: 123</p>
          </div>
          <div className="px-4 py-2 bg-indigo-300 rounded-md">
            <p>One To One: 123</p>
          </div>
          <div className="px-4 py-2 bg-indigo-300 rounded-md">
            <p>Meeting: 123</p>
          </div>

          <div className="px-4 py-2 mb-8 bg-indigo-300 rounded-md">
            <p>FaceBook: 123</p>
          </div>
        </div>

        <div className="absolute flex justify-between bottom-2 left-4 right-4">
          <div className="text-blue-900">Chart</div>
          <div className="text-indigo-500">More...</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

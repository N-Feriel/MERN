import {
  IdentificationIcon,
  LinkIcon,
  MailIcon,
} from "@heroicons/react/outline";
import React from "react";

function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-10 pt-4 font-serif text-sm text-gray-300 bg-blue-900 md:flex-row justify-self-end">
      <h2 className="font-mono font-bold text-white">Contact</h2>

      <div className="grid grid-flow-row-dense mx-auto md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        <div className="flex items-center p-2 space-x-2">
          <IdentificationIcon className="h-5" />
          <p>78 rue St-Louis, LeMoyne, QC, J4R 2L4</p>
        </div>

        <div className="flex items-center p-2 space-x-2">
          <MailIcon className="h-5" />
          <p>lamereaboire@gmail.com</p>
        </div>

        <div className="flex items-center p-2 space-x-2">
          <LinkIcon className="h-5" />
          <p>http://facebook.com/lamereaboire</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

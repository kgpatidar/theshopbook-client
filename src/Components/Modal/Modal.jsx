import { XIcon } from "@heroicons/react/solid";
import React from "react";
import Popup from "reactjs-popup";

const Modal = ({
  children,
  data = {},
  heading = "",
  trigger = <button>Open Modal</button>,
}) => {
  return (
    <Popup modal trigger={trigger} on="click" closeOnDocumentClick={false}>
      {(close) => (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-600 bg-opacity-30">
          <div className="rounded-lg bg-white shadow-app text-app-text2 animate-motionup">
            <div className="flex items-center justify-between bg-gray-100 px-3 py-2 overflow-hidden rounded-t-lg">
              <h1 className="font-semibold text-lg">{heading}</h1>
              &nbsp;
              <XIcon
                onClick={close}
                className="cursor-pointer w-6 h-6 hover:text-app-primary cusor-primary"
              />
            </div>
            <div className="p-3">{children}</div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default Modal;

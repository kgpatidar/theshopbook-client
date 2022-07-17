import React from "react";
import Popup from "reactjs-popup";

const ConfirmationTooltip = ({
  onYes = () => {},
  onNo = () => {},
  position = "bottom center",
  msg = "Are you confirm on this?",
  children = <div></div>,
}) => {
  return (
    <Popup trigger={children} arrow={true} on="click" position={position} modal>
      {(close) => (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-600 bg-opacity-30">
          <div className="rounded-lg bg-white shadow-app text-app-text2 animate-motionup p-4">
            <h3 className="text-sm">{msg}</h3>
            <div className="flex items-center justify-center pt-1">
              <button
                className="text-sm bg-app-primary text-white px-3 py-0.5 rounded-lg"
                onClick={() => {
                  onYes();
                  close();
                }}
              >
                Yes
              </button>
              &nbsp; &nbsp;
              <button
                className="text-sm bg-app-primary text-white px-3 py-0.5 rounded-lg"
                onClick={() => {
                  onNo();
                  close();
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ConfirmationTooltip;

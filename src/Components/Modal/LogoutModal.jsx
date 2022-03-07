import { LogoutIcon } from "@heroicons/react/outline";
import React from "react";
import className from "../../Constant/className";
import { useAuth } from "../../Hooks/Auth";
import Modal from "./Modal";

const LogoutModal = () => {
  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Modal
      heading="Logout"
      trigger={
        <div className="cursor-pointer flex flex-col items-center justify-center hover:bg-red-100 w-full py-2">
          <LogoutIcon className="text-app-red w-6 h-6 hover:text-red-700" />
          <small className="text-app-red" style={{ fontSize: "9px" }}>
            Logout
          </small>
        </div>
      }
    >
      <div className="flex flex-col items-center">
        <span>Are you sure you want to logout?</span>
        <button onClick={handleLogout} className={className.activeBtn + "mt-3"}>
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default LogoutModal;

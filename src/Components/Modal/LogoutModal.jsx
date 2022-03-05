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
        <LogoutIcon className="cursor-pointer text-app-red w-6 h-6 hover:text-red-700" />
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

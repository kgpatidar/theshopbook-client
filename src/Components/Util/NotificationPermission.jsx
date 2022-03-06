import React from "react";
import { useHistory } from "react-router-dom";
import { Brand } from "../Brand";

const NotificationPermission = () => {
  const history = useHistory();
  const getNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        history.replace("/app");
      }
    });
  };

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center text-white"
      onClick={getNotificationPermission}
    >
      <Brand className="w-16 h-16 text-justify-center" name={false} />
      <br />
      <span className="text-app-black1 text-center px-8">
        We are trying to provide you realtime update with our push notification
        service. So please click to enable.
      </span>
      <br />
      <button className="rounded-lg font-medium text-base md:text-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-90 text-white py-2 px-4 hover:bg0">
        Give Notification Permission
      </button>
    </div>
  );
};

export default NotificationPermission;

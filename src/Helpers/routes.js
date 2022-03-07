import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";

/** @WHOLESALER_PHONE_ROUTES */
export const getWholesalerPhoneRoutes = () => {
  return [
    {
      name: "Home",
      Icon: HomeIcon,
      path: "home",
    },
    {
      name: "Stocks",
      Icon: DatabaseIcon,
      path: "stocks",
    },
    {
      name: "Retailers",
      Icon: UserGroupIcon,
      path: "retailers",
    },
    {
      name: "Alerts",
      Icon: BellIcon,
      path: "notification",
    },
    {
      name: "More",
      Icon: ViewGridAddIcon,
      path: "more",
    },
  ];
};

/** @WHOLESALER_DESKTOP_ROUTES */
export const getWholesalerDesktopRoutes = () => {
  return [
    {
      name: "Home",
      Icon: HomeIcon,
      path: "home",
    },
    {
      name: "Stocks",
      Icon: DatabaseIcon,
      path: "stocks",
    },
    {
      name: "Retailers",
      Icon: UserGroupIcon,
      path: "retailers",
    },
    {
      name: "Alerts",
      Icon: BellIcon,
      path: "notification",
    },
    {
      name: "Profile",
      Icon: UserCircleIcon,
      path: "profile",
    },
  ];
};

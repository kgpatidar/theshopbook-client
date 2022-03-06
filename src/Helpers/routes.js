import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";

export const getWholesalerRoutes = (isPhone) => {
  if (isPhone) {
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
  } else {
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
    ];
  }
};

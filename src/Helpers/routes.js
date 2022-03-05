import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

export const getWholesalerRoutes = (isPhone) => {
  if (isPhone) {
    return [];
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

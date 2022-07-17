import {
  BellIcon,
  DatabaseIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";

/** @WHOLESALER_PHONE_ROUTES */
const getWholesalerPhoneRoutes = () => {
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
      name: "Orders",
      Icon: ShoppingCartIcon,
      path: "orders",
    },
    {
      name: "More",
      Icon: ViewGridAddIcon,
      path: "more",
    },
  ];
};

/** @WHOLESALER_DESKTOP_ROUTES */
const getWholesalerDesktopRoutes = () => {
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
      name: "Orders",
      Icon: ShoppingCartIcon,
      path: "orders",
    },
    {
      name: "Profile",
      Icon: UserCircleIcon,
      path: "profile",
    },
  ];
};

export const getWholesalerRoutes = (isPhone) => {
  return isPhone ? getWholesalerPhoneRoutes() : getWholesalerDesktopRoutes();
};

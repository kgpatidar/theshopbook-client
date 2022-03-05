import React from "react";
import DesktopLayout from "../../Components/Layout/DesktopLayout";
import PhoneLayout from "../../Components/Layout/PhoneLayout";
import { getWholesalerRoutes } from "../../Helpers/routes";

const checkIsPhone = () => window.innerWidth <= 720;

const WholesalerLayout = () => {
  const isPhone = checkIsPhone();
  const routes = getWholesalerRoutes(isPhone);
  return isPhone ? (
    <PhoneLayout />
  ) : (
    <DesktopLayout routes={routes}>
      <div>Content</div>
    </DesktopLayout>
  );
};

export default WholesalerLayout;

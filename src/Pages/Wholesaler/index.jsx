import { map } from "lodash";
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
      <>
        <div className="flex flex-col">
          {map([2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], (i) => (
            <span>Content</span>
          ))}
        </div>
      </>
    </DesktopLayout>
  );
};

export default WholesalerLayout;

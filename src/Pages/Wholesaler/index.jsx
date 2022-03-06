import React from "react";
import DesktopLayout from "../../Components/Layout/DesktopLayout";
import PhoneLayout from "../../Components/Layout/PhoneLayout";
import { getWholesalerRoutes } from "../../Helpers/routes";

const checkIsPhone = () => window.innerWidth <= 800;

const WholesalerLayout = () => {
  const isPhone = checkIsPhone();
  const routes = getWholesalerRoutes(isPhone);
  return isPhone ? (
    <PhoneLayout routes={routes}>
      <>
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>{" "}
        <div>Phone Layout</div> <div>Phone Layout</div> <div>Phone Layout</div>
      </>
    </PhoneLayout>
  ) : (
    <DesktopLayout routes={routes}>
      <>
        <div>Desktop Layout</div>
      </>
    </DesktopLayout>
  );
};

export default WholesalerLayout;

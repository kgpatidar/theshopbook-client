import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../Assets/512.png";

const Brand = ({
  icon = true,
  name = true,
  isVerticle = true,
  className = "w-full h-full",
}) => {
  return (
    <div className={`${className} ${isVerticle ? "" : "flex items-center"}`}>
      <Link to="/" className="bg-blue-500 cursor-pointer">
        <img
          src={BrandLogo}
          alt=""
          className="w-full h-full hover:animate-pulse"
        />
      </Link>
      <div>
        {name && (
          <p
            className={`font-semibold text-lg text-app-primary ${
              isVerticle ? "" : "pl-1 text-2xl"
            }`}
          >
            TheShopbook
          </p>
        )}
      </div>
    </div>
  );
};

export { Brand };

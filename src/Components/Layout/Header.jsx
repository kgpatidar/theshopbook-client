import { SearchIcon, XIcon } from "@heroicons/react/outline";
import React from "react";
import { useState } from "react";
import { checkIsPhone } from "../../Helpers/global";

const SearchBar = ({ text, onChange, placeholderText }) => {
  return (
    <div className="rounded-full border w-full md:w-96 h-8 flex items-center px-2 text-xs">
      <SearchIcon className="h-4 w-4" />
      &nbsp; &nbsp;
      <input
        value={text}
        placeholder={placeholderText}
        className="outline-none w-full"
        onChange={onChange}
      />
    </div>
  );
};

const Header = ({
  title,
  searchText = "",
  placeholderText = "Search here",
  setSearchText = () => {},
  hideSearchBar = false,
  rightChild = <></>,
}) => {
  const isPhone = checkIsPhone();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const onChange = (e) => setSearchText(e.target.value);

  return (
    <div className="fixed left-0 lg:left-16 top-0 right-0 md:right-0 z-40">
      <div className="w-full px-2 bg-white flex justify-between items-center shadow border-b-gray-400">
        {(!isPhone || !showSearchBar) && (
          <h1 className="text-xl font-bold md:font-semibold leading-1 py-2">
            {title}
          </h1>
        )}

        {!hideSearchBar && (!isPhone || showSearchBar) && (
          <SearchBar
            text={searchText}
            onChange={onChange}
            placeholderText={placeholderText}
          />
        )}

        <div className="flex justify-end items-center">
          {isPhone && !hideSearchBar && !showSearchBar && (
            <SearchIcon
              className="h-4 w-4"
              onClick={() => setShowSearchBar(!showSearchBar)}
            />
          )}
          &nbsp; &nbsp;
          {!isPhone || !showSearchBar ? (
            rightChild
          ) : (
            <XIcon
              className="h-4 w-4"
              onClick={() => {
                setSearchText("");
                setShowSearchBar(!showSearchBar);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

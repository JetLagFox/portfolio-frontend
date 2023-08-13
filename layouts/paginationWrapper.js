import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import GridIcon from "../svg/Grid";
import ListIcon from "../svg/List";
import SearchIcon from "../svg/Search";
import AddIcon from "../svg/Add";
import searchMatches from "../utils/searchMatches";

const PaginationWrapper = ({ children, data, setData, postType }) => {
  const [activeButton, setActiveButton] = useState("grid");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState(null);
  const originalData = useRef(data);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!originalData.current) {
      originalData.current = data;
    }
  }, [data]);

  useEffect(() => {
    search?.length === 0
      ? setData(originalData.current)
      : setData(
          originalData.current?.filter((item) => {
            return searchMatches(postType, item, search);
          })
        );
  }, [search]);

  return (
    <>
      <div className="pagination-actions">
        <div
          className={`pagination-actions__group ${
            showSearchBar && "search--open"
          }`}
        >
          {showSearchBar && (
            <form>
              <input
                onChange={handleSearch}
                name="search"
                type="text"
                defaultValue={search}
              />
            </form>
          )}
          <span
            className="pagination-actions__icon"
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <SearchIcon />
          </span>
        </div>
        <div className="pagination-actions__group">
          <Link href="/">
            <a className={`pagination-actions__icon`}>
              <AddIcon />
            </a>
          </Link>
        </div>
        <div className="pagination-actions__group">
          <span
            className={`pagination-actions__icon ${
              activeButton === "grid" && "icon--active"
            }`}
            onClick={() => setActiveButton("grid")}
          >
            <GridIcon />
          </span>
          <span
            className={`pagination-actions__icon ${
              activeButton === "linear" && "icon--active"
            }`}
            onClick={() => setActiveButton("linear")}
          >
            <ListIcon />
          </span>
        </div>
      </div>
      <div className={`pagination-wrapper pagination--${activeButton}`}>
        {children}
      </div>
    </>
  );
};

export default PaginationWrapper;

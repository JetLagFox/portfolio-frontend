import { useState } from "react";
import Link from "next/link";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import GridIcon from "../svg/Grid";
import ListIcon from "../svg/List";
import SearchIcon from "../svg/Search";
import AddIcon from "../svg/Add";

const PaginationWrapper = ({ children, search, setSearch, setPage, hashNextPage, hashPrevPage, adminLink }) => {
  const [activeButton, setActiveButton] = useState("grid");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="pagination-actions">
        <div className="pagination-actions__group">
          {hashPrevPage ? (
            <span className={`pagination-actions__icon`} onClick={() => setPage((prev) => prev - 1)}>
              <IconChevronLeft color="white" size={16} />
            </span>
          ) : (
            <span className={`pagination-actions__icon`} style={{ color: "grey" }}>
              <IconChevronLeft color="grey" size={16} />
            </span>
          )}
          {hashNextPage ? (
            <span className={`pagination-actions__icon`} onClick={() => setPage((prev) => prev + 1)}>
              <IconChevronRight color="white" size={16} />
            </span>
          ) : (
            <span className={`pagination-actions__icon`} style={{ color: "grey" }}>
              <IconChevronRight color="grey" size={16} />
            </span>
          )}
        </div>
        <div className={`pagination-actions__group ${showSearchBar && "search--open"}`}>
          {showSearchBar && (
            <form>
              <input onChange={handleSearch} name="search" type="text" defaultValue={search} />
            </form>
          )}
          <span className="pagination-actions__icon" onClick={() => setShowSearchBar(!showSearchBar)}>
            <SearchIcon />
          </span>
        </div>
        <div className="pagination-actions__group">
          <Link href={adminLink}>
            <a className={`pagination-actions__icon`}>
              <AddIcon />
            </a>
          </Link>
        </div>
        <div className="pagination-actions__group">
          <span
            className={`pagination-actions__icon ${activeButton === "grid" && "icon--active"}`}
            onClick={() => setActiveButton("grid")}
          >
            <GridIcon />
          </span>
          <span
            className={`pagination-actions__icon ${activeButton === "linear" && "icon--active"}`}
            onClick={() => setActiveButton("linear")}
          >
            <ListIcon />
          </span>
        </div>
      </div>
      <div className={`pagination-wrapper pagination--${activeButton}`}>{children}</div>
    </>
  );
};

export default PaginationWrapper;

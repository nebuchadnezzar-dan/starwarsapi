import React from "react";
import "./search.css";
import { ReactComponent as Left } from "../../img/SVG/arrow-left2.svg";
import { ReactComponent as Right } from "../../img/SVG/arrow-right2.svg";
import Container from "../ui/Container";
import LogoContainer from "../ui/LogoContainer";
import SearchBarButtons from "../ui/SearchBarButtons";
import PageNumber from "../ui/PageNumber";
import { useSidebar } from "../../hooks/useSidebar";

const Search = () => {
  const { next, previous, sideBarHandler, onSearch, searchInputRef } =
    useSidebar();

  return (
    <Container className="searchContainer">
      <LogoContainer />
      <input
        type="text"
        className="searchInput"
        placeholder="Search"
        ref={searchInputRef}
        onChange={onSearch}
      />
      <Container className="navButton">
        {previous && (
          <SearchBarButtons
            className="btn btn-previous"
            callback={() => sideBarHandler(undefined, undefined, "prev")}
            message="Previous"
            icon={<Left className="arrow-icon arrow-icon--left" />}
            direction="left"
          />
        )}
        <PageNumber next={next} previous={previous} />
        {next && (
          <SearchBarButtons
            className="btn btn-next"
            callback={() => sideBarHandler(undefined, undefined, "next")}
            message="Next"
            icon={<Right className="arrow-icon arrow-icon--right" />}
            direction="right"
          />
        )}
      </Container>
    </Container>
  );
};

export default Search;

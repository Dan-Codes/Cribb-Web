import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../utils/SectionProps";
import Testimonial from "../components/sections/Testimonial";
import { useHistory } from "react-router-dom";
import { CribbContext } from "../CribbContext";
import SectionHeader from "../components/sections/partials/SectionHeader";
import SearchBar from "../components/sections/partials/SearchBar";

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types,
};

const defaultProps = {
  children: null,
  ...SectionProps.defaults,
};

const Search = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );
  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  function listingClicked() {}
  const sectionHeader = {};

  console.log("search", window.location.pathname.slice(8));
  const p = window.location.pathname.slice(8);
  const [cribb, setCribb] = useContext(CribbContext);

  useEffect(() => {
    setCribb({
      ...cribb,
      search: decodeURI(window.location.pathname.slice(8)),
    });
  }, []);

  return (
    <>
      <section {...props} className={outerClasses}>
        <div className="container">
          <div className={innerClasses}>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <SearchBar></SearchBar>
              </div>
            </div>
            <Testimonial className="reveal-from-bottom">
              {props.children}
            </Testimonial>
          </div>
        </div>
      </section>
    </>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;

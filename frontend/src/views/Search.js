import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../utils/SectionProps";
import Testimonial from "../components/sections/Testimonial";

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
  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  function listingClicked() {}

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <Testimonial className="reveal-from-bottom">
            {props.children}
          </Testimonial>
        </div>
      </div>
    </section>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;

import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../../utils/SectionProps";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const ListItem = (...props) => {
  console.log("props", props);
  return (
    <>
      <div>
        {/* <div className="reveal-from-right" data-reveal-delay="200"> */}
        <div className="tiles-item-inner">
          <div className="testimonial-item-content">
            <p className="text-sm mb-0">{props[0].listing.streetaddress}</p>
          </div>
          <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
            <span className="testimonial-item-name text-color-high">
              Roman Level
            </span>
            <span className="text-color-low"> / </span>
            <span className="testimonial-item-link">
              <div href="#0">AppName</div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;

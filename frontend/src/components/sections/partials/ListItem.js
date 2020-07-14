import React from "react";
import classNames from "classnames";
const ListItem = (...props) => {
  return (
    <div
      {...props}
      className="tiles-item reveal-from-right"
      data-reveal-delay="200"
    >
      <div className="tiles-item-inner">
        <div className="testimonial-item-content">
          <p className="text-sm mb-0">{props.address}</p>
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
  );
};

export default ListItem;

import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../../utils/SectionProps";
import { Rate } from "antd";
import Listing from "./Listing";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const ListItem = ({ tilesClasses, listing, ...props }) => {
  console.log(listing);
  return (
    <>
      <div className="mt-4 mb-4 mr-4 ml-4" {...props}>
        {/* <div className="reveal-from-right" data-reveal-delay="200"> */}
        <div className="tiles-item-inner">
          {/* <div className="testimonial-item-content">
            <p className="text-sm mb-0">{listing.streetaddress}</p>
          </div>
          <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
            <span className="testimonial-item-name text-color-high">
              Roman Level
            </span>
            <span className="text-color-low"> / </span>
            <span className="testimonial-item-link">
              <div href="#0">AppName</div>
            </span>
          </div> */}
          <div className="card container" style={{ width: "16rem" }}>
            <img className="card-img-top"></img>
            <div className="card-body">
              <h5 className="card-title">{listing.streetaddress}</h5>
              <Rate disabled allowHalf value={listing.avgoverallrating} />
              <span className="ant-rate-text">
                {"(" + listing.avgoverallrating + ")"}
              </span>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;

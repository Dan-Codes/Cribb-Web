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
      <div className="tiles-item-content" {...props}>
        <div
          className="card container bg-dark text-white"
          style={{ width: "16rem", backgroundColor: "dark" }}
        >
          <img className="card-img-top"></img>
          <div className="card-body">
            <h5 className="card-title">{listing.streetaddress}</h5>
            <Rate disabled allowHalf value={listing.avgoverallrating} />
            <span className="ant-rate-text">
              {"(" +
                (listing.numofreviews != null ? listing.numofreviews : 0) +
                ")"}
            </span>
            <p className="card-text">
              {listing.description == null || listing.description == ""
                ? `This cribb is located in the heart of ${listing.city}, ${listing.state_id}`
                : listing.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;

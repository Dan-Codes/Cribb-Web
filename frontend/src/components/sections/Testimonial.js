import React, { useState, useLayoutEffect, useEffect } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import axios from "axios";
import Bucket from "./partials/Bucket";
import { useHistory } from "react-router-dom";
import { Space } from "antd";
import ListItem from "./partials/ListItem";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
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
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  const sectionHeader = {
    title: "Search Result",
    paragraph:
      "Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.",
  };
  const [search, setSearch] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/viewCribb`)
      .then((result) => {
        setSearch(result.data);
      })
      .catch((err) => console.log(err));

    console.log(props.className);
  }, []);

  const history = useHistory();

  function listingClicked(listing) {
    console.log("Listing Clicked", listing);
    history.push(
      `/listing/${listing.streetaddress}&${listing.address_id}`,
      listing
    );
  }

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            {/* <Bucket {...props}>{props.children}</Bucket> */}
            <>
              {search ? (
                <>
                  {Object.keys(search).map((item, index) => (
                    <>
                      <div className="tiles-item">
                        <ListItem
                          {...props}
                          className=""
                          key={search[item].address_id}
                          listing={search[item]}
                          onClick={() => listingClicked(search[item])}
                        ></ListItem>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;

import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import axios from "axios";
import Bucket from "./partials/Bucket";
import { useHistory } from "react-router-dom";
import { Space } from "antd";
import ListItem from "./partials/ListItem";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { CribbContext } from "../../CribbContext";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
  path,
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
    paragraph: "Any of these cribbs fancy you?",
  };
  const [search, setSearch] = useState();
  const [cribb, setCribb] = useContext(CribbContext);
  var geolocation;
  useEffect(() => {
    async function fetchdata() {
      await geocodeByAddress(cribb.search)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          console.log("Success 1", latLng);
          geolocation = latLng;
        })
        .catch((error) => console.error("Error", error));

      await axios
        .get(`http://localhost:9000/viewCribb`, { params: geolocation })
        .then((result) => {
          console.log("2");
          setSearch(result.data);
        });
      // .catch((err) => console.log(err));
    }
    fetchdata();
  }, [cribb]);

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

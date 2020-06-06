import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
// import sections

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const GoogleMaps = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    "maps section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "maps-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  function Map() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.712776, lng: -74.005974 }}
      />
    );
  }
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  const api = process.env.REACT_APP_key;
  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className="maps-content">
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `75vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

GoogleMaps.propTypes = propTypes;
GoogleMaps.defaultProps = defaultProps;

export default GoogleMaps;

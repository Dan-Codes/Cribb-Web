import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
//import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./GoogleMaps.css";
import axios from "axios";

import logo from "../../logo.svg";
import mapsStyle from "../../mapsStyle";
import Emoji from "../elements/Emoji";
import house from "../../house.svg";
// import sections

const containerStyle = {
  height: "65vh",
  width: "100%",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  padding: 0,
};

const center = {
  lat: 40.680985,
  lng: -73.9984122,
};

const options = {
  styles: mapsStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

function GoogleMaps() {
  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const icon = <Emoji symbol="🏠"></Emoji>;

  const onLoad = React.useCallback(async (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    //map.fitBounds(bounds);
    setMap(map);
    await axios
      .get("http://localhost:9000/viewCribb")
      .then((result) => {
        console.log("database call response: ", result.data);
        setMarkers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_key}>
      <h1>
        <img src={logo} height="100" width="100"></img>
      </h1>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={options}
        onUnmount={onUnmount}
      >
        {
          /* Child components, such as markers, info windows, etc. */

          markers.map((item) => (
            <Marker
              key={item.address_id}
              position={{ lat: Number(item.lat), lng: Number(item.long) }}
              icon={{
                url: house,
                scaledSize: new window.google.maps.Size(25, 25),
              }}
            ></Marker>
          ))
        }

        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GoogleMaps);

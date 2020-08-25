import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
//import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./GoogleMaps.css";
import axios from "axios";

import logo from "../../logo.svg";
import mapsStyle from "../../mapsStyle";
import Emoji from "../elements/Emoji";
import house from "../../house.svg";
import { useEffect } from "react";
import ListItem from "../sections/partials/ListItem";
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
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [api, setApi] = React.useState(false);
  const icon = <Emoji symbol="🏠"></Emoji>;

  useEffect(() => {
    if (window.google) {
      console.log("Google Maps exists");
      setApi(true);
    }
  });

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

  markers.map((place) => {
    var res = encodeURI(place.streetaddress + "&" + place.address_id);
    var contentString =
      '<div onClick={console.log("clicked");} id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' +
      place.streetaddress +
      "</h1>" +
      '<div id="bodyContent">' +
      "<p>Rating: <b>" +
      place.avgoverallrating +
      "</b></p>" +
      "</div>" +
      "<a href=" +
      "listing/" +
      res +
      ">" +
      `View Cribb` +
      "</a>" +
      "</div>";
    var infowindow = new window.google.maps.InfoWindow({
      content: contentString,
    });

    var marker = new window.google.maps.Marker({
      position: { lat: Number(place.lat), lng: Number(place.long) },
      map: map,
      title: "Uluru (Ayers Rock)",
      icon: {
        url: house,
        scaledSize: new window.google.maps.Size(25, 25),
      },
    });
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
  });

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_key}> */}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={options}
        onUnmount={onUnmount}
      ></GoogleMap>
      {/* </LoadScript> */}
    </>
  );
}

export default React.memo(GoogleMaps);

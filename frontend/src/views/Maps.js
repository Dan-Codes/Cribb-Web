import React from "react";
// import sections
import Hero from "../components/sections/Hero";
import GoogleMaps from "../components/maps/GoogleMaps";
import SectionHeader from "../components/sections/partials/SectionHeader";

const Maps = () => {
  const sectionHeader = {
    title: "Maps",
  };
  return (
    <>
      <SectionHeader
        data={sectionHeader}
        className="center-content"
      ></SectionHeader>
      <GoogleMaps className="illustration-section-01" />;
    </>
  );
};

export default Maps;

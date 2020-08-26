import React from "react";
// import sections
import Hero from "../components/sections/Hero";
import GoogleMaps from "../components/maps/GoogleMaps";
import SectionHeader from "../components/sections/partials/SectionHeader";
import GenericSection from "../components/sections/GenericSection";

const Maps = () => {
  const sectionHeader = {
    title: "Map",
  };
  return (
    <>
      <SectionHeader
        data={sectionHeader}
        className="center-content"
      ></SectionHeader>
      <GenericSection>
        <GoogleMaps className="illustration-section-01" />;
      </GenericSection>
    </>
  );
};

export default Maps;

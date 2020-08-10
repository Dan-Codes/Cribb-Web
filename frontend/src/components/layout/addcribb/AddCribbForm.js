import React, { Component, useState } from "react";
import useForm from "react-hook-form";
import classNames from "classnames";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import parseAddress from "parse-address";

import { SectionProps } from "../../../utils/SectionProps";
import Input from "../../elements/Input";
import Button from "../../elements/Button";

//component
import GenericSection from "../../../../src/components/sections/GenericSection";
import FormHint from "../../elements/FormHint";

// import sections

export default class AddCribbForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      address_data: [],
      addedby: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      googleMapLink: "",
      landlord: "",
      phone: "",
      rent: "",
      lat: "",
      long: "",
      avgAmenities: "0",
      avgManage: "0",
      avgLocation: "0",
      avgOverallRating: "0",
      exists: false,
    };
    this.autocomplete = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeAutocomplete = async (address) => {
    await this.setState({ address: address });
  };

  handleSelect = async (address) => {
    const parsed = parseAddress.parseLocation(address);

    await this.setState({ street_address: address, address_data: parsed });
    var street = "";
    if (!this.state.address_data.prefix === "undefined") {
      street =
        this.state.address_data.number +
        " " +
        this.state.address_data.prefix +
        " " +
        this.state.address_data.street;
    } else {
      street =
        this.state.address_data.number + " " + this.state.address_data.street;
    }
    // await geocodeByAddress(address)
    //   .then((results) => getLatLng(results[0]))
    //   .then((geopoint) =>
    //     this.setState({ lat: geopoint.lat, long: geopoint.lng })
    //   )
    //   .catch((error) => console.error("Error", error));
    // this.setState({
    //   street_address: street,
    //   city: this.state.address_data.city,
    //   state: this.state.address_data.state,
    //   zip_code: this.state.address_data.zip_code,
    // });
    console.log(this.state);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = this.state;
      const response = await fetch("http://localhost:9000/addcribb", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.status == 500) {
          this.setState({ exists: true });
        } else {
          window.location = "/maps";
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <GenericSection className="mt-0">
        <section
          className="mt-0 mb-16 reveal-from-bottom"
          data-reveal-delay="200"
        >
          <div>
            <h1>Add New Cribb</h1>
            <form onSubmit={this.handleSubmit}>
              <PlacesAutocomplete
                value={this.state.address || ""}
                onChange={this.handleChangeAutocomplete}
                onSelect={this.handleSelect}
                googleCallbackName="myCallbackFunc"
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <Input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              <Input
                className="mt-16 mb-16"
                name={"addedby"}
                value={this.state.addedby || ""}
                placeholder={"Name"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"street_address"}
                value={this.state.street_address || ""}
                placeholder={"Street Address"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"city"}
                value={this.state.city || ""}
                placeholder={"City"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"state"}
                value={this.state.state || ""}
                placeholder={"State"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"zip_code"}
                value={this.state.zip_code || ""}
                placeholder={"Zipcode"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"landlord"}
                value={this.state.landlord || ""}
                placeholder={"Landlord"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"phone"}
                value={this.state.phone || ""}
                placeholder={"Phone Number"}
                onChange={this.handleChange}
              />
              <Input
                className="mt-16 mb-16"
                name={"rent"}
                value={this.state.rent || ""}
                placeholder={"Rent Cost"}
                onChange={this.handleChange}
              />
              <Button className="mt-16 mb-16">Submit</Button>
              {this.exists ? (
                <FormHint>This address already exists</FormHint>
              ) : (
                <></>
              )}
            </form>
          </div>
        </section>
      </GenericSection>
    );
  }

  // AddCribbForm.propTypes = propTypes;
  // AddCribbForm.defaultProps = defaultProps;
}

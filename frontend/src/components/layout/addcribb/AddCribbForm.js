import React, { Component } from "react";
import useForm from "react-hook-form";
import classNames from "classnames";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import parseAddress from "parse-address";

import { SectionProps } from "../../../utils/SectionProps";
import Input from "../../elements/Input";
import GenericSection from "../../../../src/components/sections/GenericSection";

// import sections

export default class AddCribbForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      address_data: [],
      name: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      googleMapLink: "",
    };
    this.autocomplete = null;
  }
  handleChange = (address) => {
    this.setState({ address: address });
  };

  handleSelect = async (address) => {
    const parsed = parseAddress.parseLocation(address);

    await this.setState({ street_address: address, address_data: parsed });
    console.log(this.state.address_data.prefix, this.state.address_data.number);
    this.setState({
      city: this.state.address_data.city,
      state: this.state.address_data.state,
      zip_code: this.state.address_data.zip_code,
    });
  };

  handlePlaceSelect = (address) => {
    // let addressObject = addres.getPlace();
    // let address = addressObject.address_components;
    // this.setState({
    //   name: address,
    // street_address: `${address[0].long_name} ${address[1].long_name}`,
    // city: address[4].long_name,
    // state: address[6].short_name,
    // zip_code: address[8].short_name,
    // googleMapLink: addressObject.url,
    //  });
  };

  render() {
    return (
      <GenericSection>
        <section
          className="mt-0 mb-16 reveal-from-bottom"
          data-reveal-delay="200"
        >
          <div>
            <h1>Add New Cribb</h1>
            <form onSubmit={this.handleSubmit}>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
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
                    <input
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

              <input
                name={"name"}
                value={this.state.name}
                placeholder={"Name"}
                onChange={this.handleChange}
              />
              <input
                name={"street_address"}
                value={this.state.street_address}
                placeholder={"Street Address"}
                onChange={this.handleChange}
              />
              <input
                name={"city"}
                value={this.state.city}
                placeholder={"City"}
                onChange={this.handleChange}
              />
              <input
                name={"state"}
                value={this.state.state}
                placeholder={"State"}
                onChange={this.handleChange}
              />
              <input
                name={"zip_code"}
                value={this.state.zip_code}
                placeholder={"Zipcode"}
                onChange={this.handleChange}
              />
              <button onSubmit={this.handleSubmit}>Submit</button>
            </form>
          </div>
        </section>
      </GenericSection>
    );
  }

  // AddCribbForm.propTypes = propTypes;
  // AddCribbForm.defaultProps = defaultProps;
}

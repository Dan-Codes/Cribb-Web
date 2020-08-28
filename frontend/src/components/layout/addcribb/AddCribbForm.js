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
import Select from "../../elements/Select";
import Checkbox from "../../elements/Checkbox";
import Radio from "../../elements/Radio";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Form, FormGroup, FormControl, Col } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";

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
      invalid: false,
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
    console.log(parsed);

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
    this.setState({
      street_address: street,
      city: parsed.city,
      state: parsed.state,
      zip_code: this.state.address_data.zip_code,
    });
    console.log(this.state);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = this.state;
      console.log(e);
      const response = await Axios.post(
        "http://localhost:9000/addcribb",
        body
      ).then((res) => {
        if (res.status == 409) {
          this.setState({ exists: true });
        } else if (res.status == 404) {
          this.setState({ invalid: true });
        } else if (res.status == 200) {
          window.location = "/maps";
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <GenericSection
        className="mt-0 reveal-from-bottom"
        data-reveal-delay="200"
      >
        <Formik
          initialValues={{
            street_address: "",
            zip_code: "",
            state: "",
            rent: "",
            phone: "",
            landlord: "",
            city: "",
            zipcode: "",
            description: "",
            addedby: "",
            avgAmenities: "0",
            avgManage: "0",
            avgLocation: "0",
            avgOverallRating: "0",
            invalid: false,
            err: "",
          }}
          validate={(values) => {
            const errors = {};
            //  if (!values.email) {
            //    errors.email = 'Required';
            //  } else if (
            //    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //  ) {
            //    errors.email = 'Invalid email address';
            //  }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            //alert(JSON.stringify(values, null, 2));
            const response = await Axios.post(
              "http://localhost:9000/addcribb",
              values
            )
              .then((res) => {
                if (res.status == 200) {
                  window.location = "/maps";
                }
              })
              .catch((err) => {
                console.log(err.response.status);
                const status = err.response.status;
                const errors = {};
                if (status == 409) {
                  this.setState({ exists: true });
                  values.invalid = true;
                  values.err = "This place is already registered";
                  errors.err = "This place is already registered";
                } else if (status == 404) {
                  this.setState({ invalid: true });
                  values.invalid = true;
                  values.err = "This address does not exist";
                  errors.err = "This address does not exist";
                }
                window.scrollTo(0, 0);
                return errors;
              });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="mb-16">
                  <PlacesAutocomplete
                    value={this.state.address || ""}
                    onChange={this.handleChangeAutocomplete}
                    onSelect={async (value, { ...props }) => {
                      alert(JSON.stringify(value, null, 2));
                      const parsed = parseAddress.parseLocation(value);
                      console.log(parsed);
                      values.street_address =
                        parsed.number + " " + parsed.street + " " + parsed.type;
                      values.city = parsed.city;
                      values.state = parsed.state;
                      this.setState({
                        street_address: parsed.street,
                        city: parsed.city,
                        state: parsed.state,
                        zip_code: this.state.address_data.zip_code,
                      });
                    }}
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
                            label: "Search",
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
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };

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
                </div>
                <div className="mb-16">
                  <Input
                    type="text"
                    placeholder="Nickname"
                    name="addedby"
                    label="Nickname of place"
                    hint=""
                    status=""
                    name={"addedby"}
                    value={this.state.addedby || ""}
                    placeholder={"Name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.addedby}
                  />
                </div>
                <div className="mb-16">
                  <Input
                    type="text"
                    placeholder="Address Line 1"
                    name="street_address"
                    value={values.street_address} //{this.state.street_address || ""}
                    label="Address Line 1"
                    status={values.invalid ? "error" : ""}
                    hint={values.invalid ? values.err : ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                <Form.Row
                  className=""
                  style={{ justifyContent: "inline-block" }}
                >
                  <div className="mb-16 col-md-5">
                    <Input
                      className="d-block w-100"
                      type="text"
                      name="city"
                      placeholder="City"
                      value={values.city} //{this.state.city || ""}
                      label="City"
                      status=""
                      hint=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  <div className="mb-16 col-md-4">
                    <Select
                      className="d-block w-100"
                      label="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    >
                      <option hidden>Choose State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </Select>
                  </div>

                  <div className="mb-16 col-md-3">
                    <Input
                      className="d-block w-100"
                      type="text"
                      name="zipcode"
                      placeholder="Zipcode"
                      value={values.zipcode} //{this.state.city || ""}
                      label="Zipcode"
                      status=""
                      hint=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                </Form.Row>
                <div className="mb-16">
                  <Input
                    type="number"
                    name="phone"
                    placeholder="Contact Number"
                    value={values.phone} //{this.state.city || ""}
                    label="Contact Number"
                    status=""
                    hint=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="mb-16">
                  <Input
                    type="text"
                    name="landlord"
                    placeholder="Owner's Name"
                    value={values.landlord} //{this.state.city || ""}
                    label="Owner's Name"
                    status=""
                    hint=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="mb-16">
                  <Input
                    type="number"
                    name="rent"
                    placeholder="Rent Price"
                    value={values.rent} //{this.state.city || ""}
                    label="Rent Price"
                    status=""
                    hint=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="mb-16">
                  <Input
                    type="textarea"
                    name="description"
                    placeholder="Description of Cribb (500 Character Max)"
                    label="Description of Cribb"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                </div>
                <div className="mb-16">
                  <Checkbox required>
                    I agree with the <a href="#">terms and conditions</a>
                  </Checkbox>
                </div>

                <div className="mt-24">
                  <div className="button-group">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                    <a className="button-link text-xs"></a>
                  </div>
                </div>
                <ErrorMessage name="err" component="div" />
              </fieldset>
            </form>
          )}
        </Formik>
      </GenericSection>
    );
  }

  // AddCribbForm.propTypes = propTypes;
  // AddCribbForm.defaultProps = defaultProps;
}

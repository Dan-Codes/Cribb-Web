import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import { Formik, Form } from "formik";
import Input from "../../elements/Input";
import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { CribbContext } from "../../../CribbContext";

const SearchBar = ({ ...props }) => {
  const history = useHistory();
  const [cribb, setCribb] = useContext(CribbContext);
  return (
    <>
      <Formik
        initialValues={{ search: cribb.search }}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          //alert(JSON.stringify(values, null, 2));
          // setCribb({
          //   ...cribb,
          //   search: values.search,
          // });
          history.push(`/search/${values.search}`);
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
        }) => (
          <Form>
            <div
              className="mt-2 mb-2 hero-action reveal-from-bottom"
              data-reveal-delay="450"
            >
              <Input
                id="search"
                type="search"
                label="Query"
                labelHidden
                hasIcon="right"
                placeholder="Find a property"
                //onKeyDown={_handleKeyDown.bind(this)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.search}
              >
                <svg
                  type="submit"
                  width="16"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z"
                    fill="#376DF9"
                  />
                </svg>
              </Input>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchBar;

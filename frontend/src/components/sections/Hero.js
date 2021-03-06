import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import Modal from "../elements/Modal";
import Input from "../elements/Input";
import { CribbContext } from "../../../src/CribbContext";
import Search from "../../views/Search";
import ReactDOM, { render } from "react-dom";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import SearchBar from "./partials/SearchBar";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [videoModalActive, setVideomodalactive] = useState(false);
  const history = useHistory();
  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );
  const [cribb, setCribb] = useContext(CribbContext);
  //console.log(cribb);

  // useEffect(() => {
  //   setCribb((prev) => {prev}
  //   console.log(cribb);
  // }, []);

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(e);
      //history.push("/search");
    }
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Welcome to <span className="text-color-primary">Cribb</span>
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                Need to find a place to live?
              </p>
              {/* <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button
                    tag="a"
                    color="primary"
                    wideMobile
                    href="https://cruip.com/"
                  >
                    Get started
                  </Button>
                  <Button
                    tag="a"
                    color="dark"
                    wideMobile
                    href="https://github.com/cruip/open-react-template/"
                  >
                    View on Github
                  </Button>
                </ButtonGroup>
              </div> */}
            </div>
          </div>

          {/* <Formik
            initialValues={{ search: "" }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              alert(JSON.stringify(values, null, 2));
              setCribb({
                ...cribb,
                search: values.search,
              });
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
                  className="mt-32 mb-32 hero-action reveal-from-bottom"
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
          </Formik> */}

          <SearchBar></SearchBar>

          {/* Video  */}
          {/* <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require("./../../assets/images/video-placeholder.jpg")}
                alt="Hero"
                width={896}
                height={504}
              />
            </a>
          </div> */}
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe"
          />
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;

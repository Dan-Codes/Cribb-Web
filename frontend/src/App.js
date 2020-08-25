import React, {
  useRef,
  useEffect,
  createContext,
  Component,
  useContext,
  useState,
} from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";
import { CribbContext } from "./CribbContext";
import axios from "axios";
import "./App.css";
import "@fortawesome/fontawesome-free";

// Layouts
import { LayoutDefault } from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Maps from "./views/Maps";
import AddCribb from "./views/AddCribb";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Search from "./views/Search";

import ListingController from "./controller/ListingController";
import ReviewController from "./controller/ReviewController";
import Logout from "./controller/Logout";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);
const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = (props) => {
  const childRef = useRef();
  let location = useLocation();

  const value = useContext(CribbContext);
  let isLoggedIn = value[0].auth;

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // const PrivateRoute = ({ component: Component, ...rest}) => {
  //   const value = useContext(CribbContext);
  //   <Route {...rest} render={(props) => (
  //     value[0].auth === true ? <
  //   )}/>
  //   }

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute
            exact
            path="/maps"
            component={Maps}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/addcribb"
            component={isLoggedIn ? AddCribb : Login}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/search"
            component={Search}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/signup"
            component={SignUp}
            layout={LayoutDefault}
          />
          <AppRoute
            exact
            path="/login"
            component={Login}
            layout={LayoutDefault}
          />
          <AppRoute
            path="/listing"
            component={ListingController}
            layout={LayoutDefault}
          />
          <AppRoute
            path="/review"
            component={ReviewController}
            layout={LayoutDefault}
          />
          <AppRoute path="/logout" component={Logout} />
        </Switch>
      )}
    />
  );
};

export default App;

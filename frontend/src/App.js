import React, { useRef, useEffect, createContext } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Maps from "./views/Maps";
import AddCribb from "./views/AddCribb";
import SignUp from "./views/SignUp";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
            component={AddCribb}
            layout={LayoutDefault}
          />
          <AppRoute exact path="/signup" component={SignUp} />
        </Switch>
      )}
    />
  );
};

export default App;

import React, {
  useRef,
  useEffect,
  createContext,
  Component,
  useContext,
} from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import { LayoutDefault } from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Maps from "./views/Maps";
import AddCribb from "./views/AddCribb";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Search from "./views/Search";
import { CribbContext } from "./CribbContext";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = (props) => {
  const childRef = useRef();
  let location = useLocation();

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
            component={AddCribb}
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
        </Switch>
      )}
    />
  );
};

export default App;

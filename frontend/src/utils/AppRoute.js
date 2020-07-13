import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Login from "../views/Login";
import { CribbContext } from "../CribbContext";
import AddCribb from "../views/AddCribb";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;
  const value = useContext(CribbContext);

  // Checks Requires Auth to proceed
  if (Component === AddCribb) {
    let isLoggedIn = value[0].auth;
    if (!isLoggedIn) {
      Component = Login;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default AppRoute;

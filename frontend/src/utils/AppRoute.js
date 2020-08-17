import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "../views/Login";
import { CribbContext } from "../CribbContext";
import AddCribb from "../views/AddCribb";
import AddCribbForm from "../components/layout/addcribb/AddCribbForm";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;
  const value = useContext(CribbContext);

  // useEffect(() => {
  //   // Checks Requires Auth to proceed
  //   console.log("Componenet is ", Component);
  //   if (Component === AddCribb || AddCribbForm) {
  //     console.log("triggered");
  //     let isLoggedIn = value[0].auth;
  //     console.log("value of login: ", isLoggedIn);
  //     if (!isLoggedIn) {
  //       Component = Login;
  //     }
  //   }
  // });

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

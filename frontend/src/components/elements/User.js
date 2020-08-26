import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCircle,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const User = ({ style }) => {
  return (
    <>
      <FontAwesomeIcon icon={style == "house" ? faHouseUser : faUser} />
    </>
  );
};

export default User;

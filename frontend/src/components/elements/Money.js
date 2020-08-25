import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const Money = ({ cost }) => {
  var mun = [];

  if (cost <= 500) {
    mun = _.fill(Array(1), <FontAwesomeIcon icon={faDollarSign} />);
  } else if (cost <= 1200 && cost > 500)
    mun = _.fill(Array(2), <FontAwesomeIcon icon={faDollarSign} />);
  else if (cost <= 2000 && cost > 1200)
    mun = _.fill(Array(3), <FontAwesomeIcon icon={faDollarSign} />);
  else if (cost > 2000)
    mun = _.fill(Array(4), <FontAwesomeIcon icon={faDollarSign} />);
  return (
    <>
      <div>{mun}</div>
    </>
  );
};

export default Money;

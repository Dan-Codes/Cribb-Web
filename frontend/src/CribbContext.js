import React, { useState, createContext } from "react";
import { SectionProps } from "./utils/SectionProps";

export const CribbContext = createContext();

export const CribbProvider = (props) => {
  const [cribb, setCribb] = useState({
    name: "",
    auth: false,
    search: "",
    user_id: "",
  });

  return (
    <CribbContext.Provider value={[cribb, setCribb]}>
      {props.children}
    </CribbContext.Provider>
  );
};

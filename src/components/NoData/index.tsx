import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useLanguage } from "../../hooks";

import "./styles.scss";

const NoData: React.FC = () => {
  const LANG = useLanguage();

  return (
    <div className="noData">
      <div className="noData__wrapper">
        <ErrorOutlineIcon />
        <h4>{LANG.MISC.NO_RECIPES}</h4>
      </div>
    </div>
  );
};

export default NoData;

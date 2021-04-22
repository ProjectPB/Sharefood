import React from "react";
import "./NoData.css";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function NoData() {
    return (
        <div className="noData">
            <ErrorOutlineIcon />
            <h4>Could not find recipes which match your criteria</h4>
        </div>
    );
}

export default NoData;
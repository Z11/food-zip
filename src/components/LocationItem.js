import React from "react";
import { fetchInformationFromOtherAPIs } from "../actions/";
import { connect } from "react-redux";

const LocationItem = ({ location, fetchInformationFromOtherAPIs }) => {
  return (
    <div onClick={() => fetchInformationFromOtherAPIs(location)}>
      <div className="item">
        <div className="header">{location.name}</div>
        <div className="description">
          <div>{location.formatted_address}</div>
          <i> Rating: {location.rating}</i>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { fetchInformationFromOtherAPIs }
)(LocationItem);

import React from "react";
import { fetchLocationDetailsFromAPIs } from "../actions/";
import { connect } from "react-redux";

const LocationItem = ({ location, fetchLocationDetailsFromAPIs }) => {
  return (
    <div onClick={() => fetchLocationDetailsFromAPIs(location)}>
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
  { fetchLocationDetailsFromAPIs }
)(LocationItem);

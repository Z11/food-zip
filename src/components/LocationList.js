import React from "react";
import { connect } from "react-redux";
import LocationItem from "./LocationItem";
import Fade from "react-reveal/Fade";
import { Scrollbars } from "react-custom-scrollbars";

const LocationList = ({ locations, favorites, button }) => {
  let loc = null;

  if (locations.length === 0) return <div />;

  if (button === "list") loc = locations;
  else loc = favorites;

  const Locations = loc.map(loc => {
    return (
      <div className="item" key={loc.place_id}>
        <Fade left>
          <div className="content">
            <LocationItem location={loc} />
          </div>
        </Fade>
      </div>
    );
  });
  return (
    <div className="ui segment">
      <Scrollbars style={{ width: 325, height: 550 }}>
        <div className="ui relaxed divided list">{Locations}</div>
      </Scrollbars>
    </div>
  );
};

const mapStateToProps = state => {
  return { locations: state.locationsDetails, favorites: state.favorites };
};

export default connect(mapStateToProps)(LocationList);

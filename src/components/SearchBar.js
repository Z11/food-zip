import React from "react";
import { fetchLocations, resetStates } from "../actions/";
import { connect } from "react-redux";
import { GoogleApiWrapper } from "google-maps-react"; //npm install --save google-maps-react
import "./styles.css";

class SearchBar extends React.Component {
  state = { term: "" };

  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.resetStates();
    const { google } = this.props;
    const service = new google.maps.places.PlacesService(
      document.getElementById("map"),
      {}
    );
    this.props.fetchLocations(this.state.term, google, service);
  };

  render() {
    return (
      <div className="mdl-textfield mdl-js-textfield">
        <form onSubmit={this.onFormSubmit}>
          <div id="map" />
          <input
            className="mdl-textfield__input"
            pattern="-?[0-9]*(\.[0-9]+)?"
            id="zipInput"
            maxLength="5"
            google={this.props.google}
            type="text"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <label className="mdl-textfield__label" htmlFor="zipInput">
            Zip Code...
          </label>
          <span className="mdl-textfield__error">Input is not a number!</span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { locations: state.locations };
};

export default connect(
  mapStateToProps,
  { fetchLocations, resetStates }
)(
  GoogleApiWrapper({
    apiKey: ""
  })(SearchBar)
);

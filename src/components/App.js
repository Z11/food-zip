import React, { useState } from "react";
import SearchBar from "./SearchBar";
import LocationList from "./LocationList";
import LocationDetail from "./LocationDetail";
import "./styles.css";

const App = () => {
  const [button, btnSet] = useState("list");
  return (
    <div className="ui-container">
      <div className="MoveRight">
        <div className="ui grid">
          <div className="ui row">
            <div className="column five wide">
              <SearchBar />
              <div className="purple ui buttons">
                <button
                  className="ui button active"
                  onClick={() => btnSet("list")}
                >
                  List
                </button>
                <button className="ui button" onClick={() => btnSet("fav")}>
                  Favorites
                </button>
              </div>
              <br />
              <LocationList button={button} />
            </div>
            <div className="ten wide column">
              <br />
              <LocationDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

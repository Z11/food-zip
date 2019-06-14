import { combineReducers } from "redux";
import locationsReducer from "./locationsReducer";
import reviewsReducer from "./reviewsReducer";
import photosReducer from "./photosReducer";
import selectedLocationDetailsReducer from "./selectedLocationDetailsReducer";
import locationsDetailsReducer from "./locationsDetailsReducer";
import favoritesReducer from "./favoritesReducer";

const appReducer = combineReducers({
  locations: locationsReducer,
  locationsDetails: locationsDetailsReducer,
  reviews: reviewsReducer,
  photos: photosReducer,
  selectedLocation: selectedLocationDetailsReducer,
  favorites: favoritesReducer
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state.locations = undefined;
    state.locationsDetails = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

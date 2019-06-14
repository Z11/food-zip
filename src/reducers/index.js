import { combineReducers } from "redux";
import locationsReducer from "./locationsReducer";
import reviewsReducer from "./reviewsReducer";
import photosReducer from "./photosReducer";
import selectedLocationDetailsReducer from "./selectedLocationDetailsReducer";
import favoritesReducer from "./favoritesReducer";
import googleSvcReducer from "./googleSvcReducer";

const appReducer = combineReducers({
  locations: locationsReducer,
  reviews: reviewsReducer,
  photos: photosReducer,
  selectedLocation: selectedLocationDetailsReducer,
  favorites: favoritesReducer,
  googleSvc: googleSvcReducer
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state.locations = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

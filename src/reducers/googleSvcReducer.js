export default (state = {}, action) => {
  switch (action.type) {
    case "STORE_GOOGLE_SVC_OBJECTS":
      return action.payload;
    default:
      return state;
  }
};

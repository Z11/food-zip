export default (state = [], action) => {
  switch (action.type) {
    case "STORE_FAVORITE":
      return [...state, action.payload];
    default:
      return state;
  }
};

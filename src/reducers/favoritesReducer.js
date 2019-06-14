export default (state = [], action) => {
  switch (action.type) {
    case "STORE_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter(e => e.id !== action.payload.id);
    default:
      return state;
  }
};

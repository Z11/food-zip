import axios from "axios";
const KEY = "";

export default axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place",
  params: {
    key: KEY
  }
});

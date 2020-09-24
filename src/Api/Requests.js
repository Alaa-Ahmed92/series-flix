import axios from "axios";

export async function getMovies() {
  let res = await axios.get("http://api.tvmaze.com/shows");
  return res;
}

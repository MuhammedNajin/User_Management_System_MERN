import createAxios from "../axios/axios";
import { baseURL } from "../data/urls";

export  async function useAuth() {
    console.log("hello");
    const axios = createAxios(baseURL);
    const responce = await axios.post("/protect");
    console.log("responce", responce);
    if (responce.status === 200) {
      return true;
    } else if (responce.status === 403) {
      return false;
    }
  }
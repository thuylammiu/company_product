import axios from "axios";
import {url} from "../utils/constants";

async function loginUser({ email, password }) {
  const response = await axios
    .post(`${url}/login`, {
      email: email,
      password
    })
    .catch(error => console.log(error));
  return response;
}


async function saveUser({ email, password }) {
  const response = await axios
    .post(`${url}/signup`, {
      email: email,
      password
    })
    .catch(error => console.log(error));
  return response;
}

export {loginUser, saveUser} ;

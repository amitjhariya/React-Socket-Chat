import {  API } from "../Constants/index.js";
import cookie from "js-cookie";


export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout success");
    })
    .catch((err) => console.log(err));
};

// set cookie
const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
  });
};

const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 1,
  });
};
// get cookie
const getCookie = (key) => {
  return cookie.get(key);
};
// localstorage
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  const cookieChecked = getCookie("token");
  const data =  localStorage.getItem("user")
  if (cookieChecked && data && data !=='undefined') {
    return JSON.parse(data)    
  }else{
    return false
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth = user;
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};

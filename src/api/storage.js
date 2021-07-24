const Tokenkey = "authToken";
const UserKey = "user";

const storeToken = (token) => store(Tokenkey, token);

const getToken = () => get(Tokenkey);

const removeToken = () => remove(Tokenkey);

const storeUser = (user) => store(UserKey, user);

const getUser = () => get(UserKey);

const removeUser = () => remove(UserKey);

const store = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error Storing " + key + " Locally", error);
  }
};

const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(`Error Retrieving ${key} From Locally`, error);
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(`Error Deleting ${key} From Locally`, error);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  removeUser,
  store,
  get,
};

import axios from "axios";

const usr = 'code-challenge';
const pas = 'payvisioner';
const authType = 'Basic';
const authToken = btoa(usr + ':' + pas);
const auth = authType + " " + authToken;
const baseURL = 'https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions';

const Axios = axios.create({
  baseURL
});
// Set Defaults
Axios.defaults.headers.common['Authorization'] = auth;
Axios.defaults.headers.common.get = "application/json";

export default Axios;

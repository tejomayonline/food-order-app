const env = process.env;
const envPrefix = "REACT_APP_";
const SERVER_URL = env[envPrefix + "SERVER_URL"];

export { SERVER_URL };

export default class HTTPRequest {
  static get = async (url, options = null) => {
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  static post = async (url, data, options = {}) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
        ...options,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
}

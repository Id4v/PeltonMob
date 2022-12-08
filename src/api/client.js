import axios from "axios";

class Client {
  constructor() {
    this._client = axios.create({
      baseURL: "http://192.168.1.94:8000",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  authenticate = (username, password) => {
    try {
      return this._client.post("/api/login", {
        username,
        password,
      });
    } catch (error) {
      console.debug(error);
      return;
    }
  };
}

export default Client;

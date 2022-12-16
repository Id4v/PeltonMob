import axios from 'axios';

class Client {
  constructor() {
    this.client = axios.create({
      baseURL: 'http://192.168.1.94:8000',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.client.interceptors.response.use((response) => response, (error) => {
      if (error.response) {
        // Special case : HTTP401 is managed by JWT and return a response instead of an exception.
        if (error.response.status === 401) {
          return Promise.reject({
            code: '401',
            name: 'Unauthorized',
            message: error.response.data.message,
            stack: error.stack,
          });
        }
        return Promise
          .reject({
            code: String(error.response.status),
            name: error.name,
            message: error.response.data.detail,
            stack: error.stack,
          });
      }
      return Promise.reject(error);
    });
  }

  authenticate = (username, password) => {
    try {
      return this.client.post('/api/login', {
        username,
        password,
      }).then((payload) => payload.data);
    } catch (error) {
      console.error(error);

      return null;
    }
  };
}

export default Client;

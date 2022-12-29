import axios from 'axios';

class Client {

  static client = null;
  axiosClient = null;

  static get instance() {
    if (!this.client) {
      this.client = new Client({'_internal': true});
    }

    return this.client;
  }

  constructor(internal) {

    if (!internal || Object.hasOwnProperty('_internal')) {
      throw new Error('Nope !');
    }

    this.axiosClient = axios.create();

    this.setConfigure({
      baseURL: 'http://192.168.1.94:8000',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.configureInterceptors();
  }

  setConfigure(configuration) {
    const {baseURL, headers = {}, ...rest} = configuration;

    this.axiosClient.defaults.baseURL = baseURL;
    this.axiosClient.defaults.headers = {
      ...this.axiosClient.defaults.headers,
      ...headers
    }

    this.axiosClient.defaults = {
      ...this.axiosClient.defaults,
      ...rest,
    }
  }

  setHeaderToken = (userToken = '') => {
    const jwt = /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/

    if (jwt.test(userToken)) {
      this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`
    }
  }

  authenticate = (username, password) => {
    try {
      return this.axiosClient.post('/api/login', {
        username,
        password,
      }).then((payload) => payload.data);
    } catch (error) {

      return null;
    }
  };

  register = (data) => this.axiosClient.post('/api/register', data).then((payload) => payload.data);

  requestResetPassword = (email) => this.axiosClient.post('/api/password/request', {email}).then((payload) => payload.data);

  getProfile = () => this.axiosClient.get('/api/me').then((payload) => payload.data);

  configureInterceptors() {
    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            // Special case : HTTP401 is managed by JWT and return a response instead of an exception.
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
      }
    );
  }
}

export default Client.instance;

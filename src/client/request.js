import Base from './base';

export default class Service extends Base {
  request (options) {
    return new Promise((resolve, reject) => {
      this.connection(Object.assign({
        json: true
      }, options), function (error, res, data) {
        if (error) {
          return reject(error);
        }

        const statusCode = res.statusCode;
        if (!error && statusCode >= 400) {
          if (typeof data === 'string') {
            return reject(new Error(data));
          }
          data = data || {};
          data.statusCode = statusCode;
          data.response = res;

          return reject(Object.assign(new Error(data.message), data));
        }

        resolve(data);
      });
    });
  }
}

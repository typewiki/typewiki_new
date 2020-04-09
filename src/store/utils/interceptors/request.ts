import { AxiosRequestConfig } from 'axios';
import _defaultsDeep from 'lodash/defaultsDeep';

const onFulfilled = (config: AxiosRequestConfig) => {
  switch (config.method) {
    case 'GET':
    case 'get': {
      return _defaultsDeep(config, {
        params: {
          format: 'json',
        },
      });
    }
    case 'POST':
    case 'post': {
      return _defaultsDeep(config, {
        data: {
          format: 'json',
        },
      });
    }
  }
};

export default [onFulfilled];

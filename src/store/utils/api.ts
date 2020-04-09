import axios from 'axios';
import requestInterceptor from './interceptors/request';
import qs from 'query-string';
import _transform from 'lodash/transform';

const api = axios.create({
  baseURL: 'https://ru.wikipedia.org/w/api.php',
  transformRequest: qs.stringify,
  paramsSerializer: params => {
    const formattedKeys = _transform(params, (r, v, k: string) => {
      // @ts-ignore
      r[k.toLowerCase()] = v;
    });

    // @ts-ignore
    return qs.stringify(formattedKeys, {
      arrayFormat: 'separator',
      arrayFormatSeparator: '|',
    });
  },
});

api.interceptors.request.use(...requestInterceptor);

export default api;

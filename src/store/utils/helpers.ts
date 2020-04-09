import api from './api';

export async function fetchToken(type = 'csrf') {
  const { data } = await api.get('', {
    params: {
      action: 'query',
      meta: 'tokens',
      type,
    },
  });
  return data.query?.tokens?.[`${type}token`];
}

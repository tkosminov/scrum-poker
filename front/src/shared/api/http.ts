import axios from 'axios';

const http_client = axios.create({ baseURL: import.meta.env.VITE_APP_API });

export async function get(path: string, headers: Record<string, string | number> = {}) {
  return http_client.get(path, {
    headers,
  });
}

export async function post(
  path: string,
  body: Record<string, unknown> | FormData,
  headers: Record<string, string | number> = {}
) {
  return http_client.post(path, body, {
    headers,
  });
}

export async function put(path: string, body: Record<string, unknown>, headers: Record<string, string | number> = {}) {
  return http_client.put(path, body, {
    headers,
  });
}

export async function patch(
  path: string,
  body: Record<string, unknown>,
  headers: Record<string, string | number> = {}
) {
  return http_client.patch(path, body, {
    headers,
  });
}

export async function del(path: string, headers: Record<string, string | number> = {}) {
  return http_client.delete(path, { headers });
}

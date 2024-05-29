import { jwtDecode } from "jwt-decode";

import { getCookie, setCookie } from './cookie';

export function getAccessToken() {
  return getCookie('access_token');
}

export function getAccessTokenExpiresIn() {
  return getCookie('access_token_expires_at');
}

export function getRefreshToken() {
  return getCookie('refresh_token');
}

export function getRefreshTokenExpiresIn() {
  return getCookie('refresh_token_expires_at');
}

export function setAccessToken(value: string) {
  return setCookie('access_token', value);
}

export function setAccessTokenExpiresIn(value: string) {
  return setCookie('access_token_expires_at', value);
}

export function setRefreshToken(value: string) {
  return setCookie('refresh_token', value);
}

export function setRefreshTokenExpiresIn(value: string) {
  return setCookie('refresh_token_expires_at', value);
}

export function clearTokens() {
  setAccessToken('');
  setAccessTokenExpiresIn('');
  setRefreshToken('');
  setRefreshTokenExpiresIn('');
}

export function existsRefreshToken() {
  const refresh_token = getRefreshToken();
  const refresh_token_expires_at_token = getRefreshTokenExpiresIn();

  let exists: boolean = true;

  if (
    [refresh_token, refresh_token_expires_at_token].includes('') ||
    new Date(refresh_token_expires_at_token) < new Date()
  ) {
    exists = false;
  }

  return exists;
}

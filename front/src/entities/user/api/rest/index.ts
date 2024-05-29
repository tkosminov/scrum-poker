import { get } from '@/shared/api';

export interface ISignInResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
}

export async function signIn(name: string) {
  return get<ISignInResponse>(`oauth/sign-in?name=${name}`);
}

export async function refreshToken(token: string) {
  return get<ISignInResponse>(`oauth/refresh?token=${token}`);
}

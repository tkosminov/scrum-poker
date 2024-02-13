interface IJwtPayload {
  readonly iss: string; // app name
  readonly iat: number; // jwt created at
  readonly exp: number; // jwt expires at
  readonly jti: string; // jwt id

  readonly id: string; // user id
  readonly token_type: 'access' | 'refresh'; // user id
}

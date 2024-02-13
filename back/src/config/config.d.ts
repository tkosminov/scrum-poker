declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      APP_PORT: string;
      APP_NAME: string;
      LOGGER_LEVEL: string;

      JWT_SECRET: string;
      JWT_ALGORITHM: string;
      JWT_ACCESS_TOKEN_EXPIRES_IN: string;
      JWT_REFRESH_TOKEN_EXPIRES_IN: string;

      BODY_LIMIT: string;
      BODY_PARAMETER_LIMIT: string;

      CORS_CREDENTIALS: string;
      CORS_ALLOWED_METHODS: string;
      CORS_ALLOWED_ORIGINS: string;
      CORS_ALLOWED_PATHS: string;

      DB_NAME: string;
      DB_HOST: string;
      DB_PORT?: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_LOGGING: string;
      DB_SYNCHRONIZE: 'true' | 'false';

      REDIS_HOST: string;
      REDIS_PORT?: string;
      REDIS_KEY: string;
      REDIS_PASSWORD?: string;
    }
  }
}

export {};

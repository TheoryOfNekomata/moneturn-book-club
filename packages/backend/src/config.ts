export namespace meta {
  export const port = Number(process.env.BACKEND_PORT ?? '8080');

  export const host = String(process.env.BACKEND_HOST ?? '0.0.0.0');

  export const env = String(process.env.NODE_ENV ?? 'development');
}

export namespace database {
  export const url = String(process.env.DATABASE_URL);
}

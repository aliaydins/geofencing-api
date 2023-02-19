export const port = process.env.PORT;
export const corsAllowedOrigins = process.env.CORS_ALLOWED_ORIGINS;

export const db = {
   host: process.env.DB_HOST || '',
   port: process.env.DB_PORT || '',
   name: process.env.DB_NAME || '',
   user: process.env.DB_USER || '',
   password: process.env.DB_USER_PASSWORD || '',
   schema: process.env.DB_SCHEMA || '',
};

import * as dotenv from 'dotenv';
dotenv.config();
export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    databaseName: process.env.POSTGRES_DB,
  },
  jwtSecret: process.env.JWT_SECRET,
  smtpConfig: {
    host: process.env.SMTP_HOST,
    port: 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

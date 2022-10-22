export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'host.docker.internal',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: 'student',
    password: '666777',
    databaseName: 'kupipodariday',
  },
  jwtSecret: 'jwtSecret',
  smtpConfig: {
    host: 'smtp.yandex.ru',
    port: 465,
    user: 'testservex@yandex.ru',
    pass: '666777Asv',
  },
});

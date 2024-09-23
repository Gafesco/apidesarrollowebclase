

const env = {
  database: 'basedatos_llsp',
  username: 'usuario',
  password: 'n1YMCWB9R3TJ2vgrEYOeeAId7DwjoRQB',
  host: 'dpg-cqc7lo6ehbks738aml60-a.oregon-postgres.render.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
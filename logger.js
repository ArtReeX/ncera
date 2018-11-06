const log4js = require('log4js');
const { configLog } = require('./config');

module.exports = (config = configLog) => {
  try {
    // настройка логгирования
    log4js.configure(config);
    return {
      app: log4js.getLogger('app'),
      network: log4js.getLogger('network'),
    };
  } catch (error) {
    throw new Error(`Ошибка создания логгировщика: ${error.message} `);
  }
};

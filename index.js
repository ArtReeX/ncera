const logger = require('./logger');
const network = require('./core/network');
const { cfgLog, cfgNetwork } = require('./config');

try {
  // создание логировщика
  const log = logger(cfgLog);
  log.app.debug('Логгировщик успешно создан.');

  // запуск нейронной сети
  log.app.info('Запуск основной части приложения.');
  network(cfgNetwork, log);
} catch (error) {
  console.log(`Ошибка запуска приложения: ${error.message} `);
}

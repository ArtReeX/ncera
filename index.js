const Brain = require('./core/brain');
const server = require('./server');
const logger = require('./logger');
const { cfgServer, cfgLog, cfgNetwork } = require('./config');

try {
  // создание логировщика
  const log = logger(cfgLog);
  log.app.debug('Логгировщик успешно создан.');

  // запуск нейронной сети
  const brain = new Brain(cfgNetwork, log);
  log.app.info('Нейронная сеть успешно создана.');

  // создание сервера
  server(brain, cfgServer.port, log);
  log.app.info(`Сервер успешно запущен на ${cfgServer.port} порту.`);
} catch (error) {
  console.log(`Ошибка запуска приложения: ${error.message} `);
}

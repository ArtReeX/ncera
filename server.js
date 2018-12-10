const express = require('express');
const { cfgServer } = require('./config');

const setHandlers = (app, network, log) => {
  app.get('/run', (req, res) => {
    try {
      log.server.trace(
        `Входящий запрос, параметры: ${JSON.stringify(req.query)}, данные: ${JSON.stringify(
          req.body,
        )}.`,
      );
      const result = network.run(
        req.query.currency,
        req.query.exchange,
        req.query.forecast,
        req.body,
      );
      log.server.info(`Результат нейронной сети: ${JSON.stringify(result)}.`);
      res.send(result);
    } catch (error) {
      log.server.error(`Ошибка нейронной сети: ${JSON.stringify(error.message)}.`);
      res.send(error.message);
    }
  });
};

module.exports = (network, port = cfgServer.port, log) => {
  try {
    const app = express();
    app.use(express.json());
    setHandlers(app, network, log);
    app.listen(port || process.env.PORT);
  } catch (error) {
    throw new Error(`Не удалось запустить сервер: ${error}`);
  }
};

const express = require('express');
const { cfgServer } = require('./config');

const setHandlers = (app, network, log) => {
  app.get('/run', (req, res) => {
    try {
      log.server.trace(`Входящий запрос: ${JSON.stringify(req.query)}.`);
      const result = network.run(
        req.query.currency,
        req.query.exchange,
        JSON.parse(req.query.chart),
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
    setHandlers(app, network, log);
    app.listen(port || process.env.PORT);
  } catch (error) {
    throw new Error(`Не удалось запустить сервер: ${error}`);
  }
};

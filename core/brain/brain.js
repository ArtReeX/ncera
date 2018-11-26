const brainjs = require('brain.js');
const { cfgNetwork } = require('../../config');
const snapshot = require('./snapshot');
const model = require('./model');
const utilities = require('../utilities');

// функция обучения нейронной сети на основе шаблонов
module.exports.train = (brain = brainjs, patterns, config = cfgNetwork) => {
  try {
    // создание хранилища нейронных сетей
    const brains = {};

    patterns
      .filter(({ pattern }) => pattern.length)
      .forEach(({ currency, pattern }) => {
        // создание нейронной сети
        const crossValidate = new brain.CrossValidate(brain.recurrent.LSTMTimeStep, config.brain);

        // запуск обучения нейронной сети для набора шаблонов каждой из бирж
        pattern.forEach((ptn) => {
          // запуск обучения нейронной сети
          crossValidate.train(
            ptn.pattern,
            Object.assign(config.training, {
              callback: () => {
                // межитерационное сохранение
                snapshot.save([{ currency, brain: crossValidate }], config);
              },
            }),
          );
        });

        // сохранение образа нейронной сети
        snapshot.save([{ currency, brain: crossValidate }], config);

        // добавление нейронной сети в хранилище
        brains[currency] = crossValidate.toNeuralNetwork();
      });
    return brains;
  } catch (error) {
    throw new Error(`Невозможно обучить нейронную сеть. ${error}`);
  }
};

// функция загрузки нейронной сети
module.exports.loadSnapshots = (brain = brainjs, config = cfgNetwork) => {
  try {
    // создание хранилища нейронных сетей
    const brains = {};

    snapshot.load(config).forEach(({ currency, data }) => {
      // создание нейронной сети
      const crossValidate = new brain.CrossValidate(brain.recurrent.LSTMTimeStep, config.brain);

      // загрузка образа в нейронную сеть
      const net = crossValidate.fromJSON(data);

      // добавление нейронной сети в хранилище
      brains[currency] = net;
    });

    return brains;
  } catch (error) {
    throw new Error(`Невозможно загрузить образы нейронной сети. ${error.message}`);
  }
};

// функция активации нейронной сети
module.exports.run = (brains, currency, exchange, config = cfgNetwork, chart) => {
  try {
    if (typeof brains[currency] !== 'undefined') {
      // получения ответа от нейронной сети
      return brains[currency]
        .forecast(
          model.standardizeColumns(exchange, chart).map(column => utilities.objectToArray(column)),
          config.pattern.output,
        )
        .map(column => utilities.arrayToObject(column));
    }
    throw new Error(`Нейронная сеть не обучена для валюты [${currency}].`);
  } catch (error) {
    throw new Error(`Не удалось активировать нейронную сеть [${currency}]. ${error.message}`);
  }
};

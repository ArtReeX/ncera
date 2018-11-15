const brainjs = require('brain.js');
const { cfgNetwork } = require('../config');
const snapshot = require('./snapshot');
const model = require('./model');
const utilities = require('./utilities');

// функция обучения нейронной сети на основе шаблонов
module.exports.train = (brain = brainjs, patterns, config = cfgNetwork) => {
  try {
    // создание хранилища нейронных сетей
    const brains = {};

    patterns
      .filter(({ pattern }) => pattern.length)
      .forEach(({ currency, pattern }) => {
        // создание нейронной сети
        const inputColumnSize = pattern[0].pattern[0].input[0].length;
        const outputColumnSize = pattern[0].pattern[0].input[0].length;
        const net = new brain.recurrent.LSTMTimeStep({
          inputSize: inputColumnSize,
          hiddenLayers: [config.pattern.input * inputColumnSize],
          outputSize: outputColumnSize,
          activation: config.brain.activation,
        });
        // запуск обучения нейронной сети для набора шаблонов каждой из бирж
        pattern.forEach((ptn) => {
          // запуск обучения нейронной сети
          net.train(
            ptn.pattern,
            Object.assign(config.training, {
              callback: () => {
                // межитерационное сохранение
                snapshot.save([{ currency, brain: net }], config);
              },
            }),
          );
        });

        // сохранение образа нейронной сети
        snapshot.save([{ currency, brain: net }], config);

        // добавление нейронной сети в хранилище
        brains[currency] = net;
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
      const net = new brain.recurrent.LSTMTimeStep(config.brain);

      // загрузка образа в нейронную сеть
      net.fromJSON(data);

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
    throw new Error(`Не удалось активировать нейронную сеть для валюты [${currency}]`);
  } catch (error) {
    throw new Error(`Не удалось активировать нейронную сеть [${currency}]. ${error.message}`);
  }
};

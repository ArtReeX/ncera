const brainjs = require('brain.js');
const { cfgNetwork } = require('../config');
const model = require('./model');
const pattern = require('./pattern');
const brain = require('./brain');

module.exports = (config = cfgNetwork, log) => {
  try {
    // считывание моделей графиков из папки для дальнейшего обучения нейронной сети
    const missingModels = model.getMissingModels(config);
    // отправка информации в лог
    log.network.info(
      `Найдено ${missingModels.length} новых моделей для обучения: ${JSON.stringify(
        missingModels.map(currency => currency.currency),
      )}.`,
    );

    // стандартизирование шаблонов под единый формат
    const standardizedModels = model.standardizeModels(missingModels, config);
    // отправка информации в лог
    log.network.info(
      `Было стандартизировано ${
        standardizedModels.length
      } новых моделей для обучения: ${JSON.stringify(
        standardizedModels.map(
          stockModel => `${stockModel.currency} - ${stockModel.stockCharts.map(chart => chart.exchange)}`,
        ),
      )}.`,
    );

    // создание шаблонов для обучения из стандартизированных моделей
    const patterns = pattern.create(standardizedModels, cfgNetwork);
    // отправка информации в лог
    log.network.info(
      `Создано следующее количество шаблонов для обучения: ${patterns.map(
        chart => `${chart.currency} - ${chart.pattern.map(
          ptn => `[${ptn.exchange} - ${ptn.pattern.length}]`,
        )}`,
      )}.`,
    );

    // загрузка образов нейронной сети
    const loadedBrains = brain.loadSnapshots(brainjs, config);
    // отправка информации в лог
    log.network.info(
      `Загружены образы следующих нейронных сетей: ${Object.keys(loadedBrains).map(key => key)}.`,
    );

    // обучение нейронной сети по шаблонам
    const trainedBrains = brain.train(brainjs, patterns, config);
    // отправка информации в лог
    log.network.info(
      `Обучены следующие нейронные сети: ${Object.keys(trainedBrains).map(key => key)}.`,
    );

    // объединение загруженных и обученных нейронных сетей
    const brains = Object.assign(loadedBrains, trainedBrains);
    // отправка информации в лог
    log.network.info(
      `Следующие нейронные сети готовы к работе: ${Object.keys(brains).map(key => key)}.`,
    );

    // логгирование информации потребляемых ресурсов
    log.app.debug(
      `Потребляемая приложением память: ${(process.memoryUsage().rss / 1048576).toFixed(1)} MB.`,
    );

    // активация нейронной сети
    const result = brain.run(brains, 'eos', 'poloniex', [
      {
        date: 1541217600,
        high: 5.37142104,
        low: 5.36630779,
        open: 5.36630779,
        close: 5.371,
        volume: 1494.97493355,
        quoteVolume: 278.32441745,
        weightedAverage: 5.37133948,
      },
      {
        date: 1541232000,
        high: 5.39552312,
        low: 5.34148553,
        open: 5.39552312,
        close: 5.34192341,
        volume: 1603.63503219,
        quoteVolume: 299.20501674,
        weightedAverage: 5.35965288,
      },
      {
        date: 1541246400,
        high: 5.37744185,
        low: 5.32510329,
        open: 5.36230494,
        close: 5.3357535,
        volume: 287.61105029,
        quoteVolume: 53.52032796,
        weightedAverage: 5.37386561,
      },
      {
        date: 1541260800,
        high: 5.35244368,
        low: 5.33199155,
        open: 5.35244368,
        close: 5.34265553,
        volume: 197.90709771,
        quoteVolume: 36.99859644,
        weightedAverage: 5.34904338,
      },
      {
        date: 1541275200,
        high: 5.36270578,
        low: 5.29548947,
        open: 5.33499177,
        close: 5.32021406,
        volume: 548.98270957,
        quoteVolume: 103.34624019,
        weightedAverage: 5.31207239,
      },
      {
        date: 1541289600,
        high: 5.32021434,
        low: 5.31,
        open: 5.32021434,
        close: 5.31000497,
        volume: 194.41544776,
        quoteVolume: 36.61269412,
        weightedAverage: 5.31005577,
      },
      {
        date: 1541304000,
        high: 5.50572809,
        low: 5.31,
        open: 5.31666813,
        close: 5.41019655,
        volume: 61216.74337171,
        quoteVolume: 11163.1518972,
        weightedAverage: 5.48382248,
      },
      {
        date: 1541318400,
        high: 5.46585636,
        low: 5.41019742,
        open: 5.42101714,
        close: 5.45417253,
        volume: 5141.96161465,
        quoteVolume: 941.27758051,
        weightedAverage: 5.46274735,
      },
      {
        date: 1541332800,
        high: 5.51537547,
        low: 5.42152378,
        open: 5.42152378,
        close: 5.51537546,
        volume: 12623.3502967,
        quoteVolume: 2314.71900512,
        weightedAverage: 5.45351304,
      },
      {
        date: 1541347200,
        high: 5.52000001,
        low: 5.4607642,
        open: 5.4607642,
        close: 5.52,
        volume: 1058.13013923,
        quoteVolume: 193.63068401,
        weightedAverage: 5.46468213,
      },
    ]);

    console.log(result);
  } catch (error) {
    throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
  }
};

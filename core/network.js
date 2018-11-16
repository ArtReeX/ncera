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
    const patterns = pattern.create(standardizedModels, config);
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
    const result1 = brain.run(brains, 'eos', 'poloniex', config, [
      {
        date: 1542225600,
        high: 0.00081671,
        low: 0.0008018,
        open: 0.0008025,
        close: 0.00081132,
        volume: 5.56746673,
        quoteVolume: 6887.35051335,
        weightedAverage: 0.00080836,
      },
      {
        date: 1542240000,
        high: 0.00081442,
        low: 0.0008045,
        open: 0.00080616,
        close: 0.00081442,
        volume: 3.45364408,
        quoteVolume: 4267.85776529,
        weightedAverage: 0.00080922,
      },
      {
        date: 1542254400,
        high: 0.00081819,
        low: 0.00080948,
        open: 0.00081442,
        close: 0.00081819,
        volume: 1.71651387,
        quoteVolume: 2110.92999171,
        weightedAverage: 0.00081315,
      },
      {
        date: 1542268800,
        high: 0.00081686,
        low: 0.00080055,
        open: 0.00081686,
        close: 0.00080982,
        volume: 6.21258229,
        quoteVolume: 7689.82110937,
        weightedAverage: 0.00080789,
      },
      {
        date: 1542283200,
        high: 0.00081589,
        low: 0.00079047,
        open: 0.00080675,
        close: 0.00081589,
        volume: 14.44058677,
        quoteVolume: 17974.4531547,
        weightedAverage: 0.00080339,
      },
      {
        date: 1542297600,
        high: 0.00083,
        low: 0.00080555,
        open: 0.00081081,
        close: 0.00082353,
        volume: 13.54090521,
        quoteVolume: 16492.61247147,
        weightedAverage: 0.00082102,
      },
      {
        date: 1542312000,
        high: 0.00083447,
        low: 0.00081743,
        open: 0.00082796,
        close: 0.0008305,
        volume: 4.7974479,
        quoteVolume: 5822.97515604,
        weightedAverage: 0.00082388,
      },
      {
        date: 1542326400,
        high: 0.00083482,
        low: 0.00082177,
        open: 0.00083043,
        close: 0.00082679,
        volume: 4.22893181,
        quoteVolume: 5088.71391435,
        weightedAverage: 0.00083104,
      },
      {
        date: 1542340800,
        high: 0.00082898,
        low: 0.0008225,
        open: 0.00082682,
        close: 0.00082794,
        volume: 1.52102827,
        quoteVolume: 1841.21404877,
        weightedAverage: 0.0008261,
      },
      {
        date: 1542355200,
        high: 0.00082794,
        low: 0.0008092,
        open: 0.00082794,
        close: 0.00082,
        volume: 3.11976256,
        quoteVolume: 3823.57725328,
        weightedAverage: 0.00081592,
      },
    ]);

    const result2 = brain.run(brains, 'eth', 'poloniex', config, [
      {
        date: 1542225600,
        high: 0.03190876,
        low: 0.03117824,
        open: 0.03163733,
        close: 0.03166001,
        volume: 95.04627006,
        quoteVolume: 3006.79376345,
        weightedAverage: 0.0316105,
      },
      {
        date: 1542240000,
        high: 0.0324,
        low: 0.03146178,
        open: 0.03165501,
        close: 0.03163,
        volume: 327.92329346,
        quoteVolume: 10246.09155397,
        weightedAverage: 0.03200472,
      },
      {
        date: 1542254400,
        high: 0.03189543,
        low: 0.03130631,
        open: 0.03161616,
        close: 0.03187,
        volume: 60.27916603,
        quoteVolume: 1912.10565049,
        weightedAverage: 0.03152501,
      },
      {
        date: 1542268800,
        high: 0.03198135,
        low: 0.03152003,
        open: 0.03187691,
        close: 0.03181,
        volume: 59.66132908,
        quoteVolume: 1878.23832509,
        weightedAverage: 0.03176451,
      },
      {
        date: 1542283200,
        high: 0.03212576,
        low: 0.03146259,
        open: 0.03181919,
        close: 0.03188075,
        volume: 194.11479019,
        quoteVolume: 6103.77762442,
        weightedAverage: 0.0318024,
      },
      {
        date: 1542297600,
        high: 0.0322693,
        low: 0.03179245,
        open: 0.03188075,
        close: 0.03224359,
        volume: 111.56821203,
        quoteVolume: 3486.63802846,
        weightedAverage: 0.03199879,
      },
      {
        date: 1542312000,
        high: 0.03225,
        low: 0.0317592,
        open: 0.03224359,
        close: 0.03204377,
        volume: 144.28062573,
        quoteVolume: 4510.19194302,
        weightedAverage: 0.0319899,
      },
      {
        date: 1542326400,
        high: 0.03210599,
        low: 0.03180052,
        open: 0.03202001,
        close: 0.031955,
        volume: 26.91377645,
        quoteVolume: 842.32488098,
        weightedAverage: 0.03195177,
      },
      {
        date: 1542340800,
        high: 0.03216485,
        low: 0.03184051,
        open: 0.03197501,
        close: 0.03212,
        volume: 29.46582694,
        quoteVolume: 921.70480375,
        weightedAverage: 0.03196883,
      },
      {
        date: 1542355200,
        high: 0.03213403,
        low: 0.03167586,
        open: 0.032125,
        close: 0.03189457,
        volume: 54.226548,
        quoteVolume: 1701.54789397,
        weightedAverage: 0.03186895,
      },
    ]);

    console.log(result1);
    console.log(result2);
  } catch (error) {
    throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
  }
};

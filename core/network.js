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
        date: 1492704000,
        high: 0.04035,
        low: 0.038443,
        open: 0.03918002,
        close: 0.03996921,
        volume: 4286.14773157,
        quoteVolume: 108785.52658658,
        weightedAverage: 0.03939998,
      },
      {
        date: 1492718400,
        high: 0.0403,
        low: 0.0395,
        open: 0.03996921,
        close: 0.03983678,
        volume: 1590.35169185,
        quoteVolume: 39878.69915971,
        weightedAverage: 0.03987972,
      },
      {
        date: 1492732800,
        high: 0.03986,
        low: 0.03917975,
        open: 0.03983678,
        close: 0.03944001,
        volume: 991.00251496,
        quoteVolume: 25095.26005205,
        weightedAverage: 0.03948962,
      },
      {
        date: 1492747200,
        high: 0.03965865,
        low: 0.039319,
        open: 0.03944001,
        close: 0.039395,
        volume: 476.73558478,
        quoteVolume: 12072.10975345,
        weightedAverage: 0.03949066,
      },
      {
        date: 1492761600,
        high: 0.039449,
        low: 0.03868213,
        open: 0.03937874,
        close: 0.03889143,
        volume: 2180.35868668,
        quoteVolume: 55840.44446698,
        weightedAverage: 0.03904622,
      },
      {
        date: 1492776000,
        high: 0.03955388,
        low: 0.03872121,
        open: 0.03889144,
        close: 0.0393313,
        volume: 2276.59622579,
        quoteVolume: 58104.00493647,
        weightedAverage: 0.03918139,
      },
      {
        date: 1492790400,
        high: 0.03941999,
        low: 0.03895,
        open: 0.0393313,
        close: 0.03919999,
        volume: 1320.86114587,
        quoteVolume: 33730.4446022,
        weightedAverage: 0.03915931,
      },
      {
        date: 1492804800,
        high: 0.0392,
        low: 0.03814,
        open: 0.03918553,
        close: 0.03863579,
        volume: 2962.4867402,
        quoteVolume: 76348.27705145,
        weightedAverage: 0.03880227,
      },
      {
        date: 1492819200,
        high: 0.03889991,
        low: 0.03845243,
        open: 0.0386371,
        close: 0.03878008,
        volume: 1657.40698498,
        quoteVolume: 42901.49518607,
        weightedAverage: 0.03863284,
      },
      {
        date: 1492833600,
        high: 0.0389263,
        low: 0.03864353,
        open: 0.03876001,
        close: 0.03886202,
        volume: 985.94116027,
        quoteVolume: 25401.96530477,
        weightedAverage: 0.03881357,
      },
    ]);

    console.log(result1);
    console.log(result2);
  } catch (error) {
    throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
  }
};

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
        date: 1542441600,
        high: 0.03158834,
        low: 0.03137398,
        open: 0.03154529,
        close: 0.03138413,
        volume: 23.86307418,
        quoteVolume: 757.21492459,
        weightedAverage: 0.03151426,
      },
      {
        date: 1542456000,
        high: 0.03150912,
        low: 0.03099554,
        open: 0.03139007,
        close: 0.03111348,
        volume: 303.1863682,
        quoteVolume: 9734.48585413,
        weightedAverage: 0.03114559,
      },
      {
        date: 1542470400,
        high: 0.03149,
        low: 0.0301,
        open: 0.03109543,
        close: 0.031305,
        volume: 386.97710901,
        quoteVolume: 12524.36712035,
        weightedAverage: 0.03089793,
      },
      {
        date: 1542484800,
        high: 0.0313901,
        low: 0.03127417,
        open: 0.03133271,
        close: 0.031294,
        volume: 17.56643214,
        quoteVolume: 560.65086584,
        weightedAverage: 0.03133221,
      },
      {
        date: 1542499200,
        high: 0.03153001,
        low: 0.03111201,
        open: 0.031294,
        close: 0.03148444,
        volume: 21.3087972,
        quoteVolume: 679.61221207,
        weightedAverage: 0.03135434,
      },
      {
        date: 1542513600,
        high: 0.03159534,
        low: 0.03143315,
        open: 0.03150754,
        close: 0.03145532,
        volume: 50.79525628,
        quoteVolume: 1610.94545086,
        weightedAverage: 0.03153133,
      },
      {
        date: 1542528000,
        high: 0.0316,
        low: 0.0313,
        open: 0.0314815,
        close: 0.03141501,
        volume: 43.53074027,
        quoteVolume: 1380.73116984,
        weightedAverage: 0.03152731,
      },
      {
        date: 1542542400,
        high: 0.03148352,
        low: 0.031355,
        open: 0.03141501,
        close: 0.031405,
        volume: 23.64473328,
        quoteVolume: 752.71677721,
        weightedAverage: 0.03141252,
      },
      {
        date: 1542556800,
        high: 0.03193,
        low: 0.03124353,
        open: 0.031405,
        close: 0.03163519,
        volume: 65.80736542,
        quoteVolume: 2082.48099319,
        weightedAverage: 0.03160046,
      },
      {
        date: 1542571200,
        high: 0.0316864,
        low: 0.031364,
        open: 0.03163519,
        close: 0.03144384,
        volume: 16.87552587,
        quoteVolume: 535.28187981,
        weightedAverage: 0.03152642,
      },
    ]);

    console.log(result1);
    console.log(result2);
  } catch (error) {
    throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
  }
};

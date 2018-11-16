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
        date: 1542196800,
        high: 5.24478677,
        low: 4.82983101,
        open: 5.21994155,
        close: 4.94267476,
        volume: 123001.51264426,
        quoteVolume: 24697.9920042,
        weightedAverage: 4.98022319,
      },
      {
        date: 1542211200,
        high: 4.93921556,
        low: 4.5,
        open: 4.87252232,
        close: 4.66297842,
        volume: 201382.17797751,
        quoteVolume: 43109.99957733,
        weightedAverage: 4.67135652,
      },
      {
        date: 1542225600,
        high: 4.82500847,
        low: 4.58317372,
        open: 4.66969,
        close: 4.76949188,
        volume: 60534.49213811,
        quoteVolume: 12907.79884839,
        weightedAverage: 4.68976103,
      },
      {
        date: 1542240000,
        high: 4.8219769,
        low: 4.61073739,
        open: 4.76949191,
        close: 4.68359899,
        volume: 6221.69853426,
        quoteVolume: 1310.80718006,
        weightedAverage: 4.74646357,
      },
      {
        date: 1542254400,
        high: 4.69887285,
        low: 4.57500003,
        open: 4.68817328,
        close: 4.68949405,
        volume: 7415.57185732,
        quoteVolume: 1596.80409677,
        weightedAverage: 4.64400853,
      },
      {
        date: 1542268800,
        high: 4.71399111,
        low: 4.50000003,
        open: 4.68667437,
        close: 4.53159171,
        volume: 45017.7806672,
        quoteVolume: 9956.13905788,
        weightedAverage: 4.52161027,
      },
      {
        date: 1542283200,
        high: 4.61441317,
        low: 4.29254171,
        open: 4.53158295,
        close: 4.59135157,
        volume: 90115.55752789,
        quoteVolume: 20246.67906377,
        weightedAverage: 4.45088091,
      },
      {
        date: 1542297600,
        high: 4.75,
        low: 4.55000004,
        open: 4.59135157,
        close: 4.70107,
        volume: 94111.37277766,
        quoteVolume: 20124.69089265,
        weightedAverage: 4.67641333,
      },
      {
        date: 1542312000,
        high: 4.78240878,
        low: 4.63504954,
        open: 4.70683,
        close: 4.78240878,
        volume: 25195.52541187,
        quoteVolume: 5341.20072432,
        weightedAverage: 4.7172025,
      },
      {
        date: 1542326400,
        high: 4.80064,
        low: 4.72235301,
        open: 4.72235301,
        close: 4.79477976,
        volume: 2568.81299768,
        quoteVolume: 536.3445076,
        weightedAverage: 4.78948317,
      },
    ]);

    const result2 = brain.run(brains, 'eth', 'poloniex', config, [
      {
        date: 1542211200,
        high: 194.46126729,
        low: 175.72908945,
        open: 191.48341715,
        close: 184.17433028,
        volume: 2669600.2895258,
        quoteVolume: 14351.19329289,
        weightedAverage: 186.01939469,
      },
      {
        date: 1542225600,
        high: 187.81640668,
        low: 176.9,
        open: 185.35999999,
        close: 187.76640658,
        volume: 655039.87530809,
        quoteVolume: 3579.11672671,
        weightedAverage: 183.01718701,
      },
      {
        date: 1542240000,
        high: 190.200001,
        low: 179.39330004,
        open: 187.76640658,
        close: 182.1887,
        volume: 364374.6847582,
        quoteVolume: 1962.31300566,
        weightedAverage: 185.68632206,
      },
      {
        date: 1542254400,
        high: 184.36409993,
        low: 177.32214033,
        open: 182.07435,
        close: 182.61876216,
        volume: 95632.59346575,
        quoteVolume: 530.21503907,
        weightedAverage: 180.36567509,
      },
      {
        date: 1542268800,
        high: 184.45062,
        low: 174.45888851,
        open: 184.02944992,
        close: 178.1828841,
        volume: 418925.84225483,
        quoteVolume: 2364.91877499,
        weightedAverage: 177.14174655,
      },
      {
        date: 1542283200,
        high: 182.05989446,
        low: 171.48445122,
        open: 178.89995974,
        close: 181.25031001,
        volume: 488965.96108924,
        quoteVolume: 2766.01100068,
        weightedAverage: 176.7765786,
      },
      {
        date: 1542297600,
        high: 184.92565934,
        low: 177.5,
        open: 180.30290657,
        close: 184.3304999,
        volume: 385946.36065074,
        quoteVolume: 2137.19606732,
        weightedAverage: 180.58537845,
      },
      {
        date: 1542312000,
        high: 184.71595999,
        low: 179.58909929,
        open: 184.32889998,
        close: 184.71595999,
        volume: 60928.81379464,
        quoteVolume: 335.25283137,
        weightedAverage: 181.73989327,
      },
      {
        date: 1542326400,
        high: 184.89,
        low: 180.74000006,
        open: 183.67459017,
        close: 183.54029,
        volume: 38396.37779238,
        quoteVolume: 210.14971667,
        weightedAverage: 182.70963387,
      },
      {
        date: 1542340800,
        high: 183.29603999,
        low: 181.77992971,
        open: 183.29603999,
        close: 182,
        volume: 15381.77584071,
        quoteVolume: 84.47395514,
        weightedAverage: 182.08897423,
      },
    ]);

    console.log(result1);
    console.log(result2);
  } catch (error) {
    throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
  }
};

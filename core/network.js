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
    const result = brain.run(brains, 'eos', 'poloniex', config, [
      {
        date: 1542168000,
        high: 5.32565599,
        low: 5.29494921,
        open: 5.29494921,
        close: 5.30035287,
        volume: 455.42294267,
        quoteVolume: 85.73082899,
        weightedAverage: 5.31224237,
      },
      {
        date: 1542182400,
        high: 5.32282555,
        low: 5.17428127,
        open: 5.31598035,
        close: 5.21,
        volume: 59246.46142576,
        quoteVolume: 11273.49309473,
        weightedAverage: 5.25537745,
      },
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
        close: 4.64303425,
        volume: 92344.63656454,
        quoteVolume: 19745.19885154,
        weightedAverage: 4.67681471,
      },
    ]);

    console.log(result);
  } catch (error) {
    throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
  }
};

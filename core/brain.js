const brainjs = require('brain.js');
const { cfgNetwork } = require('../config');
const model = require('./brain/model');
const pattern = require('./brain/pattern');
const brain = require('./brain/brain');

module.exports = class Brain {
  constructor(config = cfgNetwork, log) {
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

      // определение переменных
      this.brains = brains;
      this.config = config;
      this.log = log;
    } catch (error) {
      throw new Error(`Невозможно произвести инициализацию нейронной сети. ${error.message}`);
    }
  }

  run(currency, exchange, chart) {
    // активация нейронной сети
    return brain.run(this.brains, currency, exchange, this.config, chart);
  }
};

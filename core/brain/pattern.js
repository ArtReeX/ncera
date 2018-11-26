const utilities = require('../utilities');
const { cfgNetwork } = require('../../config');

// функция создания шаблонов из стандартизированных моделей
module.exports.create = (models, config = cfgNetwork) => {
  try {
    // обработка каждой модели
    return models
      .filter(model => model.stockCharts.length)
      .map(({ currency, stockCharts }) => ({
        currency,
        pattern: stockCharts.map(({ exchange, columns }) => {
          const pattern = [];
          for (
            let count = 0;
            count + config.pattern.input + config.pattern.output < columns.length;
            count += 1
          ) {
            pattern.push({
              input: columns
                .slice(count, count + config.pattern.input)
                .map(column => utilities.objectToArray(column)),
              output: columns
                .slice(
                  count + config.pattern.input,
                  count + config.pattern.input + config.pattern.output,
                )
                .map(column => utilities.objectToArray(column)),
            });
          }
          return { exchange, pattern };
        }),
      }));
  } catch (error) {
    throw new Error(`Невозможно создать шаблоны из стандартизированных шаблонов. ${error.message}`);
  }
};

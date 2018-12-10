const utilities = require('../utilities');

// функция создания шаблонов из стандартизированных моделей
module.exports.create = (models) => {
  try {
    // обработка каждой модели
    return models
      .filter(model => model.stockCharts.length)
      .map(({ currency, stockCharts }) => ({
        currency,
        pattern: stockCharts.map(({ exchange, columns }) => ({
          exchange,
          pattern: columns.map(column => utilities.objectToArray(column)),
        })),
      }));
  } catch (error) {
    throw new Error(`Невозможно создать шаблоны из стандартизированных шаблонов. ${error.message}`);
  }
};

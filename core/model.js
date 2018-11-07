const fsPath = require('path');
const { cfgNetwork } = require('../config');
const utilities = require('./utilities');

// функция считывание моделей графиков для обучений нейронной сети
module.exports.getMissingModels = (config = cfgNetwork) => {
  try {
    // считывание имён файлов моделей графиков
    const modelFileNames = utilities.readNamesFromFolder(config.model.path, config.model.extension);

    // считывание существующих образов нейронных сетей
    const snapshotFileNames = utilities.readNamesFromFolder(
      config.snapshot.path,
      config.snapshot.extension,
    );

    // определение новых моделей графиков
    const missingModelFileNames = modelFileNames.filter((filename) => {
      if (
        snapshotFileNames
          .map(
            name => fsPath.basename(name).replace(fsPath.extname(name), '') + config.model.extension,
          )
          .indexOf(filename) !== -1
      ) {
        return false;
      }
      return true;
    });

    // получение содержимого моделей графиков
    return missingModelFileNames.map(filename => ({
      currency: fsPath.basename(filename).replace(fsPath.extname(filename), ''),
      stockCharts: JSON.parse(utilities.readFromFile(`${config.model.path}/${filename}`, false)),
    }));
  } catch (error) {
    throw new Error(`Невозможно считать шаблоны для обучения нейронной сети. ${error.message}`);
  }
};

// функция стандартизирования моделей под единый формат
module.exports.standardizeModels = (models, config = cfgNetwork) => {
  try {
    // создание шаблона из каждой модели
    return models.map(model => ({
      currency: model.currency,
      stockCharts: model.stockCharts
        .filter((chart) => {
          if (['poloniex', 'exmo'].indexOf(chart[config.model.key.exchange]) !== -1) {
            return true;
          }
          return false;
        })
        .map(chart => ({
          exchange: chart[config.model.key.exchange],
          columns: this.standardizeColumns(
            chart[config.model.key.exchange],
            chart[config.model.key.columns],
          ),
        })),
    }));
  } catch (error) {
    throw new Error(`Невозможно произвести стандартизирование моделей. ${error.message}`);
  }
};

// функция стандартизирования данных диаграммы одной биржи под единый стандарт
module.exports.standardizeColumns = (exchange, columns) => {
  try {
    switch (exchange) {
      case 'poloniex':
        return columns.map(column => ({
          high: column.high.toFixed(3),
          low: column.low.toFixed(3),
          open: column.open.toFixed(3),
          close: column.close.toFixed(3),
          weightedAverage: column.weightedAverage.toFixed(3),
        }));
      case 'exmo':
        return columns.map(column => ({
          high: column.high.toFixed(3),
          low: column.low.toFixed(3),
          open: column.open.toFixed(3),
          close: column.close.toFixed(3),
          weightedAverage: column.weightedAverage.toFixed(3),
        }));
      default:
        return [];
    }
  } catch (error) {
    throw new Error(
      `Невозможно стандартизировать данные диаграммы для биржи ${exchange}. ${error.message}`,
    );
  }
};

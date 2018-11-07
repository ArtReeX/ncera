const { cfgNetwork } = require('../config');
const utilities = require('./utilities');

// функция сохранения образов нейронной сети
module.exports.save = (brains, config = cfgNetwork) => {
  try {
    brains.forEach(({ currency, brain }) => {
      const path = `${config.snapshot.path}/${currency + config.snapshot.extension}`;
      utilities.writeToFile(path, JSON.stringify(brain.toJSON()), true);
    });
  } catch (error) {
    throw new Error(`Невозможно сохранить образы нейронной сети. ${error.message}`);
  }
};

// функция загрузки образов нейронной сети
module.exports.load = (config = cfgNetwork) => {
  try {
    // считывание существующих образов нейронных сетей
    const snapshotFileNames = utilities.readNamesFromFolder(
      config.snapshot.path,
      config.snapshot.extension,
    );

    // получение содержимого моделей графиков
    return snapshotFileNames.map(filename => ({
      currency: filename.split('.').shift(),
      data: JSON.parse(utilities.readFromFile(`${config.snapshot.path}/${filename}`, false)),
    }));
  } catch (error) {
    throw new Error(`Невозможно загрузить образы нейронной сети. ${error.message}`);
  }
};

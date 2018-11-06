const utilities = require('../core/utilities');
const model = require('../core/model');
const testData = require('./data/model');

// проверка работы с моделями нейронной сети
describe('model', () => {
  // проверка функции считывания моделей
  it('getMissingModels', ({ filenames, config, input } = testData.getMissingModels) => {
    // запись моделей
    utilities.writeToFile(
      `${config.model.path}/${filenames.eos}${config.model.extension}`,
      JSON.stringify(input.eos),
      true,
    );
    utilities.writeToFile(
      `${config.model.path}/${filenames.eth}${config.model.extension}`,
      JSON.stringify(input.eth),
      true,
    );
    utilities.writeToFile(
      `${config.model.path}/${filenames.xrp + config.model.extension}`,
      JSON.stringify(input.xrp),
      true,
    );

    // запись образов
    utilities.writeToFile(
      `${config.snapshot.path}/${filenames.eos + config.snapshot.extension}`,
      JSON.stringify(input.eos),
      true,
    );

    // получение новых моделей
    expect(model.getMissingModels(config)).toEqual([
      { currency: filenames.eth, stockCharts: input.eth },
      { currency: filenames.xrp, stockCharts: input.xrp },
    ]);

    // удаление файлов
    utilities.deleteFile(`${config.model.path}/${filenames.xrp + config.model.extension}`);
    utilities.deleteFile(`${config.model.path}/${filenames.eth + config.model.extension}`);
    utilities.deleteFile(`${config.model.path}/${filenames.eos + config.model.extension}`);
    utilities.deleteFile(`${config.snapshot.path}/${filenames.eos + config.snapshot.extension}`);
  });

  // проверка функции стандартизирования моделей под единый формат
  it('standardizeModels', ({ config, input, output } = testData.standardizeModels) => {
    // запрос преобразования моделей в шаблоны
    expect(model.standardizeModels(input, config)).toEqual(output);
  });

  // проверка функции стандартизирования данных одной биржи под единый формат
  it('standardizeColumns', ({ input, output } = testData.standardizeColumns) => {
    // запрос стандартизации данных каждой диаграммы
    Object.keys(input).forEach((key) => {
      expect(model.standardizeColumns(key, input[key])).toEqual(output[key]);
    });
  });
});

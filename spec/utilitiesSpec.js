const utilities = require('../core/utilities');
const testData = require('./data/utilities');

// проверка утилит для работы с файлами
describe('files', () => {
  // проверка функций записи, существования, чтения
  it('writeToFile/checkExistenceFile/readFromFile/deleteFile', ({ path, data } = testData.wcrd) => {
    // запись в файл
    expect(() => {
      utilities.writeToFile(path, JSON.stringify(data), true);
    }).not.toThrowError();

    // проверка существования файла
    expect(utilities.checkFileExistence(path)).toBeTruthy();

    // чтение с файла
    expect(JSON.parse(utilities.readFromFile(path, false))).toEqual(data);

    // удаление файла
    expect(() => {
      utilities.deleteFile(path);
    }).not.toThrowError();
  });

  // проверка функций чтения имён файлов с папки
  it('readNamesFromFolder', () => {
    const { path, filenames } = testData.readNamesFromFolder;

    // создание файлов
    expect(() => {
      utilities.writeToFile(`${path}/${filenames.one}`, null, true);
      utilities.writeToFile(`${path}/${filenames.two}`, null, true);
      utilities.writeToFile(`${path}/${filenames.three}`, null, true);
    }).not.toThrowError();

    // проверка имён файлов
    expect(utilities.readNamesFromFolder(path, '.temp')).toEqual([filenames.one, filenames.two]);

    // удаление файлов
    expect(() => {
      utilities.deleteFile(`${path}/${filenames.one}`);
      utilities.deleteFile(`${path}/${filenames.two}`);
      utilities.deleteFile(`${path}/${filenames.three}`);
    }).not.toThrowError();
  });
});

// проверка утилит работы с объектами
describe('objects', () => {
  // проверка функции преобразования объекта в массив
  it('objectToArray', ({ input, output } = testData.objectToArray) => {
    // запрос преобразования
    expect(utilities.objectToArray(input)).toEqual(output);
  });
  // проверка функции преобразования массива в объект
  it('arrayToOject', ({ input, output } = testData.arrayToObject) => {
    // запрос преобразования
    expect(utilities.arrayToObject(input)).toEqual(output);
  });
});

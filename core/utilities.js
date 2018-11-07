const fs = require('fs');
const fsPath = require('path');

// функция чтения с файла
module.exports.readFromFile = (path, autoCreate) => {
  try {
    if (!fs.existsSync(path) && autoCreate) {
      fs.writeFileSync(path, '', { encoding: 'utf8' });
    }
    return fs.readFileSync(path, { encoding: 'utf8' });
  } catch (error) {
    throw new Error(`Невозможно прочитать данные с файла [${path}]. ${error.message}`);
  }
};

// функция записи в файл
module.exports.writeToFile = (path, data, overwrite) => {
  try {
    // проверка существования директории
    if (!fs.existsSync(fsPath.dirname(path))) {
      fs.mkdirSync(fsPath.dirname(path));
    }
    // запись в файл
    fs.writeFileSync(path, data, { flag: overwrite ? 'w' : 'a', encoding: 'utf8' });
  } catch (error) {
    throw new Error(`Невозможно записать данные в файл [${path}]. ${error.message}`);
  }
};

// функция проверки существования файла
module.exports.checkFileExistence = (path) => {
  try {
    return fs.existsSync(path);
  } catch (error) {
    throw new Error(`Невозможно проверить существование файла [${path}]. ${error.message}`);
  }
};

// функция удаления файла
module.exports.deleteFile = (path) => {
  try {
    // удаление файла
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (error) {
    throw new Error(`Невозможно удалить файл [${path}]. ${error.message}`);
  }
};

// функция считывания списка файлов директории
module.exports.readNamesFromFolder = (path, extension) => {
  try {
    // проверка существования директории
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    // считывание имён файлов
    const files = fs.readdirSync(path, 'utf8');
    // выбор файлов соответствующих раcширению
    return files.filter((name) => {
      if (fsPath.extname(name) === extension) {
        return true;
      }
      return false;
    });
  } catch (error) {
    throw new Error(`Невозможно получить список файлов директории [${path}]. ${error.message}`);
  }
};

// функция преобразования объекта в массив
module.exports.objectToArray = (object) => {
  try {
    return Object.keys(object).map(key => object[key]);
  } catch (error) {
    throw new Error(`Невозможно преобразовать объект в массив. ${error.message}`);
  }
};

// функция преобразования массива в объект
module.exports.arrayToObject = (array) => {
  try {
    return array.map(column => ({
      high: column[0],
      low: column[1],
      open: column[2],
      close: column[3],
      weightedAverage: column[4],
    }));
  } catch (error) {
    throw new Error(`Невозможно преобразовать объект в массив. ${error.message}`);
  }
};

const logger = require('../logger');
const testData = require('./data/logger');

// проверка логгировщика
describe('logger', () => {
  // проверка создание логгировщика с текущей конфигурацией
  it('create', ({ config } = testData.create) => {
    expect(() => {
      logger(config);
    }).not.toThrowError();
  });
});

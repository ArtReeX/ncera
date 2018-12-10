const pattern = require('../core/brain/pattern');
const testData = require('./data/pattern');

// проверка работы с шаблонами нейронной сети
describe('pattern', () => {
  // проверка функции создания шаблонов обучения из стандартизированных моделей
  it('create', ({ input, output } = testData.create) => {
    // запрос создания шаблонов обучения
    expect(pattern.create(input)).toEqual(output);
  });
});

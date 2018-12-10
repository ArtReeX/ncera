# NCERA

Neural Currency Exchange Rate Analyzer.

# Для юзеров:

Установка: "npm install --production"
Запуск приложения "npm start".

# Для разработчиков:

Установка: "npm install"
Запуск тестирования: "npm test".
Запуск приложения "npm start".

# Пример запроса:

http://localhost:8080/run?currency=eos&exchange=poloniex&forecast=1

# Описание параметров: "currency" - валюта, "exchange" - биржа, "forecast" - количество столбцов для предсказания.

# Тело запроса:

[{"date":1542225600,"high":0.00081671,"low":0.0008018,"open":0.0008025,"close":0.00081132,"volume":5.56746673,"quoteVolume":6887.35051335,"weightedAverage":0.00080836},{"date":1542240000,"high":0.00081442,"low":0.0008045,"open":0.00080616,"close":0.00081442,"volume":3.45364408,"quoteVolume":4267.85776529,"weightedAverage":0.00080922},{"date":1542254400,"high":0.00081819,"low":0.00080948,"open":0.00081442,"close":0.00081819,"volume":1.71651387,"quoteVolume":2110.92999171,"weightedAverage":0.00081315},{"date":1542268800,"high":0.00081686,"low":0.00080055,"open":0.00081686,"close":0.00080982,"volume":6.21258229,"quoteVolume":7689.82110937,"weightedAverage":0.00080789},{"date":1542283200,"high":0.00081589,"low":0.00079047,"open":0.00080675,"close":0.00081589,"volume":14.44058677,"quoteVolume":17974.4531547,"weightedAverage":0.00080339},{"date":1542297600,"high":0.00083,"low":0.00080555,"open":0.00081081,"close":0.00082353,"volume":13.54090521,"quoteVolume":16492.61247147,"weightedAverage":0.00082102},{"date":1542312000,"high":0.00083447,"low":0.00081743,"open":0.00082796,"close":0.0008305,"volume":4.7974479,"quoteVolume":5822.97515604,"weightedAverage":0.00082388},{"date":1542326400,"high":0.00083482,"low":0.00082177,"open":0.00083043,"close":0.00082679,"volume":4.22893181,"quoteVolume":5088.71391435,"weightedAverage":0.00083104},{"date":1542340800,"high":0.00082898,"low":0.0008225,"open":0.00082682,"close":0.00082794,"volume":1.52102827,"quoteVolume":1841.21404877,"weightedAverage":0.0008261},{"date":1542355200,"high":0.00082794,"low":0.0008092,"open":0.00082794,"close":0.00082,"volume":3.11976256,"quoteVolume":3823.57725328,"weightedAverage":0.00081592}]

# Описание тела: необходимо отправить в массиве N-столбцов по графику для указанной валюты и указанной биржи.

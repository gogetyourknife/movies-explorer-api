require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const crash = require('./middlewares/crash-test');
const { devDatabase } = require('./middlewares/mongoose');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DATABASE_PROD } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DATABASE_PROD : devDatabase, {
  useNewUrlParser: true,
});

app.use(cors);

app.use(requestLogger);
app.use(limiter);

app.get(crash);
app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.use(errors());

app.listen(PORT);

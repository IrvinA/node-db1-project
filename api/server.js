const express = require('express');

const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' });
});

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

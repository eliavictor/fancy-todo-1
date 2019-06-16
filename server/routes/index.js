const express = require('express');
const Router = express.Router();
const todoRoutes = require('./todo');
const userRoutes = require('./user');

// Resource routes
Router.use('/users', userRoutes);
Router.use('/todos', todoRoutes);

module.exports = Router;
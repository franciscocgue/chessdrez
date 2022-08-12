import { Application } from "express";

const mockResponse = require('./mockResponse');

module.exports = (app: Application) => {
    app.use('/', mockResponse)
};
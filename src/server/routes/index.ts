import { Application } from "express";

const mockResponse = require('./mockResponse');
const games = require('./games')

module.exports = (app: Application) => {
    app.use('/', mockResponse)
    app.use('/games/', games)
};
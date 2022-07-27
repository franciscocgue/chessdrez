const mockResponse = require('./mockResponse');

module.exports = (app) => {
    app.use('/', mockResponse)
};
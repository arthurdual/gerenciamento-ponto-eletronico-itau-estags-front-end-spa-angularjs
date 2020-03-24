var http = require('http'), app = require('./config/express');
http.createServer(app).listen(5000, function () {
    console.log('Servidor escutando na porta: ' + this.address().port + ' URL: http://localhost:' + this.address().port + '/home');
});
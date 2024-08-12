
const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 8080


const server = http.createServer(
    {
        key:    fs.readFileSync('keys/privatekey.pem'),
        cert:   fs.readFileSync('keys/certificate.pem')
    },app);

server.listen(port)
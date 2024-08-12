
const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Issues = require('./models/issues')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
        server: { sslCA: cert }};
const connstring = 'mongodb+srv://cucamonga:Ir0nmansucks@cluster0.unqm1cv.mongodb.net/?retryWrites=true&w=majority'

const issueRoutes = require("./routes/issues");
const userRoutes = require("./routes/user");

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('Not Connected :-(')
},options);

app.use(express.json())

app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(urlprefix+'/issues', issueRoutes)
app.use(urlprefix+'/users', userRoutes)

module.exports = app;
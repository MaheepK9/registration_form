const express = require('express');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const mongoURI = require('./util/config').mongoURI;

const app = express();
const port = process.env.PORT || 8080;

app.use(json());

app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    res.status(status).json({
        message: error.message
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'invalid route'
    });
});

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port);
        console.log(`Server running at port ${port}`);
    })
    .catch(err => {
        console.log(err);
    });
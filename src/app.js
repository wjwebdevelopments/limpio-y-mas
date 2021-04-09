const colors = require('colors');
const express = require('express');
const server = require('./www');

const app = server(express());
const database = require('./database');

app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${colors.green(process.env.PORT)}`);
    database()
        .then(console.log)
        .catch(console.log);
});

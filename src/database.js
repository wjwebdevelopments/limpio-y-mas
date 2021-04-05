const mongoose = require('mongoose');
const colors = require('colors');

const databaseConnection = async () => {

    // Starting connect to mongodb
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Extracting database information
    const { port, name, host } = db.connections[0];

    // Return connection message
    return `Database connected to ${ colors.green('mongodb:'+host+':'+port+'/'+name) }`;
}

module.exports = databaseConnection;

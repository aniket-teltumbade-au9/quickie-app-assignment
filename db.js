const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect(process.env.MONGODB_HOST)
    mongoose.connection.on('connected', () => {
        console.log('Database Connected...')
    })
    mongoose.connection.on('error', (err) => {
        console.log(err);
    })
    mongoose.connection.on('close', () => {
        console.log('Db connection close unexpectedly')
    })
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Mongodb: Abort");
            process.exit(0)
        });
    });
}
//importing components for use
const { connect, connection } = require('mongoose');
const { config } = require('dotenv'); 

//exporting the mongoose information
module.exports = () => {
 config(); 
 const uri = process.env.MONGODB_URI;
 
//setting up the mongoose connection from the .env file
 connect(uri, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            console.log('Connection estabislished with MongoDB');
        })
        .catch(error => console.error(error.message));
    }

    //letting you know it's connected
    connection.on('connected', () => {
        console.log('Mongoose connected to DB Cluster');
    })

    //if there's an error
    connection.on('error', (error) => {
        console.error(error.message);
    })

    //disconnection message
    connection.on('disconnected', () => {
        console.log('Mongoose Disconnected');
    })

    process.on('SIGINT', () => {
        connection.close(() => {
            console.log('Mongoose connection closed on Application Timeout');
            process.exit(0);
        })
    })

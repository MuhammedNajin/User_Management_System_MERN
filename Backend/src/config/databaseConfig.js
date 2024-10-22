const mongoose = require('mongoose');
require('dotenv').config()

async function connectDatabase() {
    const port = process.env.DB_PORT;
   const connect = await mongoose.connect(port);
   console.log('db connected', connect.connection.port)
}

module.exports = {
      connectDatabase
}


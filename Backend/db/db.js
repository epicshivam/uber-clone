const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("DB connected...")
    } catch (error) {
        console.error("DB connection error", error);
    }
}
module.exports = connectToDb;
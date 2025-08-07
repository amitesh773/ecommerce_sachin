const mongoose = require('mongoose');
require('dotenv').config()

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
}
//hiiiiiiii
module.exports = main;
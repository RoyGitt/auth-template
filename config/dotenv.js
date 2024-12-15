require("dotenv").config();

const PORT = process.env.PORT || 3000;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, MONGO_CONNECTION_STRING, JWT_SECRET };

const mongoose = require('mongoose')
const Todo = require('./models/Todo')

const MONGO_URL=process.env.MONGO_URL || undefined;

if (MONGO_URL && !mongoose.connection.readyState) {
	mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	console.log("Connected to mongodb")
}


module.exports = {
  Todo
}

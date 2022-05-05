const mongoose = require('mongoose');

const URL = "mongodb://localhost:27017/schedule";
const DB = "schedule";

mongoose.Promise = global.Promise;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database " + DB))
    .catch(err => console.log(err))
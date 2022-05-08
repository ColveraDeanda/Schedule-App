var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    title: String,
    description: String,
    category: String,
    day: Number,
    month: String,
    year: Number
});

module.exports = mongoose.model('Task', TaskSchema);
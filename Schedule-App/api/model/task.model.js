var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    title: String,
    description: String,
    category: String,
    day: Number,
    month: String
});

module.exports = mongoose.model('Task', TaskSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name : String,
    description: String,
    imp_tec: String
});

module.exports = mongoose.model('task', taskSchema, 'tasks');
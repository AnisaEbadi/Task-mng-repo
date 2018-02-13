const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name : String,
    description: String,
    imp_tec: String,
    user_id: String
    //users : [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('task', taskSchema, 'tasks');
//var user = mongoose.model('user', taskSchema, 'users');
//const Task = module.exports = mongoose.model('task', taskSchema, 'tasks');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: String,
    description: String,
    status: String,
    duedate: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true});

const Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos
const mongoose = require('mongoose');

// creating Schema
const userSchema = new mongoose.Schema({

    task: {
        type:String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    date:{
        type:String,
        default:"",
    },
    CompletionDate:{
        type:String,
        default:"",
    }

})

// creating collection (collection means table)
const Task = mongoose.model('task', userSchema);    

module.exports = Task;
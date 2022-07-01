const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    username:{
        type: 'string',
        require: true
    },
    description:{
        type: 'string',
        require: true
    },
    duration:{
        type: 'number',
        require: true
    },
    date:{
        type: 'string'
    }
})

module.exports = mongoose.model('Excercise',schema)
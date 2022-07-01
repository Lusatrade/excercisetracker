const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    username:{
        type: 'string',
        require: true
    }
})

module.exports = mongoose.model('User',schema)
const mongoose = require('mongoose')

const issueschema = mongoose.Schema(
    {
        id: {type: String, required:true},
        post: {type: String, required:true}
    }
)

module.exports = mongoose.model('Issues', issueschema)
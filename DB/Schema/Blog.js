const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    title: {
        type: String,

    },
    content: {
        type: String,

    }
    ,
    category: {
        type: String,
  
    },
    category_id: {
        type: String,
    
    }
}, {
    timestamps: true
})

const Blog = new mongoose.model('Blog', Post)
module.exports = { Blog }
var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    name: {type: String},
    alias: String, 
    image: {type: String},
    description: {type: String},
    
    tags: [{name: String, class: String}],
    imageSliders: [{type: String}],
    relatedBlogs : [{name: String, link: String}],
    createAt: {type: Date},
    updatedAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);





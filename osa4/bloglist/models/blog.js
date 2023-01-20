const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: String,
        url: {
            type: String,
            required: true
        },
        likes: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            transform: (doc, result) => {
                result.id = result._id.toString();
                delete result._id;
                delete result.__v;
            }
        }
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        name: String,
        password: String,
        blogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog'
            }
        ]
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            }
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
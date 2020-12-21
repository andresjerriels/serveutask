const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
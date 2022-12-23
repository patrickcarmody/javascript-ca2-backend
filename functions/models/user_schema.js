const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
    {
        username: {
            type: String,
            required: [true, 'Username required'],
        },
        email: {
            type: String,
            required: [true, 'Email address required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password required'],
        }
    },
    { timestamps: true }
);

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

module.exports = model('User', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstName: {
            type: String,
            required: true,
            default: ''
        },
        lastName: {
            type: String,
            required: true,
            default: ''
        },
        picture: {
            type: String,
            default: ''
        },
    },
    address: {
        city: String,
        province: String,
        country: String,
        street: String,
        postal: String
    },
    history: [{
        date: Date,
        paid: {
            type: Number,
            default: 0
        },
        // item:{type: Schema.Types.ObjectId, ref:''}
    }]
});


// hash password

UserSchema.pre('save', function (next) { //this = user
    
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) throw next(err);
            this.password = hash;
            next();
        })
    })
})

// compare password
UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSynch(password,this.password)
}




module.exports = User = mongoose.model('users', UserSchema);    
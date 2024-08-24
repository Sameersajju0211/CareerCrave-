const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isMentor: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        default: []
    },
    availability: {
        start: {
            type: Date,
            default: ''
        },
        end: {
            type: Date,
            default: ''
        }
    },
    bookedSlots: [{
        studentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        start: Date,
        end: Date,
      }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    student_no: { type: Number, required: true, unique: true },
    phone_no: { type: Number, required: true, unique: true },
    branch: { type: String, required: true },
    section: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
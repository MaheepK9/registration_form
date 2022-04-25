const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        return next(error);
    }
    let user;
    const email = req.body.email;
    user = await User.findOne({ email }).exec().catch(err => next(err));
    if (user) {
        const error = new Error('email already registered');
        error.statusCode = 422;
        return next(error);
    }
    const student_no = req.body.student_no;
    user = await User.findOne({ student_no }).exec().catch(err => next(err));
    if (user) {
        const error = new Error('student number already registered');
        error.statusCode = 422;
        return next(error);
    }
    if (student_no <= 2100000 || student_no >= 2199999) {
        const error = new Error('invalid student number');
        error.statusCode = 422;
        return next(error);
    }
    const phone_no = req.body.phone_no;
    user = await User.findOne({ phone_no }).exec().catch(err => next(err));
    if (user) {
        const error = new Error('phone number already registered');
        error.statusCode = 422;
        return next(error);
    }
    const name = req.body.name;
    const branch = req.body.branch;
    const section = req.body.section;
    const new_user = new User({ name, email, student_no, phone_no, branch, section });
    await new_user.save().catch(err => next(err));
    res.json({
        message: 'registration successful'
    });
};
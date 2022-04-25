const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/register',
    [
        check('name')
            .matches(/^[a-z ]+$/i)
            .withMessage('name must be alphabetic')
            .custom(value => {
                if (!value || value === '') {
                    throw new Error('name not provided');
                }
                return true;
            }),
        check('email')
            .isEmail()
            .withMessage('invalid email address')
            .custom(value => {
                if (!value || value === '') {
                    throw new Error('email not provided');
                }
                return true;
            }),
        check('student_no')
            .isNumeric()
            .withMessage('student number must be numberic')
            .isLength({ min: 7, max: 7 })
            .withMessage('invalid student number')
            .custom(value => {
                if (!value || value === '') {
                    throw new Error('student number not provided');
                }
                return true;
            }),
        check('phone_no')
            .isNumeric()
            .withMessage('phone number must be numeric')
            .isLength({ min: 10, max: 10 })
            .withMessage('invalid phone number')
            .custom(value => {
                if (!value || value === '') {
                    throw new Error('phone number not provided');
                }
                return true;
            }),
        check('branch')
            .custom(value => {
                if (!value || value === '') {
                    throw new Error('branch not provided');
                }
                if (value != 'CSE' && value != 'CS' && value != 'CSE(AIML)' && value != 'CSE(DS)' && value != 'CSIT' &&
                    value != 'ECE' && value != 'EN' && value != 'IT' && value != 'ME' && value != 'Civil') {
                    throw new Error('invalid branch');
                }
                return true;
            }),
        check('section')
            .matches(/^[acdeilmnst]+[-]+[1-3]+$/i)
            .withMessage('invalid section')
            .custom(value => {
                if (!value || value === '') {
                    throw new Error('section not provided');
                }
                return true;
            })
    ],
    authController.postRegister
);

module.exports = router;
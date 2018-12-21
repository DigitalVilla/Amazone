// authentication credentials
const router = require('express').Router();
const User = require('../../models/User');

/**
 * @route GET api/users/register
 * @desc test for the route
 * @access Public 
 */
router.post('/register', (req, res, next) => {
    User.findOne({email: req.body.email })
    .then (user => {
        if (user) // if users exist warn the sender
        return res.status(400).json({email: "Email already exists"});
        //create new user
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });

        newUser.save((err) => {
            if (err) return next(err);
            res.json('The new user has been created');
        })
    })

 
});

module.exports = router;
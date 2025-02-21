const express = require('express')
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User({
            username:req.body.username,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: "User created",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
})

router.post('/login', (req, res)=>{
    let fetchedUser;
    User.findOne({username:req.body.username})
    .then(user=>{
        if(!user)
        {
            return res.status(401).json(
                {
                    message: "Authentication Failure 1.1"
                })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json(
                {
                    message: "Authentication Failure 2"
                });
        }

        const token = jwt.sign({username:fetchedUser.username,userid:fetchedUser._id},
            'secret_this_should_be_longer_then_it_is',
            {expiresIn:'1h'});

        res.status(200).json({token:token});
    })
    .catch(err =>{
            return res.status(401).json({
                message :"Authentication Failure 3"
            });
    });
});

module.exports = router


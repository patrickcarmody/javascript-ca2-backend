const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    let newUser = new User(req.body);
    console.log(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, 9);
    newUser.save((err, user) => {
        if(err){
            console.log(err)
            if(err.code === 11000) {
                return res.status(400).json({
                    msg: err,
                    error: "Email is already in use"
                })
            }
            else {
                return res.status(400).json({
                    msg: err,
                    test: "hello"
                })
            }
            
        }
        else {
            console.log("New user created");
            user.password = undefined;
            return res.status(201).json(user);
        }
    });
};

const login = (req, res) => {
    console.log(req.body);
    User.findOne({
        email: req.body.email
    })
    .then((user) => {

        if(!user || !user.comparePassword(req.body.password)){
            console.log("Login error: invalid user or password")
            res.status(401).json({
                msg: 'Authentication failed. Invalid user or password'
            });
        }
        else {
            console.log(`User with ID ${user._id} logged in`)
            let token = jwt.sign({
                email: user.email,
                name: user.name,
                _id: user._id
            }, process.env.APP_KEY);

            res.status(200).json({
                msg: 'Login Successful',
                token
            });
        }
    })
    .catch((err) => {
        throw err;
    })
};

const readData = (req, res) => {
    User.find()
        .then((data) => {
            // console.log(data);
            if(data.length > 0){
                res.status(200).json(data);
            }
            else{
                res.status(404).json("None found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}

const readSingle = (req, res) => {
    let id = req.params.id;

    User.findById(id)
        .then((data) => {
            if(data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    "message": `User with id: ${id} not found`
                });
            }
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            }
        });
}

const editData = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    User.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {
            if(data){
                res.status(201).json(data);
                console.log(`User with ID: ${id} was updated`)
            }
            else {
                res.status(404).json({
                    "error": `User ${id} not found`
                });
            }
        })
}

const deleteData = (req, res) => {
    let id = req.params.id;

    User.deleteOne({ _id: id })
        .then((data) => {
            if(data.deletedCount){
                console.log(`User with ID: ${id} was deleted`);
                res.status(200).json({
                    "message": `User with ID: ${id} was deleted`
                });
            }
            else {
                res.status(404).json({
                    "error": `User with ID: ${id} not found`
                });
            }
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "error": `Bad request, ${id} is not a valid ID`
                });
            }
            else{
                res.status(500).json(err)
            }
        });
};

module.exports = {
    register,
    login,
    readData,
    readSingle,
    editData,
    deleteData
};
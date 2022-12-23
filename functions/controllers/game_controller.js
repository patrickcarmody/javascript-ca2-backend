const Game = require('../models/game_schema');

const readData = (req, res) => {
    Game.find()
        .then((data) => {
            if(data.length > 0) {
                res.status(200).json(data);
                console.log(`User got all games`);
            }
            else{
                res.status(404).json("None found");
            }
        })
        .catch((err) => {
            console.log('\x1b[33m%s\x1b[0m','Error in readData')
            console.log(err);
            res.status(500).json(err);
        });
};

const readSingle = (req, res) => {
    let id = req.params.id;
    Game.findById(id)
        .then((data) => {
            if(data) {
                res.status(200).json(data);
                console.log(`User with ID ${req.user._id} got game ${id}`);
            }
            else {
                res.status(404).json({
                    "message": `Game with id: ${id} not found`
                });
            }
        })
        .catch((err) => {
            console.log('\x1b[33m%s\x1b[0m','Error in readSingle')
            console.error(err);
            // if(err.name === 'CastError') {
            //     res.status(400).json({
            //         "message": `Bad request, ${id} is not a valid id`
            //     });
            // }
            // else {
            //     res.status(500).json(err)
            // }
        });
};

const createData = (req, res) => {
    let gameData = req.body;
    Game.create(gameData)
        .then((data) => {
            console.log(`User with ID ${req.user._id} created game with ID ${data._id}`);
            res.status(201).json(data);
        })
        .catch((err) => {
            console.log('\x1b[33m%s\x1b[0m','Error in createData')
            if(err.name === 'ValidationError') {
                console.error('Validation Error', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error": err.message
                });
            }
            else if(err.message.includes("duplicate key error")) {
                res.status(500).json({
                    "msg": "Error!",
                    "error": err.message
            });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });
};

const editData = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Game.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {
            if(data) {
                res.status(200).json(data);
                console.log(`User with ID ${req.user._id} updated game with ID ${data._id}`);
            }
            else {
                res.status(404).json({
                    "message": `Game with id: ${id} not found`
                });
            }
        })
        .catch((err) => {
            if(err.name === 'ValidationError') {
                console.log('\x1b[33m%s\x1b[0m','Error in editData')
                console.error('\x1b[33m%s\x1b[0m', 'Validation Error: ', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error": err.message
                });
            }
            else if(err.name === 'CastError') {
                console.log('\x1b[33m%s\x1b[0m','CastError in editData')
                res.status(400).json({
                    "msg": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });
}

const deleteData = (req, res) => {
    let id = req.params.id;

    Game.deleteOne({ _id: id })
        .then((data) => {
            if(data.deletedCount){
                console.log(`User with ID ${req.user._id} deleted game with ID ${id}`);
                res.status(200).json({
                    "message": `Game with ID ${id} deleted`
                });
            }
            else {
                res.status(404).json({
                    "msg": `Game with ID ${id} not found`
                });
            }
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not valid`
                });
            }
            else {
                res.status(500).json(err)
            }
        });
}

module.exports = {
    readData,
    readSingle,
    createData,
    editData,
    deleteData
}
const express = require('express');
const router = express.Router();
const { loginRequired, adminRequired } = require('../controllers/auth_controller');

const { readData, readSingle, createData, editData, deleteData } = require('../controllers/game_controller.js');

router.get('/', readData)
    .get('/:id', loginRequired, readSingle)
    .post('/', loginRequired, createData)
    .put('/:id', loginRequired, editData)
    .delete('/:id',  loginRequired, deleteData)
module.exports = router;
const express = require('express');
const router = express.Router();
const { loginRequired, adminRequired } = require('../controllers/auth_controller');

const { 
    register, 
    login,
    readData,
    readSingle,
    editData,
    deleteData
  } = require('../controllers/user_controller');

router
  .post('/register', register)
  .post('/login', login)
  .get('/', loginRequired, readData)
  .get('/:id', loginRequired, readSingle)
  .put('/:id', loginRequired, editData)
  .delete('/:id', loginRequired, deleteData)
module.exports = router;
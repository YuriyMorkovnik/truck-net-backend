const express = require('express');
const controller = require('../controllers/ride');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/changeStatus', controller.changeStatus);


module.exports = router;
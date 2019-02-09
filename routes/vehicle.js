const express = require('express');
const controller = require('../controllers/vehicle');
const passport = require('passport');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);

router.delete('/:id', controller.remove);

router.post('/', controller.create);

router.patch('/:id', controller.update);


module.exports = router;

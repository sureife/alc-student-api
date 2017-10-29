const express = require("express");

const router = express.Router();

const passport = require("passport");

const studentsController = require('../../controllers/students');

const authController = require('../../controllers/auth');

const usersController = require('../../controllers/users');

const auth = passport.authenticate('jwt', { session: false });

// Define Route Endpoints
router.get('/students', auth , studentsController.index);
router.get('/students/:id', auth ,studentsController.show);
router.post('/students',  auth ,studentsController.create);
router.put('/students/:id', auth,studentsController.update);
router.delete('/students/:id', auth ,studentsController.destroy);

router.post('/login', authController.login);

router.get('/user',auth, usersController.show);

router.post('/register', usersController.create);





module.exports = router;
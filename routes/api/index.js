const express = require("express");

const router = express.Router();

const studentsController = require('../../controllers/students');

// Define Route Endpoints
router.get('/students', studentsController.index);
router.get('/students/:id', studentsController.show);
router.post('/students', studentsController.create);
router.put('/students/:id', studentsController.update);
router.delete('/students/:id', studentsController.destroy);


module.exports = router;
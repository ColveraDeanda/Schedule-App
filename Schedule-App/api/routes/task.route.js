const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller.js');

router.post('/save-task', taskController.saveTask);
router.get('/tasks', taskController.getTasks);
router.get('/task/:id', taskController.getTask);
router.delete('/task/:id' ,taskController.deleteTask);
router.put('/task/:id', taskController.updateTask);
router.get('/task/:day/:month' ,taskController.getByDayAndMonth);
router.get('/tasks/:month', taskController.getCategoriesByMonth);

module.exports = router;
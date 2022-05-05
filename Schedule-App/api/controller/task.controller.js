const Task = require('../model/task.model');
var ObjectId = require('mongodb').ObjectID;

const taskController = {}

taskController.saveTask = (req, res) => {
    let error = false;
    let valid = [];
    let task = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
    task.category = req.body.category;
    task.day = req.body.day;
    task.month = req.body.month;

    if (task.title == null || !isNaN(task.title)) {
        valid.push(' the title is incorrect');
    }
    if (task.description == null || !isNaN(task.description)) {
        valid.push(' the description is incorrect');
    }
    if (task.category == null || !isNaN(task.category)) {
        valid.push(' the category is incorrect');
    }
    if (task.day == null || isNaN(task.day)) {
        valid.push(' the day in incorrect');
    }
    if (task.month == null || !isNaN(task.month)) {
        valid.push(' the month is incorrect');
    }

    // Setting Data
    task.title = task.title.toLowerCase();
    task.description = task.description.toLowerCase();
    task.category = task.category.toLowerCase();
    task.month = task.month.toLowerCase();

    task.title = task.title.slice(0, 1).toUpperCase() + task.title.slice(1);
    task.description = task.description.slice(0, 1).toUpperCase() + task.description.slice(1);
    task.category = task.category.slice(0, 1).toUpperCase() + task.category.slice(1);
    task.month = task.month.slice(0, 1).toUpperCase() + task.month.slice(1);

    if (valid.length == 0) {
        Task.find({ day: task.day, month: task.month }).exec((err, data) => {
            data.map((x) => {
                if (x.title === task.title) return error = true;
            });
            if (error === false) {
                task.save((err, data) => {
                    if (err) return res.status(500).send({ message: 'Saving error' });
                    if (!data) return res.status(404).send({ message: 'Saving error' });
                    return res.status(200).send({
                        task: data
                    });
                });
            } else {
                return res.status(500).send({
                    repeated: 'The task already exists'
                });
            }
        });
    } else {
        return res.status(500).send({
            errors: valid
        });
    }
}
taskController.getTasks = (req, res) => {
    Task.find((err, data) => {
        if (err) return res.status(500).send({ message: 'An error has occurred' });
        if (!data) return res.status(404).send({ message: 'No records to show' });
        if (data.length == 0) {
            return res.status(200).send({
                message: 'No tasks have been recorded'
            });
        }
        return res.status(200).send({
            task: data
        });
    });
}

taskController.getTask = (req, res) => {
    let id = req.params.id;
    Task.findById(id, (err, data) => {
        if (err) return res.status(500).send({ message: 'Error when returning the record' });
        if (!data) return res.status(404).send({ message: 'Registration does not exist' });
        return res.status(200).send({
            task: data
        });
    });
}

taskController.deleteTask = (req, res) => {
    let id = req.params.id;
    Task.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(500).send({ message: 'Error when removing' });
        if (!data) return res.status(404).send({ message: 'There is no data to be deleted' });
        return res.status(200).send({
            message: 'Task eliminated'
        });
    });
}

taskController.updateTask = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let error = false;
    let valid = [];

    if (body.title == null || !isNaN(body.title)) {
        valid.push(' the title is incorrect');
    }
    if (body.description == null || !isNaN(body.description)) {
        valid.push(' the description is incorrect');
    }
    if (body.category == null || !isNaN(body.category)) {
        valid.push(' the category is incorrect');
    }
    if (body.day == null || isNaN(body.day) || body.day.length == 0) {
        valid.push(' the day is incorrect');
    }
    if (body.month == null || !isNaN(body.month)) {
        valid.push(' the month is incorrect');
    }

    // Setting Data
    body.title = body.title.toLowerCase();
    body.description = body.description.toLowerCase();
    body.category = body.category.toLowerCase();
    body.month = body.month.toLowerCase();

    body.title = body.title.slice(0, 1).toUpperCase() + body.title.slice(1);
    body.description = body.description.slice(0, 1).toUpperCase() + body.description.slice(1);
    body.category = body.category.slice(0, 1).toUpperCase() + body.category.slice(1);
    body.month = body.month.slice(0, 1).toUpperCase() + body.month.slice(1);

    if (valid.length == 0) {
        Task.find({ day: body.day, month: body.month, $nor: [{ _id: ObjectId(id) }] }).exec((err, data) => {
            data.map((x) => {
                if (x.title === body.title) return error = true;
            });
            if (error === false) {
                Task.findByIdAndUpdate(id, body, { new: true }, (err, data) => {
                    if (err) return res.status(500).send({ message: 'Error while updating' });
                    if (!data) return res.status(404).send({ message: 'There is no data to update' });
                    return res.status(200).send({
                        task: data
                    });
                });
            } else {
                return res.status(500).send({
                    repeated: 'The task already exists'
                });
            }
        });
    } else {
        return res.status(500).send({
            errors: valid
        });
    }
}

taskController.getByDayAndMonth = (req, res) => {
    let day = req.params.day;
    let month = req.params.month;
    Task.find({ day: day, month: month }).exec((err, data) => {
        if (err) return res.status(500).send({ message: 'An error has occurred' });
        if (!data) return res.status(404).send({ message: 'Error in obtaining the data' });
        if (data.length == 0) {
            res.status(200).send({ tasks: [] });
        } else {
            res.status(200).send({
                tasks: data
            });
        }
    });
}

taskController.getCategoriesByMonth = (req, res) => {
    let month = req.params.month;
    let notes = 0;
    let birthday = 0;
    let tasks = 0;
    let projects = 0;
    Task.find({ month: month }).exec((err, data) => {
        if (err) return res.status(500).send({ message: 'An error has occurred' });
        if (!data) return res.status(404).send({ message: 'Error in obtaining the data' });
        if (data.length == 0) {
            return res.status(200).send({ message: "There are no records for this month" });
        }
        notes = data.filter((x) => x.category === "Note").length;
        birthday = data.filter((x) => x.category === "Birthday").length;
        tasks = data.filter((x) => x.category === "Task").length;
        projects = data.filter((x) => x.category === "Project").length;
        return res.status(200).send({
            notes: notes,
            birthday: birthday,
            tasks: tasks,
            projects: projects
        });
    });
}

module.exports = taskController;
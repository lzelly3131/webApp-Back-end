var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const tasksInit = mongoose.model('tasks',
    {
        name: String,
        description: String,
        dueDate: String
    }, 'tasks'
)


// METODO GET
router.get('/getTasks', (req, res, next) => {
    tasksInit.find({}).then((response) => res.status(200).json(response)
    ).catch((err) => res.status(500).json(err))
});

// METODO POST
router.post('/addTask', function (req, res, next) {

    // VALIDACION PARA LOS DATOS DE ENTRADA
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {

        const task = new tasksInit(req.body)
        task.save().then(() => {
            res.status(200).json({});
        }).catch((err) => res.status(500).json(err))
    } else {
        res.status(400).json({});
    }
})

// METODO DELETE
router.delete('/removeTask/:id', function (req, res, next) {

    // VALIDACION DEL ID A ELIMINAR
    if (req.params && req.params.id) {
        let id = req.params.id;

        tasksInit.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).then((response) => {
            res.status(200).json(response)
        }).catch((err) => res.status(500).json(err))
    } else {
        res.status(400).json({});
    }
})


module.exports = router;
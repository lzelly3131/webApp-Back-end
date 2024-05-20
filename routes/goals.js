var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

const goalsInit = mongoose.model('goals',
    {
        name: String,
        description: String,
        dueDate: String
    }, 'goals'
)


// METODO GET
router.get('/getGoals', (req, res, next) => {
    goalsInit.find({}).then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
});

// METODO POST
router.post('/addGoal', function (req, res, next) {

    // VALIDACION PARA LOS DATOS DE ENTRADA
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {

        const goal = new goalsInit(req.body)
        goal.save().then(() => {
            res.status(200).json({})
        }).catch((err) => res.status(500).json(err))
    } else {
        res.status(400).json({});
    }
})

// METODO DELETE
router.delete('/removeGoal/:id', function (req, res, next) {

    // VALIDACION DEL ID A ELIMINAR
    if (req.params && req.params.id) {
        let id = req.params.id;

        goalsInit.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
            .then((response) => { res.status(200).json(response) })
            .catch((err) => res.status(500).json(err))
    } else {
        res.status(400).json({});
    }
})





module.exports = router;
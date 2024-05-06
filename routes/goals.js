var express = require('express');
var router = express.Router();

// CREACION DE ARREGLO QUE CONTENDRÁ LOS DATOS
let goals = new Array();

// METODO GET
router.get('/getGoals', (req, res, next) =>{
    res.json(goals)
});

// METODO POST
router.post('/addGoal', function(req, res, next){

    let timestamp = Date.now() + Math.random(); // CREACION TEMPORAL DE UN ID
    // VALIDACION PARA LOS DATOS DE ENTRADA
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString();
        goals.push(req.body);
    }else{
        res.json([{'ERROR: ':'VERIFIQUE LOS DATOS DE ENTRADA'}])
    }

    res.json(goals);
})

// METODO DELETE
router.delete('/removeGoal/:id', function(req, res, next){

    // VALIDACION DEL ID A ELIMINAR
    if(req.params && req.params.id){
        let id = req.params.id;
        goals = goals.filter(task => task.id !== id);
        res.json(goals);
    }else{
        res.json([{}]);
    }
})





module.exports = router;
var express = require('express');
var router = express.Router();

// CREACION DE ARREGLO QUE CONTENDRÁ LOS DATOS
let tasks = new Array();

// METODO GET
router.get('/getTasks', (req, res, next) =>{
    res.json(tasks)
});

// METODO POST
router.post('/addTask', function(req, res, next){

    let timestamp = Date.now() + Math.random(); // CREACION TEMPORAL DE UN ID
    // VALIDACION PARA LOS DATOS DE ENTRADA
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString();
        tasks.push(req.body);
    }else{
        res.json([{'ERROR: ':'VERIFIQUE LOS DATOS DE ENTRADA'}])
    }

    res.json(tasks);
})

// METODO DELETE
router.delete('/removeTask/:id', function(req, res, next){

    // VALIDACION DEL ID A ELIMINAR
    if(req.params && req.params.id){
        let id = req.params.id;
        tasks = tasks.filter(task => task.id !== id);
        res.json(tasks);
    }else{
        res.json([{}]);
    }
})





module.exports = router;
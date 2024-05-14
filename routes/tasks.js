var express = require('express');
var router = express.Router();

// CREACION DE ARREGLO QUE CONTENDRÁ LOS DATOS
let tasks = [{
    "id":"1",
    "name":"Tarea de Prueba",
    "description":"Esta es una tarea de prueba",
    "dueDate":"02-05-2024"
}]
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
        res.json(tasks);
    }else{
        res.status(400).json({});
    }
})

// METODO DELETE
router.delete('/removeTask/:id', function(req, res, next){

    // VALIDACION DEL ID A ELIMINAR
    if(req.params && req.params.id){
        let id = req.params.id;
        tasks = tasks.filter(task => task.id !== id);
        res.json(tasks);
    }else{
        res.status(400).json({});
    }
})


module.exports = router;
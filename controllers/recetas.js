/**
 * Created by gonzalogarcia on 10/11/15.
 */
var mongoose = require('mongoose');
var Receta  = mongoose.model('Receta');

//GET - Return all tvshows in the DB
exports.findAllRecetas = function(req, res) {
    Receta.find(function(err, recetas) {
        if(err) res.send(500, err.message);

        console.log('GET /recetas')
            res.status(200).jsonp(recetas);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
    Receta.findById(req.params.id, function(err, receta) {
        if(err) return res.send(500).err.message;

        console.log('GET /receta/' + req.params.id);
        res.status(200).jsonp(receta);
    });
};

//POST - Insert a new TVShow in the DB
exports.addReceta = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var receta = new Receta({
        title:    req.body.title,
        duration:     req.body.duration,
        ingredients:  req.body.ingredients,
        author:   req.body.poster,
        tipo:  req.body.tipo

    });

    receta.save(function(err, receta) {
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(receta);
    });
};

//PUT - Update a register already exists
exports.updateReceta = function(req, res) {
    Receta.findById(req.params.id, function(err, receta) {
            title =  req.body.title;
            duration = req.body.duration;
            ingredients = req.body.ingredients;
            author = req.body.poster;
            tipo = req.body.tipo;

        receta.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(receta);
        });
    });
};

//DELETE - Delete a Receta with specified ID
exports.deleteReceta = function(req, res) {
    Receta.findById(req.params.id, function(err, receta) {
        receta.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
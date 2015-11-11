/**
 * Created by gonzalogarcia on 10/11/15.
 */
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/recetas', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/receta')(app, mongoose);
var RecetasCtrl = require('./controllers/recetas');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var recetas = express.Router();

recetas.route('/recetas')
    .get(RecetasCtrl.findAllRecetas)
    .post(RecetasCtrl.addReceta);

recetas.route('/recetas/:id')
    .get(RecetasCtrl.findById)
    .put(RecetasCtrl.updateReceta)
    .delete(RecetasCtrl.deleteReceta);

app.use('/api', recetas);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});
/**
 * Created by gonzalogarcia on 10/11/15.
 */
exports = module.exports = function(app, mongoose) {

    var recetaSchema = new mongoose.Schema({
        title:    { type: String },
        duration:     { type: Number },
        ingredients:  { type: String },
        author:   { type: String },
        tipo:    { type: String, enum:
            ['Italiana', 'Española', 'Americana', 'Francesa']
        }
    });

    mongoose.model('Receta', recetaSchema);

};
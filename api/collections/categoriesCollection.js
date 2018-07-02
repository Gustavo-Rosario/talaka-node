let db = require('../../config/db.js');
let Project = require('../models/categoriesModel.js');

let Projects = db.Bookshelf.Collection.extend({
    model: Project
});

module.exports = Project;
let db = require('../../config/db.js');
let User = require('../models/usersModel.js');

let Users = db.Bookshelf.Collection.extend({
    model: User
});

module.exports = Users;
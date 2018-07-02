let config = require('./config.js');
let knex = require('knex')(config.bd);
let Bookshelf = require('bookshelf')(knex);
// Pass an initialized bookshelf instance
let ModelBase = require('bookshelf-modelbase')(Bookshelf);
// Or initialize as a bookshelf plugin
Bookshelf.plugin(require('bookshelf-modelbase').pluggable);

exports.ModelBase = ModelBase;
exports.Bookshelf = Bookshelf;
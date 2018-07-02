let db = require('../../config/db.js')
    ,utils = require('../utils');
// USE
let Category = require('./categoriesModel.js');
let User = require('./usersModel.js');
let Tag_Project = require('./tagsProjectsModel.js');
// MAIN EXPORT
let Project = db.ModelBase.extend({
    tableName: 'projects',
    hasTimesstamps: true,
    
    user:  () =>{
        return this.belongsTo(User, 'id', 'cd_user');  
    },    
    category: () =>{
        return this.belongsTo(Category, 'id', 'cd_category');
    },
    tags: () =>{
        return this.hasMany(Tag_Project, 'cd_project');  
    },
    
    initialize(){
        this.on('fetched fetched:collection fetching fetching:collection', (model, columns, options)=>{
            if(columns){
            }
        })  
    }

});

module.exports = Project;
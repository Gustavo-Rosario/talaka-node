let db = require('../../config/db.js')
    ,utils = require('../utils');
// USE
let Project = require('./projectsModel.js');
// MAIN EXPORT
let User = db.ModelBase.extend({
    tableName: 'users',  
    hasTimestamps: true,

    projects: function(){
        return this.hasMany(Project, 'cd_user');  
    },
    
    initialize(){
        this.on('fetched fetched:collection fetching fetching:collection', (model, columns, options)=>{
            if(columns){
                delete columns.ds_pwd;
            }else{
                console.log(model);
                console.log(columns);
                console.log(options);
            }
        });
        
        this.on('saving', (model, columns, options)=>{
            console.log(model);
        });
    }
});

module.exports = User;
let db = require('../../config/db.js');
// USE
let Tag_Project = require('./tagsProjectsModel.js');
// MAIN EXPORT
let Tag = db.ModelBase.extend({
    tableName: 'tags',  
    hasTimestamps: true,

    projects: () =>{
        return this.belongsToMany(Tag_Project, 'cd_tag');  
    }
   
});

module.exports = Tag;
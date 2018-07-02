let db = require('../../config/db.js');
// USE
let Project = require('./projectsModel.js');
let Tag = require('./tagsModel.js');
// MAIN EXPORT
let Tag_Project = db.ModelBase.extend({
    tableName: 'tags_projects',  
    hasTimestamps: true,

    projects: () =>{
        return this.belongsToMany(Project, 'cd_projects');  
    },
    tags: () =>{
        return this.belongsToMany(Tag, 'cd_tags');  
    }
   
});

module.exports = Tag_Project;
let db = require('../../config/db.js');
// USE
let Project = require('./projectsModel.js');
// MAIN EXPORT
let Category = db.ModelBase.extend({
    tableName: 'categories', 
    hasTimestamps: true,
    projects: () =>{
        return this.belongsToMany(Project, 'cd_category');  
    }
   
});

module.exports = Category;
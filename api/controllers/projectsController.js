let Project = require('../models/projectsModel')
    ,Projects = require('../collections/projectsCollection')
    ,utils = require('../utils')
    ,fs = require('fs');


// methods
module.exports = {
    getProject  : (req, res)=>{
        let id = req.params.id;
        Project.findById(id).then((project)=>{
            let projectJSON = project.toJSON();
            console.log('Get project success');        
            res.status(200).json(projectJSON);
        }).catch((err)=>{
            console.log(err);
            res.status(404).json({code:404, msg: 'Not found'});
        });
    },
    postProject : (req, res)=>{
        let payload = req.decoded;
        let data = req.body;
        let required = {
            body: [
                'cd_category','nm_title',
                'ds_project','vl_meta',
                'dt_end'
            ],
            files: [
                'img_cover',
                'img_background'
            ]
            
        };
        
        //VALIDATE REQUIRED FIELDS
        if(!utils.requiredProperties(req.body, required.body) || req.files == undefined || !utils.requiredProperties(req.files, required.files)){
            res.json({
                code:200,
                status:'fail',
                msg:'Required properties not in Request Body'
            });
            return;
        }
        // CD USER
        data.cd_user = payload.userId;
        
        // VL META
        data.vl_meta = parseFloat(data.vl_meta);
        
        // DATE BEGIN
        data.dt_begin = new Date().toISOString().slice(0,10); 
        
        // PROFILE
        if(req.files.img_cover !== undefined){
            // IMAGE
            let file_cover = req.files.img_cover;
            let resFile = utils.upload(file_cover, './storage/imgs/projects/');
            data.img_cover = utils.baseurl + '/public/projects/' + resFile.name;
        }
        // BACKGROUND
        if(req.files.img_background !== undefined){
            // IMAGE
            let file_background = req.files.img_background;
            let resFile = utils.upload(file_background, './storage/imgs/projects/backgrounds/');
            data.img_background = utils.baseurl + '/public/projects/backgrounds/' +  resFile.name;
        }
        
        // CREATE PROJECT
        Project.forge(data).save().then((project)=>{
            console.log('Project saved:', project.get('nm_title')); 
            res.json({status: "ok", msg: `project ${project.get("nm_title")} created in TALAKA NODE`});
        }).catch(function(err) {
            console.log(err);
        });
    },
}
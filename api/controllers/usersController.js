let User = require('../models/usersModel')
    ,Users = require('../collections/usersCollection')
    ,utils = require('../utils')
    ,pwdHash = require('password-hash')
    ,fs = require('fs');


// methods
module.exports = {
    getAll      : (req, res)=>{
        Users.forge().fetch().then(function(users) { 
            let usersJSON = users.toJSON();
            usersJSON = Array.isArray(usersJSON) ? usersJSON : [usersJSON];
            usersJSON = usersJSON.map((u)=>{
                delete u.ds_pwd;
                return u;
            });
            console.log('Got a bunch of users!');
            res.json(usersJSON);
        }).catch((err)=>{
            console.log(err);
            res.status(404).json({code: 404, msg:'Not found'});
        });
    },
    //=========== CRUD =============
    getUser     : (req, res)=>{
        let id = req.params.id;
        let projects = req.params.projects;
        let fetch = projects === 't' ? { withRelated: ['projects']} : {};
        User.findById(id, fetch).then((user)=>{
            let userJSON = user.toJSON();
            // REMOVE PWD
            delete userJSON.ds_pwd;
            console.log('Get user success');        
            res.json(userJSON);
        }).catch((err)=>{
            console.log(err);
            res.status(404).json({code:404, msg: 'Not found'});
        });
    },
    postUser    : (req, res)=>{
        let data = req.body;
        // PASSWORD
        let pwd = req.body.ds_pwd;
        let hash = pwdHash.generate(pwd);
        data.ds_pwd = hash;
        
        // PROFILE
        if(req.files.img_profile !== undefined){
            // IMAGE
            let file_profile = req.files.img_profile;
            let resFile = utils.upload(file_profile, './storage/imgs/profiles/');
            data.img_profile = resFile.name;
        }
        // BACKGROUND
        if(req.files.img_background !== undefined){
            // IMAGE
            let file_background = req.files.img_background;
            let resFile = utils.upload(file_background, './storage/imgs/backgrounds/');
            data.img_background = resFile.name;
        }
        
        // CREATE USER
        User.forge(data).save().then((user)=>{
            console.log("User saved:", user.get("nm_first")); 
            res.json({status: "ok", msg: `user ${user.get("nm_first")} created in TALAKA NODE`});
        });
    
    },
    putUser     : (req, res)=>{
        let payload = req.decoded;
        let data = req.body;
        let id = parseInt(req.params.id);
        let user = User.forge().where({'id': id});
        
        // CHECK PERMISSION
        if( payload.userId !== id && payload.admin === undefined ){
            res.json({code: 200, success: false, msg: 'Permission denied'});
            return;  
        }
        
        // PASSWORD
        if(req.body.ds_pwd !== undefined){
            let pwd = req.body.ds_pwd;
            let hash = pwdHash.generate(pwd);
            data.ds_pwd = hash;
        }
        
        //FILES
        if(req.files !== undefined){
            // PROFILE
            if(req.files.img_profile !== undefined){
                // IMAGE
                let file_profile = req.files.img_profile;
                let resFile = utils.upload(file_profile, './storage/imgs/profiles/');
                data.img_profile = resFile.name;
                // user.fetch().then((u)=>{
                //     let path = './storage/imgs/'+u.get('img_profile').split("public/")[1];
                //     utils.remove(path);
                // });
            }
            // BACKGROUND
            if(req.files.img_background !== undefined){
                // IMAGE
                let file_background = req.files.img_background;
                let resFile = utils.upload(file_background, './storage/imgs/backgrounds/');
                data.img_background = resFile.name;
            }
        }
        console.log(data);
        user.where({'id': id}).save(data, { patch: true }).then((aux)=>{
            console.log("User updated id:", id); 
            res.status(201).json({status: "ok", msg: `user ${id} updated`});
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({code: 500, msg: 'update error'}); 
        });
    }, 
    deleteUser  : (req, res)=>{
        let payload = req.decoded;
        let id = req.params.id;
        // CHECK PERMISSION
        if( payload.userId !== id && payload.admin === undefined ){
            res.json({code: 200, success: false, msg: 'Permission denied'});
            return;  
        }
        
        User.forge().where({'id': id}).destroy().then((model)=>{
            console.log(`User id ${id} deleted`);
            res.status(204).json({code: 204, msg: `user ${id} deleted`})
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({code: 500, msg: 'delete user error'});
        })
    },
}
let Category = require('../models/categoriesModel')
    ,Categories = require('../collections/categoriesCollection')
    ,utils = require('../utils')
    ,fs = require('fs');


// methods
module.exports = {
    getAll : (req, res)=>{
        Categories.forge().fetch().then((categories)=>{
            let catJSON = categories.toJSON();
            catJSON = Array.isArray(catJSON) ? catJSON : [catJSON];
            catJSON = catJSON.map((c)=>{
                if(c.img_main != null){
                    c.img_main = utils.base64_encode('storage/imgs/categories/'+c.img_main);
                }
                if(c.img_background != null){
                    c.img_background = utils.base64_encode('storage/imgs/backgrounds/'+c.img_background);
                }
                return c;
            });
            console.log('Get all categories');
            res.json(catJSON);
        }).catch((err)=>{
            console.log(err);
            res.status(404).json({code:404, msg: 'Not found'});
        });    
    },
    postCategory : (req, res)=>{
        let data = req.body;
        let required = [
            'nm_category','ds_category'
        ];
        //VALIDATE REQUIRED FIELDS
        if(!utils.requiredProperties(req.body, required)){
            res.json({
                code:200,
                status:'fail',
                msg:'Required properties not in Request Body'
            });
            return;
        }
        // IMAGE
        if(req.files !== undefined){
            // MAIN IMAGE
            if(req.files.img_main !== undefined){
                // IMAGE
                let file_main = req.files.img_main;
                let resFile = utils.upload(file_main, './storage/imgs/categories/');
                data.img_mainr = resFile.name;
            }
            // BACKGROUND
            if(req.files.img_background !== undefined){
                // IMAGE
                let file_background = req.files.img_background;
                let resFile = utils.upload(file_background, './storage/imgs/categories/');
                data.img_background = resFile.name;
            }
        }
        
        // CREATE CATEGORY
        Category.forge(data).save().then((category)=>{
            console.log('Category saved:', category.get('nm_category')); 
            res.json({status: 'ok', msg: `category ${category.get("nm_category")} created in TALAKA NODE`});
        });
    },
}
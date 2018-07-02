let fs = require('fs')
,moment = require('moment');

const baseurl = 'https://talaka-node-gmastersupreme.c9users.io/'

// function to encode file data to base64 encoded string
exports.base64_encode = (file)=>{ 
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
};

exports.upload = (file, path)=>{
    // UPLOAD
    moment.locale('pt-BR');
    let temp = file.path
    ,prefix = 'tlk-'+moment().format('YYYY-MM-DDhhmmss')
    ,newName = path+prefix+file.name;
    fs.rename(temp, newName, (err)=>{
        if (err) throw err;
    });
    
    let fileUrl = baseurl + newName.replace('./storage/imgs/', 'public/');
    // RETURN URL OF FILE
    return {status: 'ok', name: fileUrl };
};

exports.remove = (filePath)=>{
    fs.unlink(filePath, (error)=>{
        if (error) {
            throw error;
        }
        console.log(`Deleted ${filePath}`);
    });  
};

exports.requiredProperties = (json, required)=>{
    let result = true;
    return required.every( r => json.hasOwnProperty(r) )
};

exports.baseurl = baseurl ;

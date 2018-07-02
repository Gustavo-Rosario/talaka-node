let User = require('../models/usersModel')
    ,Users = require('../collections/usersCollection')
    ,utils = require('../utils')
    ,pwdHash = require('password-hash')
    ,jwt = require('jsonwebtoken')
    ,config = require('../../config/config')
    ,fs = require('fs');
    
module.exports = {
    authUser:   (req, res)=>{
        let login = req.body.login;
        let pwd = req.body.pwd;
        User.findOne({nm_login: login}).then((user)=>{
            if(!user){
                res.json({code: 200, msg: 'Authentication failed. User not found.'});
            }else{
                let hashedPwd = user.get('ds_pwd');
                if(!pwdHash.verify(pwd,hashedPwd)){
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });    
                }else{
                    const payload = {
                        userId: user.get('id')
                    };
                    let cert = fs.readFileSync('./config/private.pem');
                    let token = jwt.sign(payload, cert,{ algorithm: 'RS256' }, {
                        expiresIn: '24h'  // expires in 24 hours
                    });
                    
                    res.json({
                        code: 200,
                        success: true,
                        msg: 'Get auth token',
                        token: token
                    });
                }
            }
        })
    },
}
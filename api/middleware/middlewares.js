let config = require('../../config/config')
    ,jwt = require('jsonwebtoken')
    ,fs = require('fs');
    
// AUTH MIDDLEWARE
module.exports = {
    auth: (req, res, next)=>{
            // check header or url parameters or post parameters for token
            let token = req.body.token || req.params.token || req.headers['x-access-token-tlk'];
            // decode token
            if(token){
                let cert = fs.readFileSync('./config/public.pem');
                // verifies secret and checks exp
                jwt.verify(token, cert, { algorithms: ['RS256'] }, (err, decoded)=>{      
                    if(err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });    
                    }else{
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;    
                        next();
                    }
                });
        
          }else{
            // if there is no token
            // return an error
            return res.status(403).json({ 
                code: 403, 
                message: 'No token provided.' 
            });
        
          }
        },
    
}
// VARS
let _ = require('lodash')
    ,express = require('express')
    ,url = require('url')
    ,app = express()
    ,router = express.Router()
    ,multiparty = require('connect-multiparty')
    ,port = (process.env.PORT || 3000)
    ,bodyParser = require('body-parser')
    ,morgan = require('morgan')
    ,jwt = require('jsonwebtoken')
    ,config = require('./config/config')
    ,middleware = require('./api/middleware/middlewares');
// CONTROLLERS
let AuthController = require('./api/controllers/authController')
    ,UsersController = require('./api/controllers/usersController')
    ,ProjectController = require('./api/controllers/projectsController')
    ,CategoriesController = require('./api/controllers/categoriesController')


//TOKEN VAR
app.set('talakaToken', config.token.value);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// use morgan to log requests to the console
app.use(morgan('dev'));
// OPTIONS
app.use(function(req,res,next){
    var headers = {};

    // set header to handle the CORS
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-access-token-tlk';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    headers["Access-Control-Max-Age"] = '86400';

    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200, headers);
        console.log('OPTIONS SUCCESS');
        res.end();
    }else{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    }
});
//====================================================================
//====================== ROUTES ======================================
//====================================================================
app.get('/', (req, res)=>{
    res.json({talaka: 'node', version: '0.0.1'});
});
// PUBLIC FOLDER
app.use('/public', express.static(__dirname  + '/storage/imgs'));


// API
app.use('/api/v0', router);


// AUTH
router.post('/auth', AuthController.authUser);

// USER
router.get('/users', UsersController.getAll);
router.route('/user/:id(\\d+)/:projects(t|f)*?')
    .get(UsersController.getUser)
    .put(middleware.auth, multiparty(), UsersController.putUser)
    .delete(middleware.auth, UsersController.deleteUser);
router.route('/create/user')
    .post(multiparty(), UsersController.postUser);

// PROJECT
router.post('/create/project', multiparty(), middleware.auth, ProjectController.postProject);
router.route('/project/:id')
    .get(ProjectController.getProject);

// CATEGORY
router.get('/categories', CategoriesController.getAll);
router.post('/create/category', multiparty(), middleware.auth, CategoriesController.postCategory);

app.listen(port);
console.log(`Message RESTful API server started on: ${port}`);
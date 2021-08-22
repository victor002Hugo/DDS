const express = require('express');
const router = express.Router();
const Auth = require('../src/middleware/middleware');
const AuthValidator = require('../src/validators/authvalidator');

const AuthController = require('../src/controller/AuthController');
const UserController = require('../src/controller/UserController');
const AdsController = require('../src/controller/AdsController');

router.get('/ping',(require,response)=>{
    response.json({pong:true});
});


//obter estados
router.get('/states',UserController.getStates);


//processos de login
router.post('/user/signin',AuthValidator.signin,AuthController.signin);
router.post('/user/signup',AuthValidator.signup,AuthController.signup);

//Obter informações do usuario
router.get('/user/me',Auth.private,UserController.info);
router.put('/user/me',UserValidator.editAction,Auth.private,UserController.editAction);


//Obter categorias
router.get('/categories',AdsController.getCategories);



//informações do anuncio
router.post('/ad/add',AdsController.addAction);
router.get('/ad/list',AdsController.getList);
router.get('/ad/item',AdsController.getItem);
router.put('/ad/:id',AdsController.editAction);




module.exports=router;

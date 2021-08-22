const express = require('express');
const mustache = require('mustache-express');
const routes = require('./routes/routers');
const router = express.Router();
const helpers = require('./helpers');


//estabelecer rotas

const app = express();

app.use((require,response,next)=>{
    response.locals.h = helpers;
    next();
});

app.use('/',router);



router.get('/',(require,response)=>{

    let obj = {
            nome:require.query.nome,
            //pageTitle:'Titulo do teste'
    };

    
    response.render('home',obj)
});




router.get('/aluno',(require,response)=>{
    response.send('Ola aluno');
});


router.get('/pesquisa',(require,response)=>{
    response.send('Pesquisa');
});


router.get('/professor',(require,response)=>{
    response.send('Ola professor');
});


router.get('/aulas',(require,response)=>{
    response.send('Ola aulas');
});

//configurações basicas express 

//inicializar o express



//possibilitar app para importar do servidor
module.exports = app;
app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname+'/views');





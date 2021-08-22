require('dotenv').config({path:'variables.env'});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const apiRouters = require('./routes/routers');
const app = require('./app');


mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error',(error)=>{
    console.error("Deu erro: "+error.message);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(fileUpload());
server.use(express.static('public'));
server.use('/',apiRouters);

//inicio do servidor




server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})


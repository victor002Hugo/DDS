const {validationResult,matchedData}=require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User');
const State = require('../models/State');


module.exports={
    signin:async(require,response)=>{
        const erros = validationResult(require);

        if(!erros.isEmpty()){
            response.json({
                error:erros.mapped()
            });
            return;
        }

        const data = matchedData(require);

        const user = await User.findOne({
            email:data.email
        });

        if(!user){
            response.json({
                error:'Email ou senha não correspondente'
            });
            return;
        }

        const match = await bcrypt.compare(data.password,user.passwordHash);
        if(!match){
            response.json({
                error:'Email ou senha não correspondente'
            });
            return;
        }

        const payload = (Date.now()+Match.random()).toString();
        const token = await bcrypt.hash(payload,10);

        user.token = token;
        await user.save();

        response.json({
            token,
            email:data.email
        }); 

    },
    signup:async(require,response)=>{
        const erros = validationResult(require);
        if(!erros.isEmpty()){
            response.json({
                error:erros.mapped()
            });
            return;
        }
        const data = matchedData(require);

        const user = await User.findOne({
            email:data.email
        });

        if(user){
            response.json({
                error:{email:{msg:"Ja temos este e-mail cadastrado"}}
            });
            return;
        }

        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateItem = await State.findById(data.state);
            if(!stateItem){
                response.json({
                    error:{state:{msg:"Este estado não existe"}}
                });
                return;
            }
        }else{
            response.json({
                error:{state:{msg:"Codigo de estado invalido"}}
            });
            return;
        }

        //Gravar no banco
        const passwordHash = await bcrypt.hash(data.password,10);

        const payload = (Date.now()+Math.random()).toString();
        const token = await bcrypt.hash(payload,10);

        const newUser = new User({
            name:data.name,
            email:data.email,
            passwordHash,
            token,
            state:data.state
        });

        await newUser.save();
        
        response.json({token});
    },
    editAction:async(require,response)=>{

    },
};
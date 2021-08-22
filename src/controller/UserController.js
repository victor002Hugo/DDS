const State = require('../models/State');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {validationResult,matchedData} = require('express-validator');
const User = require('../models/User');
module.exports={
    getStates: async (require,response)=>{
        let states = await State.find();
        response.json({
            states
        });
    },
    info:async(require,response)=>{

        let token = require.query.token;

        const user = await User.findOne({token});
        const state = await State.findById(user.state);

        response.json({
            name:user.name,
            email:user.email,
            state:state.name
        });
    },
    editAction:async(require,response)=>{
        const erros=validationResult(require);
        if(!erros.isEmpty()){
            response.json({
                error:erros.mapped()
            });
            return;
        }
        const data = matchedData(require);

        let updates={};

        if(data.name){
            updates.name=data.name;
        }

        if(data.email){
            const emailCheck = await User.findOne({
                email:data.email
            });
            if(emailCheck){
                response.json({
                    error:'Email ja existe'
                });
                return;
            }
            updates.email=data.email;
        }

        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)){
                const stateCheck = await State.findById(data.state);

                if(!stateCheck){
                    response.json({
                        error:'Estado não existe'
                    });
                    return;
                }

                updates.state = data.state;
            }else{
                response.json({
                    error:'Codigo do estado em formato invalido'
                });
                return;
            }
        }

        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password,10);
        }

        await User.findOneAndUpdate({
            token:data.token
        },
        {
            $set:updates
        });

        response.json({});
    }
};
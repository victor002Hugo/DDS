const {checkSchema}= require('express-validator');

module.exports={
    signup:checkSchema({
        name:{
            notEmpty:true,
            trim:true,
            isLength:{
                options:{min:2}
            },
            errorMessage:"Nome precisa de pelo menos 2 caracteres"
        },
        email:{
            isEmail:true,
            normalizeEmail:true,
            errorMessage:"Email invalido"
        },
        password:{
            isLength:{
                options:{
                    min:4
                }
            },
            errorMessage:"Senha precisa de pelo menos 4 caracteres"
        },
        state:{
            notEmpty:true,
            errorMessage:"Estado não preenchido"
        }
    }),
    signin:checkSchema({
        email:{
            isEmail:true,
            normalizeEmail:true,
            errorMessage:'Email Invalido'
        },
        password:{
            isLength:{
                options:{
                    min:4
                }
            },
            errorMessage:'Senha precisa ter pelo menos 4 caracteres'
        }
    })
};
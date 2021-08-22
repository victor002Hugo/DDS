const User = require('../models/User');


module.exports={

    private: async(require,response,next)=>{
        if(!require.query.token && !require.body.token){
            response.json({notallowed:true});
            return;
        }
        if(require.query.token){
            token = require.query.token;
        }
        if(require.body.token){
            token=require.body.token;
        }
        if(token==""){
            response.json({notallowed:true});
            return;
        }

        const User = await User.findOne({
            token
        })

        if(!User){
            response.json({notallowed:true});
            return;
        }
    next();
    }

};
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser:String,
    status:String,
    images:[Object],
    category:String,
    price:String,
    description:String,
    dateCreated:Date,
    views:Number
});

const modelName = 'Ad';


if(mongoose.connection && mongoose.connection.models[modelSchema]){
    module.exports=mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName,modelSchema);
}
const {v4:uuid}= require('uuid');
const jimp = require('jimp');

const Category = require('../models/Category');
const Ad = require('../models/Ad');
const User = require('../models/User');

const addImage = async(buffer)=>{
    let newName = `${uuid()}.jpg`;
    let tmpImage = await jimp.read(buffer);
    tpmImage.cover(500,500).quality(75).write(`./public/assets/${newName}`);
    return newName;
}

module.exports={
    getCategories:async(require,response)=>{
        const cats = await Category.find();
        let categorias = [];

        for(let i in cats){
            categories.push({
                ...cats[i]._doc,
                img:`${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }

        response.json({
            categories
        });
    },
    addAction:async(require,response)=>{
        let {title,price,priceneg,token,cat,desc}=require.body;
        const user = await User.findOne({token:token}).exec();

        if(!title||!cat||!desc){
            response.json({
                error:'Titulos, categorias ou descrição não foram preenchidos'
            })
            return;
        }

        if(price){

            price = price.replace('.','').replace(',','.').replace('R$','');

            price = parseFloat(price);
        }else{
            price=0;
        }

        const newAd = new Ad();
        newAd.idUser=user._id;
        newAd.state=user.state;
        newAd.category=user.cat;
        newAd.dataCreated=new Date();
        newAd.title=title;
        newAd.price=price;
        newAd.priceNegotiable=(priceneg==true)?true:false;
        newAd.description=desc;
        newAd.views=0;
        newAd.status=true;


        if(require.files && require.files.img){

            if(['image/jpeg','image/jpg','image/png'].includes(require.files.img.mimetype)){
                let url = await addImage(require.files.img.data);
                newAd.images.push({
                    url,
                    default:false
                })
            }
        }else{
            for(let i=0;i<require.files.img.lenght;i++){
                if(['image/jpeg','image/jpg','image/png'].includes(require.files.img.mimetype)){
                    let url = await addImage(require.files.img.data);
                    newAd.images.push({
                        url,
                        default:false
                    })
                }
            }
        }

        const info = await newAd.save();
        response.json({
            id:info._id
        });

    },
    getList:async(require,response)=>{
        
    },
    getItem:async(require,response)=>{
        
    },
    editAction:async(require,response)=>{
        
    }
};
const mongodb = require("../../config/mongodb")
const ObjectId = require('mongodb').ObjectId;

exports.add=(item, callback)=>{
    const collection = mongodb.getCollection('User');
    collection.insertOne({username:item.username, email:item.email, password:item.password})
    .then(()=>{callback();})
    .catch(err=>console.log(err));
}

exports.show=(email,password,callback)=>{
    const collection = mongodb.getCollection('User');
    collection.findOne({'email':email,'password':password})
    .then(res=>callback(res))
    .catch(err=>console.log(err))
}
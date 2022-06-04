const mongodb = require("../../config/mongodb")
const ObjectId = require('mongodb').ObjectId;

exports.add= (item, callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.insertOne({name:item.name, address:item.address, city:item.city})
    .then(()=>{
        callback();
    })
    .catch((err)=>{
        console.log(err);
    });
}

// exports.show = (callback)=>{
//     const collection = mongodb.getCollection("Restaurant2");
//     collection.find({}).toArray((err,result)=>{
//         if(err) throw err;
//         callback(result);
//     })
// }

exports.show = (callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.find({}).toArray()
        .then(
            (restaurant)=>{
                callback(restaurant);
            })
        .catch(
            err=>{
                console.log(err);
            }
        );
}

exports.showLocation = (callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.find({}).toArray()
        .then(
            (restaurant)=>{
                callback(restaurant);
            })
        .catch(
            err=>{
                console.log(err);
            }
        );
}

exports.showMealType = (callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.find({}).toArray()
        .then(
            (restaurant)=>{
                callback(restaurant);
            })
        .catch(
            err=>{
                console.log(err);
            }
        );
}

exports.showById = (id,callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.findOne({"_id" :ObjectId(id)})
        .then((res)=>{
            if(res==null){
                callback("Not Found !!");
            }
            else{
                callback(res);
            }
        })
        .catch((err)=>console.log(err));
}

exports.showByName = (names,callback)=>{
    // const regexKey = new RegExp(`^${names}`,"i"); // ------> Alternative to create RegEx
    const collection = mongodb.getCollection("Restaurant2");
    collection.find({"name": {$regex: names, $options: "i"}}).toArray()
    .then((restaurant)=>{
        callback(restaurant);
    })
    .catch(err=>console.log(err));
}

exports.showByLocation = (location,callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.find({"city_name" : location}).toArray()
        .then(
            (restaurant)=>{
                callback(restaurant);
            })
        .catch(
            err=>{
                console.log(err);
            }
        );
}

exports.update = (restaurant,callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    const filter = {"_id": ObjectId(restaurant.id)};
    const update = {$set: {"name":restaurant.name,"address":restaurant.address,"city_name":restaurant.city}};
    collection.findOneAndUpdate(filter,update)
    .then(()=>{
        callback();
    })
    .catch((err)=>console.log(err));
}

exports.deleteById = (id,callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    collection.deleteOne({"_id": ObjectId(id)})
        .then((res)=>{
            callback(res);
        })
        .catch((err)=>console.log(err));
}


exports.showByFilter = (city,names,mealtype,cuisine,lcost,hcost,page,sort,callback)=>{
    const collection = mongodb.getCollection("Restaurant2");
    cuisine = cuisine.length>0 ? cuisine : '';  
    // let {cuisine} =  req.body;
    page = page ? page: 1;
    sort = sort ? {cost:sort} : null;

    let Payload = {};
    const itemsPerPage = 2;

    let startIndex = itemsPerPage*page - itemsPerPage;
    let endIndex = itemsPerPage*page;

    if(lcost && hcost && city && mealtype && cuisine){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}, 'type.name':mealtype, 'cost': {$lte: parseInt(hcost), $gte: parseInt(lcost)}, 'Cuisine.cuisine':{$in : cuisine}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(lcost && hcost && city && mealtype){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}, 'type.name':mealtype, 'cost': {$lte: parseInt(hcost), $gte: parseInt(lcost)}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(lcost && hcost && city && cuisine){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}, 'Cuisine.cuisine':{$in : cuisine}, 'cost': {$lte: parseInt(hcost), $gte: parseInt(lcost)}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(lcost && hcost && mealtype){
        collection.find({'type.name':mealtype, 'cost': {$lte: parseInt(hcost), $gte: parseInt(lcost)}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(lcost && hcost && cuisine){
        collection.find({'Cuisine.cuisine':{$in : cuisine}, 'cost': {$lte: parseInt(hcost), $gte: parseInt(lcost)}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(city && mealtype && cuisine){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}, 'type.name':mealtype, 'Cuisine.cuisine':{$in : cuisine}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(city && mealtype){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}, 'type.name':mealtype}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(mealtype && cuisine){
        collection.find({'type.name':mealtype, 'Cuisine.cuisine':{$in : cuisine}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(mealtype){
        collection.find({'type.name':mealtype}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(cuisine){
        collection.find({'Cuisine.cuisine':{$in : cuisine}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
    else if(names && city){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}, "name": {$regex: `\^${names}`, $options: "i"}}).toArray()
        .then((restaurant)=>{
        callback(restaurant);
        })
        .catch((err)=>console.log(err));
    }
    else if(city){
        collection.find({"city_name":{$regex: `\^${city}$`, $options: "i"}}).sort(sort).toArray()
        .then((restaurant)=>{
            const filteredResponse = restaurant.slice(startIndex,endIndex);
            callback([filteredResponse,restaurant.length]);
        })
        .catch((err)=>console.log(err));
    }
}
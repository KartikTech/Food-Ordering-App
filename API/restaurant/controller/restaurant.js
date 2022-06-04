const Restaurant = require("../model/restaurant");
const repo = require("../repositories/restaurant");
const url = require("url");

exports.addRestaurant = (req,res)=>{
    const newRestaurant = new Restaurant(null,req.body.name,req.body.address,req.body.city);
    repo.add(newRestaurant, ()=>{
        res.send("Data received !!");
    });
}

exports.getRestaurant = (req,res)=>{
    repo.show((data)=>{
        res.send(data);
    });
}

exports.getLocation = (req,res)=>{
    repo.showLocation((data)=>{
        const location = data.map(l=>l['city_name']);
        const filtered = [...new Set(location)];
        res.send(filtered);
    });
}

exports.getMealType = (req,res)=>{
    repo.showMealType((data)=>{
        const arr = data.map(a=>a['type']);
        const mtype = arr.map(x=>x.map(y=>y['name']));
        const filtered = [...new Set(((mtype.map(x=>x.join())).join()).split(","))];
        res.send(filtered);
    });
}

exports.getRestaurantById = (req,res)=>{
    const id = req.params.id;
    repo.showById(id,(data)=>{
        res.send(data);
    });
}

exports.getRestaurantByLocation = (req,res)=>{
    const location = (req.params.location).charAt(0).toUpperCase()+(req.params.location).slice(1);
    repo.showByLocation(location,(data)=>{
        res.send(data);
    });
}

exports.getRestaurantByName = (req,res)=>{
    names=req.params.name;
    repo.showByName(names,(data)=>{
        res.send(data);
    })
}

exports.getByFilter = (req,res)=>{
    const params = url.parse(req.url, true).query;
    const cuisine = req.body.cuisine;
    // if(!params.name){
    //     repo.showByFilter(params.location,"",(data)=>{
    //         res.send(data);
    //     })
    // }
    // else{
        repo.showByFilter(params.location,params.name,params.mealtype,cuisine,params.lcost,params.hcost,params.page,params.sort,(data)=>{
            res.send(data);
        })
    // }
}

exports.updateRestaurant = (req,res)=>{
    const newRestaurantUpdate = new Restaurant(req.body._id,req.body.name,req.body.address,req.body.city);
    repo.update(newRestaurantUpdate, ()=>{
        repo.showById(newRestaurantUpdate.id,(data)=>{
            res.send(data);
        });
    });
}

exports.deleteRestaurant = (req,res)=>{
    const id = req.params.id;
    repo.deleteById(id,(data)=>{
        res.send(data);
    })
}
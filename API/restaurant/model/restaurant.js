// class Restaurant{
//     constructor(id,name,address,city){
//         this.id=id;
//         this.name=name;
//         this.address=address;
//         this.city=city;
//     }
// }

class Restaurant{
    constructor(id,name,city_name,city,area,locality,thumb,cost,address,type,Cuisine){
        this.id=id;
        this.name=name;
        this.city_name=city_name;
        this.city=city;
        this.area=area;
        this.locality=locality;
        this.thumb=thumb;
        this.cost=cost;
        this.address=address;
        this.type=type;
        this.Cuisine=Cuisine;
    }
}

module.exports = Restaurant;
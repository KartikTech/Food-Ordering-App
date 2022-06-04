class Menu{
    constructor(name, price, restaurantID, detail, imageURL, isVeg){
        this.name=name;
        this.price = price;
        this.restaurantID = restaurantID;
        this.detail = detail;
        this.imageURL= imageURL;
        this.isVeg = isVeg;
    }
}

module.exports = Menu;
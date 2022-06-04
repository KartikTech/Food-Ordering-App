import "./restaurant-card.css";
// import {useNavigate} from 'react-router-dom';

import React from 'react';

function Restaurant_card(props) {
    const restaurant = props.item;
    // const navigate = useNavigate();

    // const redirectToRestaurant = (event)=>{
    //     navigate('restaurant/'+event);
    // }

    const url=`http://localhost:3000/restaurant/${restaurant._id}`;
    
  return (
      <a href={url}>
      <div className="dish">
                    <div className="flex1">
                        <img src={restaurant.thumb} className="img1" alt="image1"></img>
                        <div>
                            <div className="dish_name">{restaurant.name}</div>
                            <div className="addr_u">{restaurant.locality}</div>
                            <div className="addr_l">{restaurant.address}</div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="flex1">
                        <div className="description1">
                            CUISINES:<br/>
                            COST FOR TWO:
                        </div>
                        <div className="description2">
                            Bakery<br/>
                            ₹ {restaurant.cost}
                        </div>
                    </div>
                </div></a>);
}

export default Restaurant_card;

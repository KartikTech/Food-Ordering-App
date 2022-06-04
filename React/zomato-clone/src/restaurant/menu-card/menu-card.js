import React, { useState } from 'react'
import './menu-card.css'

function Menu_card(props) {
    const dish=props.dish;
    const [quantity,setQuantity]=useState(0);
  return (
    <div className='container'>
        <div className='row ps-3 pe-4 border-bottom pt-4 pb-4'>
            <div className='col-8'>
                <span className='dish-name'>{dish.name}</span><img className='ms-2 veg-nonveg' src="https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png" hidden={!dish.isVeg} alt="..."/><img className='ms-2 veg-nonveg' src="https://www.indiafilings.com/learn/wp-content/uploads/2016/01/Non-Veg-Symbol.jpg" hidden={dish.isVeg} alt="..."/><br/>
                <span className='dish-price'>₹{dish.price}</span><br/>
                <span className='dish-desc'>{dish.detail}</span>
            </div>
            <div className='col-4 align-self-center'>
                <div className='position-relative dish-img float-end'>
                    <img className='dish-img rounded' src={dish.imageURL} alt=''/>
                    <div className='position-absolute top-100 start-50 translate-middle quantity d-flex'>
                        <button className='remove float-start' onClick={()=>{
                            if(quantity>0){
                                setQuantity(quantity-1);
                                props.remove(dish.price);
                            }
                        }}>-</button>
                        <span className='dish-quantity'>{quantity}</span>
                        <button className='add float-end' onClick={()=>{
                            setQuantity(quantity+1);
                            props.add(dish.price);}}>+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Menu_card;

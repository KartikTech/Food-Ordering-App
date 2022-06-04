import "./restaurant-details.css";

import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from "../../home/header/header";
import MenuModal from "../menu-modal/menu-modal";
import UserdetailModal from "../userdetails-modal/userdetail-modal";

function Restaurant_details() {

  const [restaurant, setRestaurant] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [price, setPrice] = useState(0);
  const {id} = useParams();

  useEffect(()=>{
    fetch('http://localhost:3200/api/restaurant/'+id)
    .then((res)=>res.json())
    .then((result)=>{
        setRestaurant(result);
    })
},[id]);

  function getPrice(price){
    setPrice(price);
  }

  console.log(price);

  return (
    <div className="mb-5">
      <Header />
      <div className='container mt-5 px-5 position-relative'>
      <div className='row'>
        <div className="col-12">
        {
          restaurant ? <img src={restaurant.thumb} className="img-fluid img" alt="..."></img>:<div class="d-flex justify-content-center text-danger">
          <div class="spinner-border mt-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        }
        <MenuModal restname={restaurant ? restaurant.name : ''} restid={id} show={modalShow} onHide={()=>setModalShow(false)} onshow={()=>setModalShow2(true)} price={(x)=>getPrice(x)}/>
        <UserdetailModal restname={restaurant ? restaurant.name : ''} show={modalShow2} onHide={()=>setModalShow2(false)} price={price}/>
        </div>
      </div>
      <div className="mt-4 restName">{restaurant ? restaurant.name : ''}</div>
      <button className="btn btn-danger float-end" onClick={()=>{setModalShow(true)}}>Place Online Order</button>
      <ul className="nav nav-tabs mt-4" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
            <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
        </li>
        <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
        </li>
      </ul>
        <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
            <div className="mt-4 overview ps-3">
                About this place
            </div>
            <div className="ps-3 mt-5 detail">Cuisine</div>
            <div className="mt-2 ps-3 detail_info">{restaurant ? restaurant.Cuisine.map(x=>x.name).join(", ") : ''}</div>
            <div className="ps-3 mt-4 detail">Average Cost</div>
            <div className="mt-2 ps-3 detail_info">₹{restaurant ? restaurant.cost : ''} for two people (approx.)</div>
        </div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <div className="mt-4 mb-2 ps-3">
                Phone Number
            </div>
            <span className="number ps-3">+91 9734748474</span>
            <div className="mt-4 overview ps-3">
              {restaurant ? restaurant.name : ''}
            </div>
            <div className="row ps-3">
                <div className="col-5 address">
                {restaurant ? restaurant.address : ''}
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurant_details;
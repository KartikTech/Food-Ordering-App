import React, { useEffect, useState } from 'react'
import LoginModal from '../../home/login-modal/login-modal';
import SignupModal from '../../home/signup-modal/signup-modal';
import MealtypeCard from '../mealtype-card/mealtype-card';
import "./homepage-details.css";

function Homepage_details() {

const [mealTypes, setMealTypes]=useState([]);
const [location, setLocation]=useState("")
const [showSignUp, setShowSignUp] = useState(false);
const [showLogin, setShowLogin] = useState(false);
const [isLogin, setIsLogin]=useState(sessionStorage.getItem('isLogin')==='true'?true:false);
const username = sessionStorage.getItem('username');

useEffect(()=>{
  fetch('http://localhost:3200/api/restaurant/mealtype')
  .then(res=>res.json())
  .then(mealtypes=>setMealTypes(mealtypes));
},[])

function handleChange(event){
  setLocation(event.target.value);
}

function getIsLogin(res){
  setIsLogin(res);
}

let header=null;

if(isLogin || sessionStorage.getItem('isLogin')==='true'){
  header=
  <div className="col-12 d-flex justify-content-end mt-4">
    <button type="button" className="btn btn-link text-decoration-none text-white me-1 d-none d-md-block btn-login" onClick={()=>{sessionStorage.setItem('isLogin',false);setIsLogin(false)}}>Logout</button>
    <button type="button" className="btn btn-outline-white me-5 d-none d-md-block">Hi! {username}</button>
  </div>
}
else{
  header=
  <div className="col-12 d-flex justify-content-end mt-4">
    <button type="button" className="btn btn-link text-decoration-none text-white me-1 d-none d-md-block btn-login" onClick={()=>setShowLogin(true)}>Login</button>
    <button type="button" className="btn btn-outline-white me-5 d-none d-md-block" onClick={()=>setShowSignUp(true)}>Create an account</button>
  </div>
}

console.log(location)
  return (
    <div>
        <SignupModal onHide={()=>setShowSignUp(false)} show={showSignUp}/>
        <LoginModal onHide={()=>setShowLogin(false)} show={showLogin} setLogin={getIsLogin}/>
        <div className="container-fluid jumbotron p-0 h-75">
    <div className="gradient h-100">
      <div className="row justify-content-center">
        {header}
        <div className="col-12 align-middle rounded-circle text-center bg-white logo2">e!</div>
        <div className="col-10 col-md-12 text-center text-white mb-4 mb-md-5 h1">
          Find the best restaurants, cafés, and bars
        </div>
        <div className="mb-3 col-md-3 col-9 position-relative">
          <input type="name" className="form-control rounded-0 p-2 p-md-2" id="exampleFormControlInput1" placeholder="Please type a location" value={location} onChange={(event)=>handleChange(event)}/>
          <div className="w-100 position-relative d-none">
            <div className="position-absolute bg-white mt-1 top-100 w-100 p-3 p-md-3 z-1 shadow">
              <div className="ms-1 text-black-50 fs-15">Sarjapur Road, Bengaluru</div>
              <div className="ms-1 mt-3 mt-md-2 text-black-50 fs-15">HSR Layout, Bengaluru</div>
              <div className="ms-1 mt-3 mt-md-2 text-black-50 fs-15">Kormangala, Bengaluru</div>
              <div className="ms-1 mt-3 mt-md-2 text-black-50 fs-15">Jay Nagar, Bengaluru</div>
            </div>
          </div> 
        </div>
        <div className="col-md-5 col-9 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-white rounded-0 p-md-2" id="basic-addon1"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control border-white rounded-0 p-md-2" placeholder="Search for restaurants" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
          <div className="row">
            <div className="col-8 ms-2 mt-5 search-title">
              <span className="h3 fw-bold">Quick Searches</span>
            </div>
            <div className="col-10 mt-2 ms-2">
              <span className="text-black-50">Discover restaurants by type of meal</span>
            </div>
          </div>
          <div className="row justify-content-center justify-content-md-start mt-4">
          {
            mealTypes.length>0 && mealTypes.map(r=><MealtypeCard mealtype={r} city={location}/>)
          }
          </div>
        </div>
    </div>
  )
}

export default Homepage_details;
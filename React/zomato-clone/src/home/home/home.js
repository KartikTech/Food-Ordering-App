import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Header from '../header/header';
import Filter from '../side-filter/side-filter';
import RestaurantCard from '../restaurant-card/restaurant-card';
import Pagination from '../pagination/pagination';
import './home.css';
import axios from 'axios'
import NotfoundCard from '../notfound-card/notfound-card';

function Home() {

    const [restaurants, setRestaurants]=useState([]);
    
    const [pages, setPages]=useState(0);
    const [sort, setSort]=useState("");
    const [cuisine, setCuisine]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [lcost, setLcost]=useState("");
    const [hcost, setHcost]=useState("");
    const [isLoading, setIsLoading]=useState(false);

    var {location}=useParams("");
    const {mealtype}=useParams("");
    if(typeof location=='undefined'){
        location='';
    }
    const [city, setCity]=useState(location);

    console.log(cuisine)

    useEffect(()=>{
        setIsLoading(true);
        axios.post('http://localhost:3200/api/restaurant/filter?location='+city+'&mealtype='+mealtype+'&lcost='+lcost+'&hcost='+hcost+'&page='+currentPage+'&sort='+sort,{cuisine})
        .then((res)=>res.data)
        .then((result)=>{
            if(location!==''){
                setCity(city.charAt(0).toUpperCase() + city.slice(1));
            }
            setRestaurants(result[0]);
            setPages(Math.ceil(result[1]/2));
        })
        .finally(()=>{setIsLoading(false)})
},[location,mealtype,currentPage,sort,city,hcost,lcost,cuisine])

    console.log(pages)

    function updatePage(event){
        const pageNo = event.target.textContent;
        setCurrentPage(parseInt(pageNo));
    }

    function next(){
        if(currentPage<pages){
            setCurrentPage((prevState)=>prevState+1);
        }
    }

    function previous(){
        if(currentPage>1){
            setCurrentPage((prevState)=>prevState-1);
        }
    }

    function filterRestaurant(event){
        const location = event.target.value;
        setCity(location);
    }

    function filterByPrice(event){
        const l = (event.target.value.split(" to ", 2))[0];
        const h = (event.target.value.split(" to ", 2))[1];
        setLcost(l);
        setHcost(h);
    }

    function sortRestaurant(event){
        setCurrentPage(1);
        setSort(event.target.value);
    }

    function filterByCuisine(event){
        if(event.target.checked){
            setCuisine([...cuisine,parseInt(event.target.value)]);
          }
          else if(!event.target.checked){
            setCuisine(cuisine.filter((e)=>e!==parseInt(event.target.value)));
          }
    }


  return (
      <div>
          <Header />
          <div className='heading'>{mealtype.charAt(0).toUpperCase() + mealtype.slice(1)} Places in {city===''?'India':city}</div>
          <div className='row'>
              <div className='col-md-4'><Filter change={filterRestaurant} select={sortRestaurant} range={filterByPrice} city={location} cuisine={filterByCuisine}/></div>
              <div className='col-md-8 mb-5'>
                  {
                      isLoading ? <div className="d-flex justify-content-center text-danger">
                      <div className="spinner-border mt-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>: ((restaurants.length>0)?restaurants.map(r=><RestaurantCard item={r}/>):<NotfoundCard />)
                  }
                  <Pagination page={pages} update={updatePage} next={next} previous={previous}/>
              </div>
          </div>
      </div>
  );
}

export default Home;
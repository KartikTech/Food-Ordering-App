import "./side-filter.css"

import React, { useState, useEffect } from 'react';

function Side_filter(props) {

    const [locations, setLocations] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3200/api/restaurant/location/')
        .then((res)=>res.json())
        .then((result)=>{
            setLocations(result.sort());
        })
    },[])

  return (
  <>
            <div className="filter">
                <div className="filter_span">Filters</div>
                <div className="filter_type">Select Location</div>
                <select className="form-select mx-auto w-75" onChange={(event)=>props.change(event)} name="Select Location">
                    <option className="d" disabled selected>Select location</option>)
                    {
                        locations.length>0 && 
                        locations.map(r=>{
                        return(<option value={r} className="d" selected={r===props.city}>{r}</option>)})
                    }
                </select>
                <div className="filter_type m-22">Cuisine</div>
                <input type="checkbox" id="chk1" className="k-checkbox" value="1" onChange={event=>props.cuisine(event)}/><label className="chk" htmlFor="chk1">North Indian</label><br/>
                <input type="checkbox" id="chk2" className="k-checkbox" value="2" onChange={event=>props.cuisine(event)}/><label className="chk" htmlFor="chk1">South Indian</label><br/>
                <input type="checkbox" id="chk3" className="k-checkbox" value="3" onChange={event=>props.cuisine(event)}/><label className="chk" htmlFor="chk1">Chinese</label><br/>
                <input type="checkbox" id="chk4" className="k-checkbox" value="4" onChange={event=>props.cuisine(event)}/><label className="chk" htmlFor="chk1">Fast Food</label><br/>
                <input type="checkbox" id="chk5" className="k-checkbox" value="5" onChange={event=>props.cuisine(event)}/><label className="chk" htmlFor="chk1">Street Food</label>
                <div className="filter_type">Cost For Two</div>
                <input type="radio" name="rad1" className="k-radio" value="0 to 500" onChange={event=>props.range(event)}/><label className="rad" htmlFor="rad1">Less than ₹ 500</label><br/>
                <input type="radio" name="rad1" className="k-radio" value="500 to 1000" onChange={event=>props.range(event)}/><label className="rad" htmlFor="rad2">₹ 500 to ₹ 1000</label><br/>
                <input type="radio" name="rad1" className="k-radio" value="1000 to 1500" onChange={event=>props.range(event)}/><label className="rad" htmlFor="rad3">₹ 1000 to ₹ 1500</label><br/>
                <input type="radio" name="rad1" className="k-radio" value="1500 to 2000" onChange={event=>props.range(event)}/><label className="rad" htmlFor="rad4">₹ 1500 to ₹ 2000</label><br/>
                <input type="radio" name="rad1" className="k-radio" value="2000 to 3000" onChange={event=>props.range(event)}/><label className="rad" htmlFor="rad5">₹ 2000+</label>
                <div className="sort_span">Sort</div>
                <input type="radio" name="rad2" className="k-radio" value="1" onChange={event=>props.select(event)}/><label className="rad" htmlFor="rad1">Price low to high</label><br/>
                <input type="radio" name="rad2" className="k-radio" value="-1" onChange={event=>props.select(event)}/><label className="rad" htmlFor="rad1">Price high to low</label><br/>
            </div>
            <div className="visible1 align">
                <select name="Filters" className="m-filter">
                    <option value="1" className="padding">Filters/Sort</option>
                </select>
            </div>
  </>);
}

export default Side_filter;

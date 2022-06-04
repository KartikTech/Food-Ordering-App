import React from 'react'

function Mealtype_card(props) {
    const mealtypes=props.mealtype;
    const divStyle={
        'max-width': '540px'
    }
    
    const slogan = {'breakfast':'Start your day with exclusive breakfast options',
    'dinner':'End your beautiful night with exclusive dinner options',
    'lunch':'Start your beautiful day with exclusive lunch options',
    'snacks':'Enjoy your beautiful evening with exclusive snacks options',
    'drinks':'Enjoy your big occasions with exclusive drinks options',
    'nightlife':'End your night with exclusive nightlife options'
    }
    
    const imageUrl = {
      'breakfast':require("./images/breakfast.png"),
      'dinner':require('./images/dinner.png'),
      'lunch':require('./images/lunch.png'),
      'snacks':require('./images/snacks.png'),
      'drinks':require('./images/drinks.png'),
      'nightlife':require('./images/nightlife.png'),
    }

    var url;
    if(props.city){
      url=`/${props.city}/${mealtypes}`;
    }
    else{
      url=`/${mealtypes}`;
    }
    
  return (
    <div className="offset-1 offset-md-1 col-11 col-md-6 col-lg-4 card-height">
    <a href={url}>
    <div className="card rounded-0 mb-4 border-0" style={divStyle}>
      <div className="row g-0">
        <div className="col-5">
          <img src={imageUrl[mealtypes]} className="img-fluid dish-image" alt="..."/>
        </div>
        <div className="col-7">
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">{mealtypes.charAt(0).toUpperCase() + mealtypes.slice(1)}</h5>
            <p className="card-text">{slogan[mealtypes]}</p>
          </div>
        </div>
      </div>
    </div>
    </a>
  </div>
  )
}

export default Mealtype_card;

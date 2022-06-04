import "./menu-modal.css"
import {Modal} from 'react-bootstrap';
import MenuCard from '../menu-card/menu-card';
import { useEffect, useState } from "react";

function MenuModal(props) {
  const [menu,setMenu]=useState([]);
  const [price,setPrice]=useState(0);
  useEffect(()=>{
      fetch('http://localhost:3200/api/menu/restaurant/'+props.restid)
      .then((res)=>res.json())
      .then((result)=>{
        setMenu(result);
      })
  })

  function decreaseQuantity(price){
    setPrice((prevState)=>prevState-price);
  }

  function addQuantity(price){
    setPrice((prevState)=>prevState+price);
  }
  
    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered dialogClassName="my-modal"
          onHide={()=>{setPrice(0);props.onHide();}}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='title ps-4'>
              {props.restname}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              menu.length>0 ? menu.map(r=><MenuCard dish={r} remove={decreaseQuantity} add={addQuantity}/>) : <span className="ms-4">No items</span>
            }
          </Modal.Body>
          <Modal.Footer className='footer'>
            <span className="me-auto sub-total ps-4">Subtotal&nbsp;&nbsp;&nbsp;&nbsp;₹ {price}</span>
            <button className='btn btn-danger me-4 px-4' onClick={()=>{
              props.onHide();
              props.onshow();
              props.price(price);
            }}>Pay Now</button>
          </Modal.Footer>
        </Modal>
      );
}

export default MenuModal;

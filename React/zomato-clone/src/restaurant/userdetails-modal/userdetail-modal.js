import "./userdetail-modal.css"
import {Form, Modal} from 'react-bootstrap';
import { useState } from "react";

function UserdetailModal(props) {

  const [name, setName]=useState("");

  function handleInput(e){
    setName(e.target.value);
  }

  function isDate(val){
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }
  
  function isObj(val){
    return typeof val === 'object'
  }
  
  function stringifyValue(val){
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
  }
  
  function buildForm({ action, params }){
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
  
    Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', stringifyValue(params[key]))
        form.appendChild(input)
    })
  
    return form
  }
  
  function post(details){
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }
  
  function getData(data){
    return fetch(`http://localhost:3200/api/payment`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
  }
  
  function makePayment(data){
    getData(data).then(response => {
        var information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        post(information)
    })
  }
  
    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered dialogClassName="my-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='title ps-4'>
              {props.restname}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="px-4">
                <Form.Group className="mb-4" controlId="formBasicName">
                    <Form.Label className="label">Name</Form.Label>
                    <Form.Control type="name" onChange={(e)=>handleInput(e)} value={name} placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicNumber">
                    <Form.Label className="label">Mobile Number</Form.Label>
                    <Form.Control type="contact" placeholder="Enter your number" />
                </Form.Group>
                
                <Form.Group className="mb-5" controlId="floatingTextarea2" label="Address">
                    <Form.Label className="label">Address</Form.Label>
                    <Form.Control
                    as="textarea"
                    placeholder="Enter your address"
                    style={{ height: '160px' }}
                    />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className='footer'>
            <button className='btn btn-danger px-4 me-4' onClick={()=>{props.onHide();makePayment({amount:props.price,email:name+'@gmail.com'})}}>Proceed</button>
          </Modal.Footer>
        </Modal>
      );
}

export default UserdetailModal;

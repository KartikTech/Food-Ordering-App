import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function SignupModal(props) {

    const [state, setState]=useState({
        username: '',
        email: '',
        password: ''
    })

    function handleInput(event){
        setState({...state, [event.target.name]:event.target.value})
    }

    function submit(){
        if(state.username==='' && state.email==='' && state.password===''){
            alert('Enter all fields');
        }
        else if(state.username==='' && state.email===''){
            alert('Enter all fields');
        }
        else if(state.username==='' && state.password===''){
            alert('Enter all fields');
        }
        else if(state.email==='' && state.password===''){
            alert('Enter all fields');
        }
        else if(state.username===''){
            alert('Enter all fields');
        }
        else if(state.email===''){
            alert('Enter all fields');
        }
        else if(state.password===''){
            alert('Enter all fields');
        }
        else{
            axios.post('http://localhost:3200/api/user',state)
            .then(()=>{
                setState({
                    username: '',
                    email: '',
                    password: ''
                })
                props.onHide();
            })
        }
    }

  return (
    <Modal centered show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div class="form-group mb-3">
                <label for="exampleInputUsername">Username</label>
                <input type="text" class="form-control" name="username" id="exampleInputUsername" onChange={(e)=>handleInput(e)} value={state.username} placeholder="Enter Username"/>
            </div>
            <div class="form-group mb-3">
                <label for="exampleInputEmail">Email</label>
                <input type="email" class="form-control" name="email" id="exampleInputEmail" onChange={(e)=>handleInput(e)} value={state.email} placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" name="password" id="exampleInputPassword1" onChange={(e)=>handleInput(e)} value={state.password} placeholder="Password"/>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={submit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default SignupModal;

import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';

function LoginModal(props) {

    const [state, setState]=useState({
        email: '',
        password: ''
    })

    function handleInput(event){
        setState({...state, [event.target.name]:event.target.value})
    }

    function submit(){
        if(state.email==='' && state.password===''){
            alert('Enter all fields');
        }
        else if(state.username===''){
            alert('Enter all fields');
        }
        else if(state.email===''){
            alert('Enter all fields');
        }
        else{
            axios.post('http://localhost:3200/api/user/login',state)
            .then((res)=>{
                if(Object.keys(res.data).length===4){
                    props.setLogin(true);
                    sessionStorage.setItem('username',res.data.username);
                    sessionStorage.setItem('isLogin',true);
                    setState({
                        email: '',
                        password: ''
                    })
                    props.onHide();
                }
                else{
                    alert('Invalid Credentials')
                }
            })
        }
    }

    return (
      <Modal centered show={props.show} onHide={props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
              <div class="form-group mb-3">
                  <label for="exampleInputEmail">Email</label>
                  <input type="email" class="form-control" name='email' id="exampleInputEmail" onChange={(e)=>handleInput(e)} value={state.email} placeholder="Enter email"/>
              </div>
              <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" name='password' id="exampleInputPassword1" onChange={(e)=>handleInput(e)} value={state.password} placeholder="Password"/>
              </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={submit}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
  
  export default LoginModal;
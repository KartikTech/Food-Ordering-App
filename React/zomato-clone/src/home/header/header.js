import "./header.css"
import React, { useState } from 'react';
import LoginModal from '../../home/login-modal/login-modal';
import SignupModal from '../../home/signup-modal/signup-modal';

function Header() {

const [showSignUp, setShowSignUp] = useState(false);
const [showLogin, setShowLogin] = useState(false);
const [isLogin, setIsLogin]=useState(sessionStorage.getItem('isLogin')==='true'?true:false);
const username = sessionStorage.getItem('username');

function getIsLogin(res){
    setIsLogin(res);
  }

  let header=null;

  if(isLogin || sessionStorage.getItem('isLogin')==='true'){
    header=
        <div>
            <div className="login" onClick={()=>{sessionStorage.setItem('isLogin',false);setIsLogin(false)}}>
                 <span className="login_span">Logout</span>
            </div>
            <div className="create">
                Hi! {username}
            </div>
        </div>
  }
  else{
    header=
        <div>
            <div className="login" onClick={()=>setShowLogin(true)}>
                 <span className="login_span">Login</span>
            </div>
            <div className="create" onClick={()=>setShowSignUp(true)}>
                Create an account
            </div>
        </div>
  }

  return ( 
      <div className="header">
                <SignupModal onHide={()=>setShowSignUp(false)} show={showSignUp}/>
                <LoginModal onHide={()=>setShowLogin(false)} show={showLogin} setLogin={getIsLogin}/>
                <a href="/">
                <div className="logo">
                    <span className="e">e!</span>
                </div>
                </a>
                {header}
        </div>);
}

export default Header;

const User = require('../model/user');
const repo = require('../repositories/user');

exports.addUser=(req,res)=>{
    const {username,email,password} = req.body;
    const newUser = new User(username,email,password);
    repo.add(newUser, ()=>res.send("User Added !!"))
}

exports.getUser=(req,res)=>{
    const {email,password}=req.body;
    repo.show(email,password,(data)=>res.send(data));
}
const http = require('http');
const { env } = require('process');

const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end("Home");
    }
    if(req.url==='/hi'){
        res.end("Hello from Node.Js");
    }
});

server.listen(3200);

console.log("Server is running on port 3200");
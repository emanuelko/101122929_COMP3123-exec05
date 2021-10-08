const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const user = require('./user.json')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + "/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile('./user.json');
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  let username = req.query.username;
  let password = req.query.password;

  if (username === user.username && password === user.password){
    res.send('status: true, message: user is valid')
  }
  else if (username!=user.username){
    res.send('status: false, message: username is invalid')
  }
  else if(password!=user.password){
    res.send('status: false, message: password is invalid')
  }
  

});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let username = req.params.username;
  res.send(`<b>${username} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8089);

console.log('Web Server is listening at port '+ (process.env.port || 8089));
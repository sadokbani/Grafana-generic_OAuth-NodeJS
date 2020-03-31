const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

var cors= require('cors');
const usersRoutes = require("./controller/users");
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/grafnaUser").then(
  () => {
    console.log('connected to database');
  })
  .catch(
    () => {
      console.log('connected failed');
    });

// app.use(cors({
//   origin: 'http://localhost:4200'
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use('/users',usersRoutes);
app.use('/login',(req, res) => {
    let state = encodeURIComponent(req.query.state);
    res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Login Form Tutorial</title>
        <style>
        .login-form {
          width: 300px;
          margin: 0 auto;
          font-family: Tahoma, Geneva, sans-serif;
        }
        .login-form h1 {
          text-align: center;
          color: #4d4d4d;
          font-size: 24px;
          padding: 20px 0 20px 0;
        }
        .login-form input[type="password"],
        .login-form input[type="text"] {
          width: 100%;
          padding: 15px;
          border: 1px solid #dddddd;
          margin-bottom: 15px;
          box-sizing:border-box;
        }
        .login-form button {
          width: 100%;
          padding: 15px;
          background-color: #535b63;
          border: 0;
          box-sizing: border-box;
          cursor: pointer;
          font-weight: bold;
          color: #ffffff;
        }
        </style>
      </head>
      <body>
        <div class="login-form">
          <h1>Login Form</h1>
          
          
            <form action="/users/login/${state}"  method="post">
                <input type="text" name="email" placeholder="Email" /><br />
                <input type="password" name="password" placeholder="Password" /><br />
                <button>Log In</button>
                </form><br />
                <button onclick="location.href='/signup';">Sign Up</button>
                </div>
              </body>
            </html>
      `);
})

app.use('/signup',(req, res) => {

  res.end(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Login Form Tutorial</title>
      <style>
      .login-form {
        width: 300px;
        margin: 0 auto;
        font-family: Tahoma, Geneva, sans-serif;
      }
      .login-form h1 {
        text-align: center;
        color: #4d4d4d;
        font-size: 24px;
        padding: 20px 0 20px 0;
      }
      .login-form input[type="password"],
      .login-form input[type="text"] {
        width: 100%;
        padding: 15px;
        border: 1px solid #dddddd;
        margin-bottom: 15px;
        box-sizing:border-box;
      }
      .login-form button {
        width: 100%;
        padding: 15px;
        background-color: #535b63;
        border: 0;
        box-sizing: border-box;
        cursor: pointer;
        font-weight: bold;
        color: #ffffff;
      }
      .login-form select {
        width: 100%;
        padding: 15px;
        border: 1px solid #dddddd;
        margin-bottom: 15px;
        box-sizing:border-box;
      }
      </style>
    </head>
    <body>
      <div class="login-form">
        <h1>SignUp Form</h1>
        
        
          <form action="/users"  method="post">
              <input type="text" name="username" placeholder="Username" /><br />
              <input type="text" name="email" placeholder="Email" /><br />
                <input type="password" name="password" placeholder="Password" /><br />
                <label>Role :</label><br />
                <select name="role" placeholder="Role" >
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              <button>Sign Up</button>
              </form>
              </div>
            </body>
          </html>
    `);
})

app.listen(8000, () => console.log('Server started at port : 8000'));
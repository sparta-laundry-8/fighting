const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const app = express();
const loginRouter = require("./routes/login.js")
const signupRouter = require("./routes/signup.js")

app.use(express.json());
app.use('/api',[loginRouter, signupRouter])

app.listen(3000, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });
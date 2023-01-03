const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const app = express();
const loginRouter = require("./routes/login.js")
const signupRouter = require("./routes/signup.js")
const profileRouter = require("./routes/profile.js")

app.use(express.json());
app.use('/api',[loginRouter, signupRouter, profileRouter])

app.listen(3000, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
  });
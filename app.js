const express = require('express');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const profileRouter = require('./routes/profile');
const laundryRouter = require('./routes/laundry');
const mainRouter = require('./routes/main');
const reviewRouter = require('./routes/review');

app.use(express.static('assets'));

app.use(express.json());
app.use(cookieParser());
app.use('/api', [
  loginRouter,
  signupRouter,
  profileRouter,
  laundryRouter,
  mainRouter,
  reviewRouter,
]);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/assets/main.html');
});

app.listen(3000, () => {
  console.log('서버가 요청을 받을 준비가 됐어요');
});

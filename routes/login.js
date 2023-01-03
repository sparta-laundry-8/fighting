const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier} = require("../models")
// const jwtMiddleware = require("../middlewares/jwt-middleware.js");



const router = express.Router();

// 로그인 페이지
router.get("/login", (req, res) => {
  res.json({Message : "로그인 페이지 입니다. 고객 및 기업으로 로그인 가능합니다."});
});

// Customer 로그인
router.post("/login/customer", async (req, res) => {
  try{
    const { email, password } = req.body;
  
    const customer = await Customer.findOne({ where: { email, password } });
  
    if (!customer) {
      return res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
    }
    const token = jwt.sign({ customerId: Customer.customerId }, "laundry-customer", {expiresIn: "30m"});
    res.cookie("customerId", token)
    res.json({
      token,
    });
  } catch(error) {
    console.error(error),
    res.status(500).json({errorMessage: error.Message})
  }
});

// Supplier 로그인
router.post("/login/supplier", async (req, res) => {
  try{
    const { email, password } = req.body;
  
    const supplier = await Supplier.findOne({ where: { email, password } });
  
    if (!supplier) {
      return res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
    }
    const token = jwt.sign({ supplierId: Supplier.supplierId }, "laundry-supplier", {expiresIn: "30m"});
    res.cookie("supplierId", token)
    res.json({
      token,
    });
  } catch(error) {
    console.error(error),
    res.status(500).json({errorMessage: error.Message})
  }
});

// customer 정보 확인
router.get("/customer", async (req, res) => {
  try{
    const { customerId } = req.cookies;
    const token = jwt.verify(customerId, "laundry-customer");
    if (token) {
      return res.send({customerId});
    }
  } catch(error) {
    console.error(error),
    res.status(500).json({errorMessage: error.Message})
  }
});

router.get("/supplier", async (req, res) => {
  try{
    const supplierId = req.cookies.supplierId
    const token = jwt.verify(supplierId, "laundry-supplier");
    if (token) {
      return res.send({supplierId});
    }
  } catch(error) {
    console.error(error),
    res.status(500).json({errorMessage: error.Message})
  }
});
  

module.exports = router;
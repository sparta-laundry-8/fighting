const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier} = require("../models")
const jwtMiddleware = require("../middlewares/jwt-middleware.js");

const router = express.Router();

// Customer 로그인
router.post("/login/customer", async (req, res) => {
    const { email, password } = req.body;
  
    const customer = await Customer.findOne({ where: { email, password } });
  
    if (!customer) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }
  
    const token = jwt.sign({ customerId: Customer.customerId }, "customer-secret-key");
    res.send({
      token,
    });
  });

// Supplier 로그인
router.post("/login/supplier", async (req, res) => {
    const { email, password } = req.body;
  
    const supplier = await Supplier.findOne({ where: { email, password } });
  
    if (!supplier) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }
  
    const token = jwt.sign({ supplierId: Supplier.supplierId }, "supplier-secret-key");
    res.send({
      token,
    });
  });

//// 내 정보 확인
// router.get("/users/me", jwtMiddleware, async (req, res) => {
//     const { customer } = res.locals;
//     res.send({
//       customer,
//     });
//   });
  

module.exports = router;
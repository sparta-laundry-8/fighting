const { application } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Customer, Supplier } = require('../models');
// customer 인증 미들웨어
const jwtCustomer = require('../middlewares/jwt-customer.js');
// supplier 인증 미들웨어
const jwtSupplier = require('../middlewares/jwt-supplier.js');

const router = express.Router();

// 로그인 페이지
router.get('/login', (req, res) => {
  res.json({
    Message: '로그인 페이지 입니다. 고객 및 기업으로 로그인 가능합니다.',
  });
});

// Customer 로그인
router.post('/login/customer', async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ where: { email, password } });

    if (!customer) {
      return res.status(400).send({
        errorMessage: '이메일 또는 패스워드가 잘못됐습니다.',
      });
    }
    const token = jwt.sign({ customerId: customer.customerId }, 'laundry-customer', {
      expiresIn: '30m',
    });
    if (token) {
      return res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.error(error), res.status(500).json({ errorMessage: error.Message });
  }
});

// Supplier 로그인
router.post('/login/supplier', async (req, res) => {
  try {
    const { email, password } = req.body;

    const supplier = await Supplier.findOne({ where: { email, password } });

    if (!supplier) {
      return res.status(400).send({
        errorMessage: '이메일 또는 패스워드가 잘못됐습니다.',
      });
    }
    const token = jwt.sign({ supplierId: supplier.supplierId }, 'laundry-supplier', {
      expiresIn: '30m',
    });

    if (token) {
      return res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.error(error), res.status(500).json({ errorMessage: error.Message });
  }
});

// ------------------------------------------------------------------------------------------------------//

// customer 정보 확인
router.get('/customer', jwtCustomer, async (req, res) => {
  const { customer } = res.locals;
  console.log(customer);
  res.send({
    customer,
  });
});

// supplier 정보 확인
router.get('/supplier', jwtSupplier, async (req, res) => {
  const { supplier } = res.locals;
  console.log(supplier);
  res.send({
    supplier,
  });
});

module.exports = router;

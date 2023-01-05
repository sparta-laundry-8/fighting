const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Customer, Supplier } = require('../models');
// const jwtMiddleware = require("../middlewares/jwt-middleware.js");

const router = express.Router();

// 회원가입 페이지
router.get('/signup', (req, res) => {
  res.json({
    Message: '회원가입 페이지 입니다. 고객 및 기업으로 회원가입 가능합니다.',
  });
});

// Customer 회원가입
router.post('/signup/customer', async (req, res) => {
  try {
    const { nickname, email, password, confirmPassword, cellphone } = req.body;

    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
      });
      return;
    }

    const existCustomer = await Customer.findAll({
      where: {
        [Op.or]: [{ nickname }, { email }],
      },
    });
    if (existCustomer.length) {
      res.status(400).send({
        errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
      });
      return;
    }

    await Customer.create({ email, nickname, password, cellphone });

    res.status(201).send({ message: '회원 가입에 성공하였습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.Message });
  }
});

// Supplier 회원가입
router.post('/signup/supplier', async (req, res) => {
  try {
    const { nickname, email, password, confirmPassword, cellphone, address } = req.body;

    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
      });
      return;
    }

    const existSupplier = await Supplier.findAll({
      where: {
        [Op.or]: [{ nickname }, { email }],
      },
    });
    if (existSupplier.length) {
      res.status(400).send({
        errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.',
      });
      return;
    }

    await Supplier.create({ email, nickname, password, cellphone, address });

    res.status(201).send({ message: '회원 가입에 성공하였습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.Message });
  }
});

module.exports = router;

const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier} = require("../models")
// customer 인증 미들웨어
const jwtCustomer = require("../middlewares/jwt-customer.js");
// supplier 인증 미들웨어
const jwtSupplier = require("../middlewares/jwt-supplier.js");

const router = express.Router();

// 고객용 세탁 서비스 신청 페이지
router.post('/laundry/apply', jwtCustomer, async(req, res) => {

});
// 고객용 신청한 세탁 서비스 상태 파악 페이지
router.get('/laundry/apply/:customerId', jwtCustomer, async (req, res) => {

});
// 기업용 고객이 신청한 세탁물 서비스 목록
router.get('/laundry/list', jwtSupplier, async, (req, res) => {

});
module.exports = router;
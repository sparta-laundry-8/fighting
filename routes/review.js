const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier, Laundry} = require("../models")
// customer 인증 미들웨어
const jwtCustomer = require("../middlewares/jwt-customer.js");
// supplier 인증 미들웨어
const jwtSupplier = require("../middlewares/jwt-supplier.js");

const router = express.Router();

// 리뷰 작성 페이지
router.post('/review/:supplierId/:laundryId', jwtCustomer, async (req, res) => {

})
// 리뷰 관리 페이지

module.exports = router;
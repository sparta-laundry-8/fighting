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

router.get("/profile", (req, res) => {
    res.send("마이페이지 입니다. 개인정보 수정이 가능합니다.");
});

router.patch("/profile/:customerId", jwtCustomer, async (req, res) =>{
    try{
        const {customerId} = req.params;
        const {email, nickname, password, address, cellphone} = req.body;

        const existCustomer = await Customer.findOne({
        where: {customerId}
    });
    if (existCustomer) {
        return await Customer.update({email, nickname, password, address, cellphone}, {where: {customerId}}),
        res.status(200).json({message: "수정 완료"});
    } else {
        return res.send("존재하지 않는 아이디입니다.")
    }
    }catch(error) {
        console.error(error);
        res.status(500).json({errorMessage: error.Message});
    }
});

router.patch("/profile/:supplierId", jwtSupplier, async (req, res) => {
    try{
        const {supplierId} = req.params;
        const {email, nickname, password, address, cellphone} = req.body;

        const existSupplier = await Supplier.findOne({
        where: {supplierId}
    });
    if (existSupplier) {
        return await Supplier.update({email, nickname, password, address, cellphone}, {where: {supplierId}}),
        res.status(200).json({message: "수정 완료"});
    } else {
        return res.send("존재하지 않는 아이디입니다.")
    }
    }catch(error) {
        console.error(error);
        res.status(500).json({errorMessage: error.Message});
    }
});

module.exports = router;
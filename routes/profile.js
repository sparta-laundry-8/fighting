const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier} = require("../models")
// const jwtMiddleware = require("../middlewares/jwt-middleware.js");

const router = express.Router();

router.get("/profile", (req, res) => {
    res.send("마이페이지 입니다. 개인정보 수정이 가능합니다.");
});

router.patch("/profile/:customerId", async (req, res) =>{
    try{
        const {customerId} = req.params;
        const {email, nickname, password, confirmPassword, address, cellphone} = req.body;

        const existCustomer = await Customer.findOne({
        where: {customerId}
    });
    if (existCustomer) {
        return await Customer.update({email, nickname, password, confirmPassword, address, cellphone}, {where: {customerId}}),
        res.status(200).json({message: "수정 완료"});
    } else {
        return res.send("존재하지 않는 아이디입니다.")
    }
    }catch {
        console.error(error);
        res.status(500).json({errorMessage: error.Message});
    }
});

router.patch("/profile/:supplierId", async (req, res) => {
    try{
        const {supplierId} = req.params;
        const {email, nickname, password, confirmPassword, address, cellphone} = req.body;

        const existSupplier = await Supplier.findOne({
        where: {supplierId}
    });
    if (existSupplier) {
        return await Supplier.update({email, nickname, password, confirmPassword, address, cellphone}, {where: {supplierId}}),
        res.status(200).json({message: "수정 완료"});
    } else {
        return res.send("존재하지 않는 아이디입니다.")
    }
    }catch {
        console.error(error);
        res.status(500).json({errorMessage: error.Message});
    }
});

module.exports = router;
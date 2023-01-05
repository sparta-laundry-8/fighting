const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier, Laundry, Review} = require("../models")
// customer 인증 미들웨어
const jwtCustomer = require("../middlewares/jwt-customer.js");
// supplier 인증 미들웨어
const jwtSupplier = require("../middlewares/jwt-supplier.js");

const router = express.Router();

// 리뷰 작성 페이지
router.post('/review/:supplierId/:laundryId', jwtCustomer, async (req, res) => {
    try{
        const customer = res.locals.customer;
        const customerId = customer.customerId;
        const nickname = customer.nickname

        const {supplierId, laundryId} = req.params;
        const {content} = req.body;
        try{
            await Review.create({customerId, supplierId, laundryId, content, nickname});
            return res.status(200).json({Message: "리뷰작성이 완료되었습니다."})
        } catch {
            if(!customerId || !supplierId || !laundryId || !content || !nickname) {
                return res.status(400).json({Message : "데이터 형식이 잘못되었습니다."});
            }
        }
    } catch(error) {
        console.error(error),
        res.status(500).json({errorMessage: error.Message});
      };
})
// 리뷰 삭제 페이지
router.delete('/review/:supplierId/:laundryId/:customerId', jwtCustomer, async (req, res) => {
    try {
        const customer = res.locals.customer;
        const customerId = customer.customerId;

        const {supplierId, laundryId} = req.params;

        try{
            await Review.destroy({where : {customerId}});
            return res.status(200).json({Message : "리뷰 삭제가 완료되었습니다."})
        } catch {
            if(!supplierId || !laundryId) {
                return res.status(400).json({Message : "데이터 형식이 잘못되었습니다."});
            }
        }
    } catch(error) {
        console.error(error),
        res.status(500).json({errorMessage: error.Message});
      };
})

module.exports = router;
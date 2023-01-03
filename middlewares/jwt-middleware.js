// const jwt = require("jsonwebtoken");
// const { Customer, Supplier } = require("../models");

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   const [authType, authToken] = (authorization || "").split(" ");

//   if (!authToken || authType !== "Bearer") {
//     res.status(401).send({
//       errorMessage: "로그인 후 이용 가능한 기능입니다.",
//     });
//     return;
//   }
  
//   try {
//     const { customerId } = jwt.verify(authToken, "customer-secret-key");
//     Customer.findByPk(customerId).then((customer) => {
//       res.locals.customer = customer;
//       next();
//     });
//     const { supplierId } = jwt.verify(authToken, "supplier-secret-key");
//     Supplier.findByPk(supplierId).then((supplier) => {
//       res.locals.supplier = supplier;
//       next();
//     });
//   } catch (err) {
//     res.status(401).send({
//       errorMessage: "로그인 후 이용 가능한 기능입니다.",
//     });
//   }
// };
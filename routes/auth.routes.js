const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")
let authController = require("../controllers/auth.controller")

//define router
// "/register" --> sử dụng user.controller createUser
router.get("/register", authController.renderRegister);
router.post("/register", userController.createOne);

// "/login" --> Tạo controller cho auth.controller với tên là login
// thực hiện tìm kiếm trong db xem có user không
// nếu không -> trả về người dùng không tồn tại
// nếu có --> check pass
//        --> nếu đúng trả về res.json({message: "Login successfully"})
//        --> nếu sai trả về res.json({message: "wrong password"})
router.get("/login", authController.renderLogin);
router.post("/login", authController.login)

router.get("/logout", authController.logout);

module.exports = router;
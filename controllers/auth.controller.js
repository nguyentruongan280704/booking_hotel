const db = require("../models/db")
const bcrypt = require('bcrypt'); // thư viện mã hóa password
const saltRounds = 10;

// module.exports.getAll = (req, res) => {
//     let userInput = req.body.username;
//     let passwordInput = req.body.password;
//     db.execute("SELECT * FROM tbl_users WHERE username = ?", [userInput])
//         .then((data) => {
//             // console.log(data);
//             if (data[0].length != 0) {
//                 db.execute("SELECT * FROM tbl_users WHERE password = ?", [passwordInput])
//                     .then((data) => {
//                         res.status(200).json(
//                             // data: data[0],
//                             "Login successfully"
//                         );
//                     })
//                     .catch((err) => console.log("Sai mật khẩu"));
//             } 
//         })
//         .catch((err) => console.log("Tài khoản không tồn tại"));
// };

module.exports.renderRegister = (req, res) => {
   res.send("<h1>This is register page</h1>")
};
module.exports.renderLogin = (req, res) => {
   res.render("login");
};


module.exports.login = (req, res) => {
   // console.log(req.body);
   let { email, password } = req.body;
   if (!email || !password) {
      return res.status(500).json({
         message: "Invalid email or password"
      })
   }
   db.execute("SELECT * FROM tbl_users WHERE email=?", [email])
      .then((data) => {
         console.log(data);
         let [rows] = data;
         let find = rows[0];
         if (!find) {
            res.status(404).json({
               message: "user is not exist"
            })
         } else {
            //check password
            console.log(find.password)
            let passwordValid = bcrypt.compareSync(password, find.password);
            if (!passwordValid) {
               res.status(404).json({
                  message: "Wrong password"
               })
            } else {
               console.log("Hello")
               res.cookie("userId", find.id, { signed: true });
               res.cookie("role", find.role, { signed: true });

               console.log("Hello")
               res.status(200).json({
                  status: "success",
                  message: "Login successfully"
               })
               // điều hướng người dùng sang trang "/"
               // set header
               // res.redirect // not working after set cookie
               // res.redirect not working after res.cookie (google)
            }
         }
      })
      .catch((err) => {
         console.log(err);
      })
};

module.exports.logout = (req, res) => {
   //clear cookie
   res.clearCookie("userId");

   //logout successfully (Json)
   res.status(200).json({
      message: "Logout successfully"
   })

   //Front-end take message and redirect
}

 // authentication (Xác thực)
 // sesion (Phiên đăng nhập)
 // Cookie
 // Token (JWT - Json web token, Bearer)

 // authentication with Sesion (cookie, JWT ...) express JS

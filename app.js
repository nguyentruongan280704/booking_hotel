const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
port = 3000;
const { requireAuth, notRequireAuth, requireAdmin } = require("./middlewares/auth.middlewares");
const cookieParser = require("cookie-parser");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".jpg";
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({ storage: storage })

// import route
let userRoutes = require("./routes/users.routes");
let authRoutes = require("./routes/auth.routes");
let blogRoutes = require("./routes/blogs.routes");

// view engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// third party
app.use(bodyParser.urlencoded({extended: true})); // form-input (method=post)
app.use(bodyParser.json()); // json (fetch api)
app.use(cors()); // fix cross origin error
app.use(morgan("dev")); // log request on server (for debugging)
app.use(express.static("public")); // hosting static file
app.use(cookieParser("secret"));

// setup route
app.get("/", requireAuth, (req, res) => {
    res.redirect("/users")
});

app.get("/upload", (req, res) => {
    res.render("upload")
})

// An tron
app.get("/upload", (req, res) => {
  res.render("upload")
})

// An tron
app.get("/upload", (req, res) => {
  res.render("upload")
})

app.post("/upload", upload.single('img'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
})

//test thu
app.get("/upload", upload.single('img'), (req, res) => {
  console.log(req.file);
  console.log(req.body);
})

// User route
app.use("/users",requireAuth, userRoutes);

// Auth route
app.use("/auth", notRequireAuth, authRoutes);

// Blogs
app.use("/blogs",requireAuth, blogRoutes);

// Admin route
// app.use("/admin",adminRoutes);

// listen on port
app.listen(port, () => {
    console.log(`Server run on http://127.0.0.1:${port}`);
})

// SQL - Structured quary language (Ngôn ngữ dùng để truy vấn dữ liệu từ db)
// sheet, json (không hỗ trợ nhiều phương thức query, khó scale lên lớn ...)
// -> cần 1 nơi lưu trữ dữ liệu tối ưu hơn, dễ query hơn
// -> SQL là ngôn ngữ dùng để truy vấn vào mySQL

// mySQL là gì? - RBDMS (Relational DB Management System) (Hệ quản trị CSDL quan hệ)
// Dữ liệu sẽ được lưu trữ trong CSDL dưới dạng bảng (table - entity - thực thể)

// Mỗi bảng sẽ có nhiều bản ghi (record) được lưu vào mỗi dòng (row)
// Mỗi dòng (row) sẽ có nhiều thuộc tính (column)

// Trong dự án thực tế, chúng ta sẽ phải thiết kế một bản vẽ CSDL dạng quan hệ
// Bản vẽ cơ sở dữ liệu quan hệ có thể có 1 bảng duy nhất hoặc rất nhiều bảng liên kết với nhau bằng các mối quan hệ
// (1-1, 1-n, n-n)

// SQL:
// - Tạo schema (Tạo db)
// - Tạo bảng (table)
// - Kết nối mySQL đến project Express
// - Mội số cú pháp C/R/U/D để thao tác với bảng

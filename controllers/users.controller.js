const db = require("../models/db")
const bcrypt = require('bcrypt'); // thư viện mã hóa password
const saltRounds = 10;

module.exports.getAll = (req, res) => {
    // page size và curent page index
    // query string

    let  { page_size, page_index } = req.query;
    console.log(page_size, page_index);

    // check nếu bọn này không tồn tại thì trả về page size bản ghi đầu tiên
    page_index = Number(page_index) || 1; // (page_index = page_index ? page_index : 1)
    page_size = Number(page_size) || 5;
    let total = 0;
    //nếu tồn tại thì trả về page size và current page
    // db.execute(`SELECT * FROM tbl_users LIMIT ${page_size} OFFSET ${(page_index - 1)*page_size}`)
    db.execute(`SELECT * FROM tbl_users`)
        .then((data) => {
            // console.log(data);
            let [rows, cols] = data;
            //array destructuring
            // let rows = data[0]
            // let cols = data[1]
            total = rows.length;
            return db.execute(`SELECT * FROM tbl_users LIMIT ${page_size} OFFSET ${(page_index - 1)*page_size}`)
        })
        .then((data) => {
            let [rows, cols] = data;
            console.log(total);
            res.render("users", {
                data: rows,
                total,
                page_size,
            })
        })
        .catch((err) => console.log(err));
};

module.exports.getOne = (req, res) => {
    let id = req.params.id;
    db.execute("SELECT * FROM tbl_users WHERE id = ?", [id])
        .then((data) => {
            let [rows] = data;
            res.status(200).json({
                data: rows[0],
            });
        })
        .catch((err) => console.log(err));
}

module.exports.createOne = (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            message: "Invalid email or password"
        })
    }
    // generate password add id
    password = bcrypt.hashSync(password, saltRounds);
    // console.log(password);
    let id = Math.floor(Math.random() * 1000000);
    // execute SQL query
    db.execute("SELECT * FROM tbl_users WHERE email=?", [email])
        .then((data) => {
            let [rows] = data; // 1 mảng chứa 1 phần tử nếu tìm thấy user
            console.log(rows);
            // 1 mảng chứa 1 phẩn tử nếu tìm thấy user
            // [] nếu không tìm thấy
            if (rows.length > 0) {
                return Promise.reject("User already exist");
            } else {
                return db.execute("INSERT INTO tbl_users VALUE(?, ?, ?, ?, ?, ?, ?, ?)", [id, null, null, email, null, null, password, "user"]);
            }
        })
        .then((data) => {
            // console.log(data);
            res.status(200).json({
                message: "Create one susscessful"
            });
        })
        .catch((err) => {
            res.status(500).json({
                err: err,
            })
        });
}

module.exports.updateOne = (req, res) => {
    // let id = req.params.id;
    let { id } = req.params;
    let { name, username } = req.body;
    db.execute("UPDATE tbl_users SET name = ?, username = ? WHERE id =?", [name, username, id])
        .then((data) => {
            console.log(data);
            res.status(200).json({
                message: "update one successfully",
            });
        })
        .catch((err) => console.log(err));
}

module.exports.deleteOne = (req, res) => {
    let { id } = req.params;
    db.execute("DELETE FROM tbl_users WHERE id =?", [id])
        .then((data) => {
            console.log(data);
            res.status(200).json({
                message: "delete one successfully",
            });
        })
        .catch((err) => console.log(err));
}


// Pagination

// current page index (Đang ở trang bao nhiêu)
// page size (Có bao nhiêu trang)
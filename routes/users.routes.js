// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const blogController = require("../controllers/blogs.controller");
const {requireAdmin} = require("../middlewares/auth.middlewares");


// "/user"

// /users
router.get("/",requireAdmin, userController.getAll);

// Get one by id
router.get("/:id", userController.getOne);

// Get all blogs by user id
router.get("/:id/blogs", blogController.getBlogsByUserId);

// Read one by id
router.post("/", userController.createOne);

// Update one by id
router.put("/:id", userController.updateOne);

// Delete one by id
router.delete("/:id",requireAdmin, userController.deleteOne);

module.exports = router;
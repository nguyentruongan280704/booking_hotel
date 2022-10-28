// const { application } = require("express");
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs.controller")
const {requireAdmin} = require("../middlewares/auth.middlewares");


router.get("/", requireAdmin, blogController.getAll);
router.get("/:id", blogController.getOne);
router.post("/", blogController.createOne);
router.put("/:id", blogController.updateOne);
router.delete("/:id", blogController.deleteOne);

module.exports = router;
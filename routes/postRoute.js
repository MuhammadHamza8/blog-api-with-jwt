const express = require('express');
const router = express.Router();
const postConttroller= require('../controllers/postController');
const auth = require("../middleware/auth");

// Crud routes for posting a blogs
router.post("/postProduct", auth, postConttroller.postData);
router.get("/getAll", postConttroller.getAll);
router.get("/getOne/:id", postConttroller.getOne);
router.patch("/update/:id", auth, postConttroller.update);
router.delete("/delete/:id",auth,  postConttroller.delete);

module.exports= router;



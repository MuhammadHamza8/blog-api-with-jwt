
const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');


router.post("/signup", userController.signup);
router.post("/login",userController.signin)
router.get("/getAllUser",userController.getAllUser)
router.get("/getOneUser/:id",userController.getOneUser)

module.exports = router;
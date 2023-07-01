const express= require("express");
const { registerUser, loginUser, connectUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/current",validateToken,connectUser);
module.exports=router;
const { Router } = require("express");
const authMiddleWare = require("../middlewares/auth.middleware");
const { signIn, signUp, getUsers } = require("../controllers/user.controllers");
const router = Router();

router.get("/", authMiddleWare, getUsers);
router.post("/signin", signIn);
router.post("/signup", signUp);

module.exports = router;

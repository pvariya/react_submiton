const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { signUp, login } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/register",signUp);
userRouter.post("/login", login);

module.exports = userRouter;

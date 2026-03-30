// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');


// // Dev route: create admin (only for initial seeding) — remove or protect in production
// router.post('/create-admin', authController.createAdmin);


// // Admin login
// router.post('/admin/login', authController.adminLogin);


// // User registration (for testing users)
// router.post('/user/register', authController.createUser);
// router.post('/user/login', authController.userLogin);




// module.exports = router;


import express from "express";
import { adminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/admin-login", adminLogin);


export default router;

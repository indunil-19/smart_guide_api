const express=require('express');
const router=express.Router();
const RootController=require("../controller/rootController")


router.post("/reset-password",RootController.resetPassword)
router.post('/signup',RootController.signup)
router.post('/signin',RootController.login)
router.get('/logout', RootController.logout)

router.use('/admin', require("./admin"))
router.use('/user', require("./user"))






module.exports=router
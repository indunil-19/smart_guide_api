const express=require('express');
const AdminController = require('../controller/adminController');
const router=express.Router();

const ifAdmin=require("../middleware/ifAdmin")
const ifAdminNotLoggedIn=require("../middleware/ifAdminNotLoggedIn")


router.get('/viewAdmins',ifAdminNotLoggedIn,ifAdmin,AdminController.viewAdmins)
router.get('/viewAdmin/:pid',ifAdminNotLoggedIn,ifAdmin,AdminController.viewAdmin)
router.get('/viewUsers',ifAdminNotLoggedIn,ifAdmin,AdminController.viewUser)
router.get('/viewTravelplan',ifAdminNotLoggedIn,ifAdmin,AdminController.Travelplan)
router.get('/getProvinceData/:pid',ifAdminNotLoggedIn, ifAdmin,AdminController.getProvinceData)
router.get('/getPublicPlans',ifAdminNotLoggedIn, ifAdmin,AdminController.getPublicPlans)
router.get('/getApiKet',ifAdminNotLoggedIn,ifAdmin,AdminController.getApiKey)

router.post('/signup',AdminController.signup)
router.post('/signin',AdminController.login)
router.post('/addImgtoProvinceData',ifAdminNotLoggedIn, ifAdmin,AdminController.addImgtoProvinceData)
router.post('/deleteProvinceImage',ifAdminNotLoggedIn, ifAdmin,AdminController.deleteProvinceImage)
router.post('/descriptionUpdate',ifAdminNotLoggedIn, ifAdmin,AdminController.descriptionUpdate)
router.post('/getsharedPlans',ifAdminNotLoggedIn, ifAdmin,AdminController.getSharedPlans)
router.delete('/deleteTravelPlan',ifAdminNotLoggedIn, ifAdmin,AdminController.deleteTravelPlan)
router.post('/setPublicPlan',ifAdminNotLoggedIn, ifAdmin,AdminController.setPublicPlan)
router.post('/removePublic',ifAdminNotLoggedIn, ifAdmin,AdminController.removePublicPlan)
router.post('/updateApiKey',ifAdminNotLoggedIn,ifAdmin,AdminController.setApiKey)


module.exports=router;

const express=require('express');
const UserController=require("../controller/userController")
const router=express.Router();

const ifUserNotLoggedIn=require("../middleware/ifUserNotLoggedIn")
const ifTraveller=require("../middleware/ifTraveller")


router.get('/getTravelPlans',ifUserNotLoggedIn, ifTraveller, UserController.getTravelPlans)
router.get('/getPublicTravelPlans',ifUserNotLoggedIn, ifTraveller, UserController.getPublicPlans)

router.post('/getReview',ifUserNotLoggedIn,ifTraveller, UserController.getReviews)
router.post('/updateTravelPlan',ifUserNotLoggedIn, ifTraveller, UserController.updateTravelPlan)
router.post('/sharePlan',ifUserNotLoggedIn,ifTraveller, UserController.shareTravelPlan)
router.delete('/deleteTravelPlan',ifUserNotLoggedIn, ifTraveller, UserController.deleteTravelPlan)
router.post('/addReview',ifUserNotLoggedIn, ifTraveller, UserController.addReview)
router.post('/saveTravelPlan',ifUserNotLoggedIn, ifTraveller, UserController.saveTravelPlan)
router.post('/updateUser',ifUserNotLoggedIn,ifTraveller,UserController.updateUser)
router.post('/updatepassword',ifUserNotLoggedIn,ifTraveller,UserController.changePasssword)
router.post('/changePlanName',ifUserNotLoggedIn,ifTraveller,UserController.changePlanName)

module.exports=router;
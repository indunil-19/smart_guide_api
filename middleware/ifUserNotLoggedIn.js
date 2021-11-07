const ifUserNotLoggedIn=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        return res.json({error:"you are not logged in, please log in first"})
    }
}
module.exports=ifUserNotLoggedIn;
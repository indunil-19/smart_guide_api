const ifAdminNotLoggedIn=(req,res,next)=>{
    if(req.session.admin){
        next()
    }
    else{
        return res.json({error:"you are not logged in, please log in first"})
    }
}
module.exports=ifAdminNotLoggedIn;
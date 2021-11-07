const ifTraveller=(req,res,next)=>{
    if(req.session.user.type=="traveller"){
        next()
    }
    else{
        return res.status(422).json({error:"you don't have permission"})
    }
}
module.exports=ifTraveller;
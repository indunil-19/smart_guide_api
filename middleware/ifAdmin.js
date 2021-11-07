const ifAdmin=(req,res,next)=>{
    if(req.session.admin.type=="admin"){
        next()
    }
    else{
        return res.json({error:"you don't have permission"})
    }
}
module.exports=ifAdmin;
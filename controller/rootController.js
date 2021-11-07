const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {Client} = require("@googlemaps/google-maps-services-js");
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"

    }
}))


class RootController{
    
    
    static async signup(req,res){
        const {firstname,lastname,dob,country,religion,email,password}=req.body;
        if(!firstname || !lastname || !dob || !country || !religion || !email  || !password){
            console.log(req.body)
            return res.status(422).json({error:"please add all the fields"})
        }

                        User.findOne({email:email})
                        .then((savedUser)=>{
                            if(savedUser){
                            return res.status(422).json({error:"user already exists with that email"})
                            }
                            bcrypt.hash(password,12)
                            .then(hashedpassword=>{
                                const user = new User({
                                    firstname,
                                    lastname,
                                    dob,
                                    country,
                                    religion,
                                    email,
                                    password:hashedpassword,
                                    
                                })
                        
                                user.save()
                                .then(user=>{
                                    res.json({message:"Register successfully"})
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                            })
                        
                        })
                        .catch(err=>{
                        console.log(err)
                        })

    }
    static async login(req,res){
        const {email,password} = req.body
        if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
        }
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    const {_id, firstname, lastname, email,dob,country,religion,password,pic}=savedUser
                    req.session.user={}
                    req.session.user.email=email;
                    req.session.user._id=_id;
                    req.session.user.type="traveller"
                   return  res.json({message:"successfully signed in", user:{_id,firstname,lastname,email, dob, country,religion, pic, type:"traveller"}})
                }
                else{
                    return res.status(422).json({error:"Invalid Email or password",})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
        }

        static async resetPassword(req,res){
                return crypto.randomBytes(32,(err,buffer)=>{
                    if(err){
                        console.log(err)
                    }
                    const token = buffer.toString("hex")
                    return User.findOne({email:req.body.email})
                    .then(user=>{
                        if(!user){
                            return res.json({error:"User dont exists with that email"})
                        }
                        user.resetToken = token
                        user.expireToken = Date.now() + 3600000
                        return user.save().then((result)=>{
                            transporter.sendMail({
                                to:user.email,
                                from:"udayangana98@gmail.com",
                                subject:"password reset",
                                html:`
                                <p>You requested for password reset</p>
                                <h5>click in this <a href="${user.email}/reset/${token}">link</a> to reset password</h5>
                                `
                            })
                            return res.json({message:"check your email"})
                        })
           
                    })
                })
           
        }

        static async logout(req,res){
            req.session.destroy();     
            return res.json({message:"signout successfully"})
            

        }
        


}
module.exports=RootController
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Admin = mongoose.model("Admin")
const Province=mongoose.model("Province")
const User = mongoose.model("User")
const Travelplan=mongoose.model("TravelPlan")
const fs = require("fs");

class AdminController{
     
    static async signup(req,res){
        const {firstname,lastname,dob,email,password}=req.body;
        if(!firstname || !lastname || !dob || !email ||  !password){
            return res.status(422).json({error:"please add all the fields"})
        }

                        Admin.findOne({email:email})
                        .then((savedUser)=>{
                            if(savedUser){
                            return res.status(422).json({error:"user already exists with that email"})
                            }
                            bcrypt.hash(password,12)
                            .then(hashedpassword=>{
                                const user = new Admin({
                                    firstname,
                                    lastname,
                                    dob,
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
        return res.json({error:"please add email or password"})
        }
        Admin.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    req.session.admin={}
                    req.session.admin.email=email;
                    req.session.admin._id=savedUser._id
                    req.session.admin.type="admin"
                   res.json({message:"successfully signed in",data:savedUser})
                }
                else{
                    return res.json({error:"Invalid Email or password"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
        }

        static async viewAdmins(req,res){
                Admin.find().
                then((admins)=>{
                    res.json({admins})
                }).
                catch(err=>{
                    console.log(err)
                })
        }
        static async viewAdmin(req,res){
            Admin.find().
            then((admins)=>{
                res.json({admins,pid:req.params.pid})
            }).
            catch(err=>{
                console.log(err)
            })
    }
        static async viewUser(req,res){
            User.find().
            then((users)=>{
                res.json({users})
            }).
            catch(err=>{
                console.log(err)
            })
    }
    static async Travelplan(req,res){
        Travelplan.find().
        then((travelplan)=>{
            res.json({travelplan})
        }).
        catch(err=>{
            console.log(err)
        })
    }
    static async addImgtoProvinceData(req,res){
        const  provinceList ={"p1":"Northern Province", "p2":"North Western Province", "p3":"Western Province", "p4":"North Central Province",
                    "p5":"Central Province", "p6":"Sabaragamuwa Province", "p7":"Eastern Province", "p8":"Uva Province", "p9":"Southern Province"}

        Province.findOne({pid:req.body.pid})
        .then((saveData)=>{
            if(!saveData){
                const province=new Province({
                    pid:req.body.pid,
                    name:provinceList[req.params.pid],
                    description:req.body.description,
                    images:[req.body.image]
                })
                province.save()
                            .then(result=>{
                                return res.json({message:"upload image successfully", result})
                            })
                            .catch(err=>{
                                console.log(err)
                            })

            }
            if(saveData){
                Province.findOneAndUpdate({pid:req.body.pid},{$push:{images:req.body.image}},{new:true}).
                then(result=>{
                    return res.json({message:"upload image successfully", result})
                }).
                catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    static async getProvinceData(req,res){
        const provinceList ={"p1":"Northern Province", "p2":"North Western Province", "p3":"Western Province", "p4":"North Central Province",
                    "p5":"Central Province", "p6":"Sabaragamuwa Province", "p7":"Eastern Province", "p8":"Uva Province", "p9":"Southern Province"}


        Province.findOne({pid:req.params.pid})
        .then((saveData)=>{
            if(!saveData){
                const province=new Province({
                    pid:req.params.pid,
                    name:provinceList[req.params.pid],
                    description:"",
                    images:[]
                })
                province.save()
                            .then(result=>{
                                return res.json(result)
                            })
                            .catch(err=>{
                                console.log(err)
                            })

            }
            if(saveData){
                return res.json(saveData)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    static async deleteProvinceImage(req,res){
        Province.findOne({pid:req.body.pid})
        .then((saveData)=>{
            if(!saveData){   
                return res.json({error:"bad request"})
            }
            if(saveData){
                Province.findOneAndUpdate({pid:req.body.pid},{$pull:{images:req.body.image}},{new:true}).
                then(result=>{
                    return res.json({message:"delete image successfully", result})
                }).
                catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    static async descriptionUpdate(req,res){
        Province.findOne({pid:req.body.pid})
        .then((saveData)=>{
            if(!saveData){   
                return res.json({error:"bad request"})
            }
            if(saveData){
                Province.findOneAndUpdate({pid:req.body.pid},{description:req.body.description},{new:true}).
                then(result=>{
                    return res.json({message:"update description successfully", result})
                }).
                catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

        static async getSharedPlans(req,res){
            Travelplan.find({ownedBy:"617acefbaa2522ab237609ed", rate:req.body.rate, public:false})
                .populate("OwnedBy","_id")
                .sort('-createdAt')
                .then(myPlans=>{
                    res.json({myPlans})
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        static async getPublicPlans(req,res){
            Travelplan.find({ownedBy:"617acefbaa2522ab237609ed", public:true})
                .populate("OwnedBy","_id")
                .sort('-createdAt')
                .then(myPlans=>{
                    res.json({myPlans})
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        static async deleteTravelPlan(req,res){
            Travelplan.findOneAndRemove({_id:req.body.planId,ownedBy:"617acefbaa2522ab237609ed"}).then(data=>{
                return res.json({data})
            }).catch(e=>{
                console.log(e)
            })
        }

        static async setPublicPlan(req,res){
            
            Travelplan.findOneAndUpdate({_id:req.body.planId,ownedBy:"617acefbaa2522ab237609ed"},{public:true},{new:true}).
                    then(data=>{
                        return res.json({data})
                    }).
                    catch(err=>{
                        console.log(err)
                    })
        }
        static async removePublicPlan(req,res){
            Travelplan.findOneAndUpdate({_id:req.body.planId,ownedBy:"617acefbaa2522ab237609ed"},{public:false},{new:true}).
            then(data=>{
                return res.json({data})
            }).
            catch(err=>{
                console.log(err)
            })
        }


        static async getApiKey(req,res){
            fs.readFile('./ApiKey.txt', (err, data) => {
                if (err) return res.json({error:"system error"}) ;
                let result = JSON.parse(data);
                return res.json({result})
            });
        }



        static async setApiKey(req,res){
            console.log(req.body)
            if(!req.body.apiKey){
                return res.json({error:"invalid apiKey"})
            }
            let result={
                apiKey:req.body.apiKey,
                updateDate:new Date()
            }
            let data = JSON.stringify(result);
            fs.writeFile("./ApiKey.txt", data, (err) => {
                if (err) return res.json({error:"system error"})
                return res.json({message:"successfully updated api key", result})
            });
        }

}
module.exports=AdminController
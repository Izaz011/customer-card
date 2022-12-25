const customerModel = require("../models/customerModel");

const short=require("short-uuid")

const validate=require("uuid-validate")

  
const isValidName = function (value) {
    if (typeof value === undefined || typeof value === null || value === "" ){
      return false;
    }
    if (typeof value === "string" && value.trim().length == 0 ) {
      return false;
    }
    return true
    
  }

  const forName = function (value) {
    return /^[A-Z][a-z]{1,}(?: [A-Z][a-z]+){0,}$/.test(value);
  };

  const isValidNumber = function (value) {
    let phnNum = /^[0]?[6789]\d{9}$/
    if ((value === "" && value === null && value === "undefined")) return false
    if (phnNum.test(value)) return true
  }

  const isValidEmail = function (value) {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(value)) return true
  }

const createCustomer=async function(req,res){
    try{
        const data=req.body
    const {firstName,lastName,mobileNumber,DOB,emailID,address,customerID,status}=data

    if(!firstName){
        return res.status(400).send({status:false, msg:"Please Provide First Name"})
    }

    if(!isValidName(firstName)||!forName(firstName)){
        return res.status(400).send({status:false, msg:"Please Provide Valid First Name"})  
    }

    if(!lastName){
        return res.status(400).send({status:false, msg:"Please Provide Last Name"})
    }

    if(!isValidName(lastName)||!forName(lastName)){
        return res.status(400).send({status:false, msg:"Please Provide Valid Last Name"})  
    }

    if(!mobileNumber){
        return res.status(400).send({status:false, msg:"Please Provide Mobile Number"})  
    }

    if(!isValidNumber(mobileNumber)){
        return res.status(400).send({status:false, msg:"Please Provide Valid Mobile Number"})
    }

    const duplicateMobile=await customerModel.findOne({mobileNumber:mobileNumber})

    if(duplicateMobile){
        return res.status(400).send({status:false, msg:"Mobile Number is already registered"})  
    }

    if(!emailID){
        return res.status(400).send({status:false, msg:"Please Provide email ID"})  
    }

    if(!isValidEmail(emailID)){
        return res.status(400).send({status:false, msg:"Please Provide Valid email ID"})
    }

    const duplicateEmail=await customerModel.findOne({emailID:emailID})

    if(duplicateEmail){
        return res.status(400).send({status:false, msg:"Email is already registered"})  
    }

    const customerId=short.generate()
    data.customerID=customerId

    if(status){
        if(!(["ACTIVE","INACTIVE"]).includes(status)){
            return res.status(400).send({status:false,msg:"Please provide valid status"})
        }
    }

    const customer=await customerModel.create(data)

    return res.status(201).send({status:true,msg:"customer created successfully",data:customer})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

const getAllCustomers=async function(req,res){
try{ 
       const getCustomers=await customerModel.find({status:"ACTIVE"}).select({createdAt:0,updatedAt:0,__v:0})

    if(getCustomers.length==0){
        return res.status(404).send({status:false,msg:"No Customer found"})
    }

return res.status(200).send({status:true,data:getCustomers})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

const deleteCustomer=async function(req,res){
    try{
        const customerId=req.params.customerID
        if(!validate(customerId)){
            return res.status(400).send({status:false,msg:"please provide valid customer ID"})  
        }

        const deletedCustomer=await customerModel.findOneAndDelete({customerID:customerId})

        if(!deletedCustomer){
            return res.status(404).send({status:false,msg:"customer not found"})    
        }

        return res.status(200).send({status:true,msg:"customer succesfully deleted"})
    }
    catch(error){
        return res.status(500).send({status:false,msg:error.message}) 
    }
}

module.exports={createCustomer,getAllCustomers,deleteCustomer}

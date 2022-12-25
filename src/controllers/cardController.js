const cardModel=require("../models/cardModel")

const customerModel = require("../models/customerModel")

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

const createCard=async function (req,res){
//    try{
    let data=req.body
   let {cardType,status,vision,customerID}=data 

   const cardNumber=await cardModel.find().count()

   if(cardNumber==0){
    data.cardNumber="C001"
   }
   else{
    data.cardNumber="C00"+(cardNumber+1)
}

   if(!customerID){
    return res.status(400).send({status:false,msg:"please provide customerID"})
   }

   if(!validate(customerID)){
    return res.status(400).send({status:false,msg:"please provide valid customerID"})
   }

   const customer=await customerModel.findOne({customerID:customerID})

   if(!customer){
    return res.status(400).send({status:false,msg:"wrong customer ID"})
   }

   data.customerName=customer.firstName+" "+customer.lastName

   if(cardType){
    if(!(["REGULAR","SPECIAL"]).includes(cardType)){
        return res.status(400).send({status:false,msg:"please provide valid card type"})
    }
   }

   if(status){
    if(!(["ACTIVE","INACTIVE"]).includes(status)){
        return res.status(400).send({status:false,msg:"please provide valid status"})
    }
   }
   if(vision){
    if(!isValidName(vision)){
return res.status(400).send({status:false,msg:"vision field is not valid"})
    }
   }

   const card=await cardModel.create(data)

   return res.status(201).send({status:true,msg:"card created successfully",data:card})
    // }
    // catch(error){
    //     return res.status(500).send({status:false,msg:error.message})
    // }
}

const getCards=async function(req,res){
try{   
     const cards=await cardModel.find().select({createdAt:0,updatedAt:0,__v:0})
    if(cards.length==0){
        return res.status(404).send({status:false,msg:"no card found"})
    }

    return res.status(200).send({status:true,data:cards})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

module.exports={createCard,getCards}
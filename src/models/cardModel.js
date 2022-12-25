const mongoose=require("mongoose")

const cardSchema= new mongooose.Schema({
    cardNumber:{
        type:String,
        required:true,
        unique:true
    },
    cardType:{
        type:String,
        enum:["REGULAR","SPECIAL"],
        default:"REGULAR"
    },
    customerName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    vision:{
        type:String
    },
    customerID:{
        type:String,
        ref:"Customer",
        required:true
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("Card",cardSchema)
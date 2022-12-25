const express=require("express")
const router=express.Router()

const customerController=require("../controllers/customerController")

router.post("/customer",customerController.createCustomer)
router.get("/customers",customerController.getAllCustomers)
router.delete("/:customerID/customer",customerController.deleteCustomer)

module.exports=router
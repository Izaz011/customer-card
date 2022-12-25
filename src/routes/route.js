const express=require("express")
const router=express.Router()

const customerController=require("../controllers/customerController")

const cardController=require("../controllers/cardController")


//........................customer API...........................................................
router.post("/customer",customerController.createCustomer)
router.get("/customers",customerController.getAllCustomers)
router.delete("/:customerID/customer",customerController.deleteCustomer)

//............................................card API.....................................................

router.post("/card",cardController.createCard)
router.get("/cards",cardController.getCards)



module.exports=router
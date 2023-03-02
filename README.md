 
   # Lithium

# customer-card

### Description
 Created Apis for creating customers details, getting customer data and deleting customer data.
 created Apis to create card details with specific user and get all the card data.

### Models
- Card Model
```
  { cardNumber:{ String,required,unique},cardType:{ String,enum:["REGULAR","SPECIAL"], default:"REGULAR"},customerName:{ String,required},status:{ String, enum:["ACTIVE","INACTIVE"],default:"ACTIVE"}, vision:{ String},customerID:{ String,ref:"Customer",required}
  }
```
  
  
- Customer Model
```   
{ firstName:{ String,required},lastName:{ String,required},mobileNumber:{ String,required,unique},DOB:{ Date},emailID:{ String,required,unique},address:{ String},customerID:{ String,required,unique},status:{ String,enum:["ACTIVE","INACTIVE"],default:"ACTIVE"}}
```

    
    


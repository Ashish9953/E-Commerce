var express=require("express");
var cartController=require("../Controller/cartController");

var router =express.Router();
router.use(express.json());
   
router.post('/insertCart',cartController.insertCart);
router.get('/getAllCart/:customerId',cartController.getAllCart);
router.delete('/deleteCart/:cartId',cartController.deleteCart);
router.put('/updateCart',cartController.updateCart);
router.delete('/deleteCartByCustomer/:UserCustomerId',cartController.deleteCartByCustomer);

module.exports=router;
var express =require("express");
var  PaymentController=require("../Controller/PaymentCotroller");
var router=express.Router();
router.use(express.json());
router.post('/payment',PaymentController.PaymentConfirm)
module.exports=router
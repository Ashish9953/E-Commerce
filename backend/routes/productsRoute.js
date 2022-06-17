var express=require("express");
var productController=require("../Controller/productController");
var router =express.Router();
router.use(express.json());




router.post('/insertProduct',productController.insertProduct);
router.get('/getAllProducts',productController.getAllProducts);
router.put('/updateProduct',productController.updateProduct);
router.delete('/deleteProduct/:productId',productController.deleteProduct);
router.get('/getProductByCategory/:category',productController.getProductByCategory);





module.exports=router;
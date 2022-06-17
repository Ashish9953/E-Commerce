var productModel=require("../Model/productModel")


const multer=require('multer');
const path=require('path');





const productController=
{

insertProduct:function(req,res)
{
    return productModel.productData.insertProduct(req,res);
},

getAllProducts:function(req,res)
{
   return productModel.productData.getAllProducts(req,res);
},
updateProduct:function(req,res)
{
  return productModel.productData.updateProduct(req,res);
},
deleteProduct:function(req,res)
{
  return productModel.productData.deleteProduct(req,res);
},
getProductByCategory:function(req,res)
{
  return productModel.productData.getProductByCategory(req,res);
},

}




module.exports=productController;










// //upload iamge controller
// const storage=multer.diskStorage({
//     destination:(req,file,callback)=>
//     {
//       callback(null,'images')
//     },
//     filename:(req,file,cb)=>
//     {
//         cb(null, Date.now()+path.extname(file.originalname))
//     }
// })
// const upload =multer({
//     storage:storage,
//     limits:{fileSize:'10000000'},
//     fileFilter:(req,file,cb)=>
//     {
//      const fileTypes=/jpeg|png|jpg|gif/
//      const mimeType=fileTypes.test(file.mimetype)
//      const extname=fileTypes.test(path.extname(file.originalname))

//      if(mimeType && extname)
//      {
//          return cb(null,true);
//      }
//      cb('Give proper file format for image')

//     }
// }).single('image');



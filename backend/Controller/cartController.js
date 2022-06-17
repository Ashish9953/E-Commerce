var cartModel=require("../Model/cartModel");
 const cartController=
  {  insertCart:function(req,res)
    {
        return cartModel.cartData.insertCart(req,res);
    },
    updateCart:function(req,res)
   {
      return cartModel.cartData.updateCart(req,res);
  },
    getAllCart:function(req,res)
    {
        return cartModel.cartData.getAllCart(req,res);
    },
    deleteCart:function(req,res)
{
  return cartModel.cartData.deleteCart(req,res);
},
getProductByName:function(req,res)
{
  return cartModel.cartData.getProductByName(req,res);
},
deleteCartByCustomer:function(req,res)
{
  return cartModel.cartData.deleteCartByCustomer(req,res);
}


  }
module.exports=cartController;
var userModel=require("../Model/userModel")
const userController=
{

insertUser:function(req,res)
{
    return userModel.UserData.insertUser(req,res);
},


login:function(req,res)
{
  return userModel.UserData.login(req,res);
},
 
getAllUser:function(req,res)
{
   return userModel.UserData.getAllUser(req,res);
},
getUserById:function(req,res)
{
  return userModel.UserData.getUserById(req,res);
},
getUserByName:function(req,res)
{
  return userModel.UserData.getUserByName(req,res);
},
updateUser:function(req,res)
{
  return userModel.UserData.updateUser(req,res);
},
deleteUser:function(req,res)
{
  return userModel.UserData.deleteUser(req,res);
},
deleteUserByPassword(req,res)
{
  return userModel.UserData.deleteUserByPassword(req,res);
},
sendMail:function(req,res)
{
   return userModel.UserData.sendMail(req,res);
},
forget:function(req,res){
  return userModel.UserData.forget(req,res);
},
updatePassword:function(req,res){
  return userModel.UserData.updatePassword(req,res);
},
updateName:function(req,res)
{
  return userModel.UserData.updateName(req,res);
},
updateEmail:function(req,res)
{
  return userModel.UserData.updateEmail(req,res);
},
updateMobile:function(req,res)
{
  return userModel.UserData.updateMobile(req,res);
}
}
module.exports=userController;

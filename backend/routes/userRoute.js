var express=require("express");
var userController=require("../Controller/userController");
var router =express.Router();
router.use(express.json());

router.post('/insertUser',userController.insertUser);
router.post('/sendMail',userController.sendMail);
router.post('/login',userController.login);

router.get('/getAllUser',userController.getAllUser);
router.get('/getUserById/:id',userController.getUserById);
router.get('/getUserByName/:firstName',userController.getUserByName);
router.put('/updateUser',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);
router.delete('/deleteUserByPassword/:password',userController.deleteUserByPassword);
router.post('/forget',userController.forget);

router.put('/updatePassword',userController.updatePassword);
router.put('/updateName',userController.updateName);
router.put('/updateEmail',userController.updateEmail);
router.put('/updateMobile',userController.updateMobile)

// router.post('/login',userController.login);
module.exports=router;
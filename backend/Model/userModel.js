var Sequelize = require("sequelize");
const dbConfig = require("../backend.config");
const nodemailer=require('nodemailer');
const { password } = require("pg/lib/defaults");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
let Customer = sequelize.define(
  "Users",
  {
    customerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    mobile: Sequelize.STRING(12),
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: Sequelize.STRING,
    address: Sequelize.TEXT,
    Role: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
//  Customer.sync().then(()=>{
//         console.log("Table is created successfully");
//         }).catch((err)=>{
//             console.log("Error occurred"+err)
//         })
const UserData = {
  insertUser: function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var mobile = req.body.number;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var Role = req.body.Role;

    var customerObj = Customer.build({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      password: password,
      address: address,
      Role: Role,
    });
    customerObj
      .save()
      .then((data) => {
        var string = "Record inserted successfully";
            
        res.status(201).send(string);
      })
      .catch((err) => {
        console.log("Error is :" + err);
        res.status(400).send(err);
      });
  },
   sendMail:function(req,res)
   {
    let user=req.body;
    sendMail(user,info=>
    {
      console.log("mail send successfully");
      res.status(201).send(info);
    })
   },
  login: function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    const Op = Sequelize.Op;
    Customer.findAll({
      where: { [Op.and]: [{ email: email }, { password: password }] },
      row: true,
    })
      .then((data) => {
        console.log(data);
        console.log(typeof data);

        res.status(201).send(data);
      })
      .catch((err) => {
        console.log("Error is :" + err);
        res.status(400).send(err);
      });
  },
  getAllUser: function (req, res) {
    Customer.findAll({ raw: true })
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error("There is an error getting data from db:" + err);
        res.status(400).send(err);
      });
  },
  updateUser: function (req, res) {
    var customerId = req.body.customerId;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var mobile = req.body.number;
    var email = req.body.email;
    var address = req.body.address;

    Customer.update(
      {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        address: address,
      },
      { where: { customerId: customerId } }
    )
      .then((data) => {
        console.log(data);
        var string = "Record updated successfully...";
        res.status(201).send(string);
      })
      .catch((err) => {
        console.log("There is an error updating table:Reason: " + err);
        res.status(400).send(err);
      });
  },
  deleteUser:function(req,res)
  {
    console.log("Entering id to delete");
    var id=req.params.id;
    console.log("Given id is"+id);
    Customer.destroy({where:{customerId:id}}).then(data=>
        {
            console.log(data);
            var str="Record deleted successfully";
            res.status(200).send(str);
        }).catch(err=>{
            console.error("There is an error while deleting record:"+err);
            res.status(400).send(err);
        })
  },
  deleteUserByPassword:function(req,res)
  {
    console.log("Entering password to delete");
    var password=req.params.password;
    console.log("Given id is"+password);
    Customer.destroy({where:{password:password}}).then(data=>
        {
            console.log(data);
            var str="We Miss you ";
            res.status(200).send(str);
        }).catch(err=>{
            console.error("There is an error while deleting record:"+err);
            res.status(400).send(err);
        })
  },

  getUserById:function(req,res)
  {     var id=Number(req.params.id);
        // var idstr=id.toString();
       const Op=Sequelize.Op;
    Customer.findAll({where: 
        sequelize.where(
        sequelize.cast(sequelize.col('customerId'), 'varchar'), {
           [Op.like]: `${id}%`
        }
     )
    },{ raw: true })
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error("There is an error getting data from db:" + err);
        res.status(400).send(err);
      });
  },
  getUserByName:function(req,res)
  {     var firstName=req.params.firstName;
      console.log(firstName);
        // var idstr=id.toString();
       const Op=Sequelize.Op;
    Customer.findAll({where: 
      sequelize.where(
        sequelize.fn('lower', sequelize.col('firstName')),
        {
          [Op.like]:`${firstName}%` 
        
        }
      // firstName: {
      //   [Op.like]: `${firstName}%`
      
      )
    }
    
    ,{ raw: true })
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error("There is an error getting data from db:" + err);
        res.status(400).send(err);
      });
  },
  forget:function(req,res){
    console.log(req.body.email);
    Customer.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        console.log("hello");
        if (!user) {
          console.log("user not found");
            return res.status(201).send({
            message: "User Not Found",
          });
        }
      
        else{
             var otp = Math.floor(100000 + Math.random() * 900000);
            sendMail1(user,otp,info=>
                {
       
                if(!user){
                         
                          return res.status(201).send({
                            message: "try later, unable to send mail."
                            });
                        } 
                     
                 else{
                 console.log("email sent with otp : "+otp+"\ninfo : "+info.response);
                 return res.status(201).send({
                     message: "OTP sent on this mail id.",
                      flag : true,
                     email: user.email,
                    otp : otp
                   });
                 }
             })
             }
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
            message: "Server error"
            });
          }
       
      });
},
updatePassword:function(req,res){
      console.log(req.body);
      

  Customer.update({password : req.body.password},
      {where : {email: req.body.email}}).then(user => {


        Customer.findAll({where : {email: req.body.email}},{ raw: true })
      .then((data) => {
        console.log(data);
          let user=data;
          sendMail2(user,info=>{
            res.status(201).send({
                message: "Password updated successfully."
            });
         })
      }).catch(err => {
        res.status(201).send({
          message: "Error updating Password with email=" + email
        });
    });
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error("There is an error getting data from db:" + err);
        res.status(400).send(err);
      });
    
  //     sendMail2(user,info=>{
  //         res.status(201).send({
  //             message: "Password updated successfully."
  //         });
  //      })
  //   }).catch(err => {
  //     res.status(201).send({
  //       message: "Error updating Password with email=" + email
  //     });
  // });
 },
 updateName:function(req,res) {
   var customerId = req.body.customerId;
    var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   Customer.update(
    {
      firstName: firstName,
      lastName: lastName,
      
      
    },
    { where: { customerId: customerId } }
  )
    .then((data) => {
      console.log(data);
      var string = "Record updated successfully...";
      res.status(201).send(string);
    })
    .catch((err) => {
      console.log("There is an error updating table:Reason: " + err);
      res.status(400).send(err);
    });
   
 },
 updateEmail:function(req,res) {
  var customerId = req.body.customerId;
   var email = req.body.email;
   
   
  Customer.update(
   {
     email: email,
     
     
     
   },
   { where: { customerId: customerId } }
 )
   .then((data) => {
     console.log(data);
     var string = "Record updated successfully...";
     res.status(201).send(string);
   })
   .catch((err) => {
     console.log("There is an error updating table:Reason: " + err);
     res.status(400).send(err);
   });
  
},
updateMobile:function(req,res) {
  var customerId = req.body.customerId;
   var mobile = req.body.mobile;
 
  Customer.update(
   {
     mobile: mobile,
   
     
     
   },
   { where: { customerId: customerId } }
 )
   .then((data) => {
     console.log(data);
     var string = "Record updated successfully...";
     res.status(201).send(string);
   })
   .catch((err) => {
     console.log("There is an error updating table:Reason: " + err);
     res.status(400).send(err);
   });
  
}

};


async function sendMail2(users,callback)
 {    
       console.log(users);
      
  var transporter=nodemailer.createTransport({
    
      service:'gmail',
     
      auth:{
          user:'deepkartinfo@gmail.com',
          pass:'Ashish@123'
      }
  });
  
  var mailOptions={
      from:"deepkartinfo@gmail.com",
      to:users.email,
      subject:'Password Successfully updated',
      html:`<h1 style="color:coral;">Hi ${users.firstName} ${users.lastName},</h1><br>
             <h4 style="color:aqua;">Your Password is Successfully Changed 
             You can  login using the new password
             <h4 >Thanks & Regards,</h4>
              <b style="color:red;">Team Deepkart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}
async function sendMail1(user,otp,callback)
 {     
     console.log(user);
    //  console.log(typeof user) 
      
    console.log(user.email);
   
  var transporter=nodemailer.createTransport({
    
      service:'gmail',
     
      auth:{
          user:'deepkartinfo@gmail.com',
          pass:'Ashish@123'
      }
  });
  var mailOptions={
      from:"deepkartinfo@gmail.com",
      to:user.email,
      subject:'Password Reset',
      html:`<h1 style="color:coral;">Hello ${user.firstName} ${user.lastName},</h1><br>
             <h4 style="color:aqua;">You are receiving this email beacuse we recieved
              a password reset request to your account <br> Your One time Password is :-<h4>`+otp+
        `<h4 style="color:red;">Thanks & Regards,</h4>
               <b style="color:red;">Team Deepkart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
 }

async function sendMail(user,callback)
 {     console.log(user);
     console.log(typeof user) 
      
    console.log(user.email);
   
  var transporter=nodemailer.createTransport({
    
      service:'gmail',
     
      auth:{
          user:'deepkartinfo@gmail.com',
          pass:'Ashish@123'
      }
  });
  var mailOptions={
      from:"deepkartinfo@gmail.com",
      to:user.email,
      subject:'Welcome to India\'s New Electronic Digital Shop',
      html:`<h1>Hi ${user.firstName}</h1><br>
              <h4>Thank you for choosing Deepkart</h4><br>
              <h4 >Thanks & Regards,</h4>
              <b >Team Deepkart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}
module.exports = {UserData,Customer};

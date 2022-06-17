var express=require("express");
var users=require("./routes/userRoute");
var products=require("./routes/productsRoute")
var cart=require("./routes/cartRoute");
var payment=require("./routes/paymentRoute");


var cors=require('cors');
const app=express();
app.use(cors());

app.use("/user",users);
app.use("/products",products);
app.use("/cart",cart);

app.use("/payment",payment);

// app.use('/images',express.static('./images'));
















// const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
//     host:dbConfig.HOST,
//     dialect:dbConfig.dialect,
//     pool:
//     {
//         max:dbConfig.pool.max,
//         min:dbConfig.pool.min,
//         acquire:dbConfig.pool.acquire,
//         idle:dbConfig.pool.idle
//     }
// });
// let Customer=sequelize.define('Customers',{
//     customerId:{
//         type:Sequelize.INTEGER,
//         primaryKey:true,
//         autoIncrement: true,

       
//     },
//     firstName:Sequelize.STRING,
//     lastName:Sequelize.STRING,
//     mobile:Sequelize.STRING(12),
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//            isEmail: {
//               msg: "Must be a valid email address",
//            }
//         }
//      },
//      password:Sequelize.STRING,
//      address:Sequelize.TEXT,
//      Role:Sequelize.STRING



// },{
//     timestamps:false,
//     freezeTableName:true
// });
// Customer.sync().then(()=>{
//     console.log("Table is created successfully");
//     }).catch((err)=>{
//         console.log("Error occurred"+err)
//     })

app.use(express.json())

// inserting into customer table 
// app.post("/insertCustomer",function(req,res){

   
//     var firstName=req.body.firstName;
//     var lastName=req.body.lastName;
//      var mobile=req.body.mobile;
//      var email=req.body.email;
//      var password=req.body.password;
//      var address=req.body.address;
//      var Role=req.body.Role


    
//     var customerObj=Customer.build({firstName:firstName,lastName:lastName,mobile:mobile,email:email,password:password,address:address,Role:Role});
//    customerObj.save().then(data=>
//         {
//             var string="Record inserted successfully";
//             res.status(201).send(string);
//         }).catch(err=>
//             {
//                 console.log("Error is :"+err);
//                 res.status(400).send(err);
//             })

// })
// app.post("/loginCustomer",function(req,res)
// {
//     var email=req.body.email;
//     var password=req.body.password;
//     const Op = Sequelize.Op;
//     Customer.findAll({
//       where: { [Op.and]: [{ email: email }, { password: password }] },
//       row: true,
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(typeof data);
        
//       res.status(201).send(data);
//     }).catch(err=>
//         {
//             console.log("Error is :"+err);
//                 res.status(400).send(err);
//         })
    

// });

app.listen(8050,function()
{
    console.log("Server is listening at http://localhost:8050");
})



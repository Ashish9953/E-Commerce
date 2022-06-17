var Sequelize = require("sequelize");
const dbConfig = require("../backend.config");
const nodemailer=require('nodemailer');



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
let product = sequelize.define(
    "Products",
    {
      productId: {
        type: Sequelize.STRING,
        primaryKey: true,
        
      },
      productName: Sequelize.STRING,
      cost: Sequelize.STRING,
      description: Sequelize.TEXT,
      
      rating: Sequelize.INTEGER,
      category: Sequelize.TEXT,
      brand: Sequelize.STRING,
      image: {
          type:Sequelize.STRING
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
//   product.sync().then(()=>{
//         console.log("Table is created successfully");
//         }).catch((err)=>{
//             console.log("Error occurred"+err)
//         })

const productData = {
    insertProduct: function (req, res) {
      var productId= req.body.productId;
      var productName = req.body.productName;
      var cost = req.body.cost;
      var description= req.body.description;
      var rating = req.body.rating;
      var category = req.body.category;
      var brand = req.body.brand;
      var image=req.body.image;
      console.log(image);
  
      var customerObj = product.build({
        productId:  productId,
        productName:productName,
        cost: cost,
        description: description,
        rating:rating,
        category: category,
        brand: brand,
        image: image,
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
    getAllProducts: function (req, res) {
        product.findAll({ raw: true })
          .then((data) => {
            console.log(data);
            res.status(200).send(data);
          })
          .catch((err) => {
            console.error("There is an error getting data from db:" + err);
            res.status(400).send(err);
          });
      },
      updateProduct: function (req, res) {
        var productId= req.body.productId;
      var productName = req.body.productName;
      var cost = req.body.cost;
      var description= req.body.description;
      var rating = req.body.rating;
      var category = req.body.category;
      var brand = req.body.brand;
      var image=req.body.image;
    
        product.update(
          {
            productId:  productId,
            productName:productName,
            cost: cost,
            description: description,
            rating:rating,
            category: category,
            brand: brand,
            image: image
          },
          { where: { productId: productId } }
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
      deleteProduct:function(req,res)
  {
    console.log("Entering id to delete");
    var id=req.params.productId;
    console.log("Given id is"+id);
    product.destroy({where:{productId:id}}).then(data=>
        {
            console.log(data);
            var str="Record deleted successfully";
            res.status(200).send(str);
        }).catch(err=>{
            console.error("There is an error while deleting record:"+err);
            res.status(400).send(err);
        })
  },
  getProductByCategory:function(req,res)
  {     var category=req.params.category.toLowerCase();
      console.log(category);
        // var idstr=id.toString();
       const Op=Sequelize.Op;
    product.findAll({where: 
      sequelize.where(
        sequelize.fn('lower', sequelize.col('category')),
        {
          [Op.like]:`%${category}%` 
        })
    },{ raw: true })
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error("There is an error getting data from db:" + err);
        res.status(400).send(err);
      });
  }

}

module.exports = {productData, product};
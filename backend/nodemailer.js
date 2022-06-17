var nodemailer=require("nodemailer");

async function sendMail1(user,callback)
{
  var transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'ashishku9953@gmail.com',
          pass:'Ashish@123'
      }
  });
  var mailOptions={
      from:"ashishku9953@gmail.com",
      to:user.email,
      subject:'Welcome to India\'s New Electronic Digital Shop',
      html:`<h1>Hi ${user.name}</h1><br>
              <h4>Thank ypu for choosing Deepkart</h4><br>
               <b>DeepKart Team</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}

module.exports=nodemailer;
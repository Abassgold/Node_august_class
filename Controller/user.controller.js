const userModel = require('../Model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
let schoolPortal = process.env.SECRET
const Register = (req, res) => {
   const { Firstname, Lastname, Password, Email } = req.body
   bcrypt.hash(Password, 10).then((encrypt) => {
      let newUser = new userModel({ Firstname, Lastname, Password: encrypt, Email })
      newUser.save().then(res => console.log(res))
         .catch(err => console.log(err))
   })

}
const signin = (req, res) => {
   const { Email, Password } = req.body;

   userModel.findOne({ Email: Email })
      .then((user) => {
         // class Method
         // user.comparedPassword(Password, (err, isMatch) => {
         //    console.log(isMatch)
         //    if (isMatch) {
         //       res.send({ status: true, message: 'user found' })
         //    }
         //    else {
         //       res.send({ status: false, message: 'user not found' })
         //    }
         // })


         // my method
         bcrypt.compare(Password, user.Password, (err, isMatch) => {
            console.log(isMatch)
            if (err) {
               console.log(`Error 500`)
            }
            else {
               if (isMatch) {
                  jwt.sign({ Email }, schoolPortal, { expiresIn: '1h' }, (err, token) => {
                     if (err) {
                        console.log(err)
                     }
                     else {
                        console.log(token)
                        console.log(`Authentication successful`);
                        res.json({ status: true, message: 'user found', token })
                     }
                  })
               }
               else {
                  console.log(`Authentication not successful`);
                  res.json({ status: false, message: 'user not found' })
               }
            }
         })
      })
      .catch(err => console.log('wrong credential'))
}
const getDashboard = (req, res) => {
   let token = req.headers.authorization.split(" ")[1]
   jwt.verify(token, schoolPortal, (err, result) => {
      if (err) {
         console.log(err)
         res.status(400)
      }
      else {
         console.log(result)
         res.status(200).json({ result, message: 'valid' })
      }
   })
}
const sendMail = (req, res) => {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         // TODO: replace `user` and `pass` values from <https://forwardemail.net>
         user: "abasskola10@gmail.com",
         pass: "ujyq ihsx kwgw cidf",
      },
   });

   let mailOptions = {
      from: 'Abasskola10@gmail.com', // sender address
      to: "olanipekunhikmahkikelomo@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      // html: "<b>Hello world?</b>", // html body
   }
   transporter.sendMail(mailOptions, (err, info)=>{
      if(err){
         console.log('Error occurs', err)
         res.send({mss: 'there is an error'})
      }
      else{
         console.log(`Email sent ${info.response}`)
         res.send({status: true, msg: 'user created'})
      }
   })
}
module.exports = { Register, signin, getDashboard, sendMail } 
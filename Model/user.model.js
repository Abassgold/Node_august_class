const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
let userSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: {
        type: String,
        unique : true,
    },
    Password: {
        type: String,
        minlength: 6
    }
}, { timestamps: true });


// fire a function before doc saved to db
// userSchema.pre('save', async function (next) {
//     try {
//         const salt = await bcrypt.genSalt();
//         this.Password = await bcrypt.hash(this.Password, salt)
//         console.log(this.Password)
//         next();
//     } catch (err) {
//         console.log(err)
//     }
// }) 

// userSchema.methods.comparedPassword = function(userPassword, callback){
//     bcrypt.compare(userPassword, this.Password, (err, isMatcth)=>{
//         console.log(isMatcth)
//         if(err){
//             return callback(err)
//         }
//         else{
//             if(!isMatcth){
//                 return callback(null, isMatcth)
//             }
//             else{
//                 return callback(null, this)
//             }
//         }
//     })
// }





let user = mongoose.model("user", userSchema)

module.exports = user
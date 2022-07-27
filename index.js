const express = require('express');
const mongoose = require("mongoose");
const uri = 'mongodb+srv://Vivek:oX396HqnQKytUhKP@cluster0.crgk4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true }).then(() => console.log("DataBase connected")).catch((err) => console.log(err));

//mongodb=>database=>collection=>document=>fields.
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({

   fullName: String,
   email: { type: String, unique: true },
   phoneNumber: String,
   password: String,
   created_at: { type: Date, required: true, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

// Compile model from schema
var Users = mongoose.model('Users', SomeModelSchema, 'Users');

const app = express();
app.use(express.json());

//API
app.get('/userlist', (req, res) => {
   Users.find().then((result) => {
      res.send(result)
   }).catch((err) => {
      res.send(err)
   })
   //   res.send("Hey guys this our new project!");

});

//[] array, {} object, "" string
app.post('/registration', (req, res) => {
   var Data = {}//Data ko object bna k define kiya h
   if (!req.body.fullName) {
      return res.send("fullName is missing");
   }

   if (!req.body.email) {
      return res.send("email is missing")
   }
   if (!req.body.phoneNumber) {
      return res.send("phoneNumber is missing")
   }
   if (!req.body.password) {
      return res.send("password is missing")
   }

   Data.fullName = req.body.fullName;
   Data.email = req.body.email;
   Data.phoneNumber = req.body.phoneNumber;
   Data.password = req.body.password;
   // 
   Users.create(Data).then((result) => {
      res.send("registration successully")
   }).catch((error) => {
      res.send(error)
   })
});


app.post('/login', (req, res) => {
   if (!req.body.email) {
      return res.send("email is missing")
   }

   if (!req.body.password) {
      return res.send("password is missing")
   }

   Users.findOne({ email: req.body.email, password: req.body.password }).then((result) => {
      if (result) {
         return res.send(result.fullName + " login successfully ")
      }
      else
         return res.send("user login failed")

   }).catch((error) => {
      return res.send(error)

   })



});







app.listen(3000, () => {

   console.log('Server is up on PORT 3000');

})
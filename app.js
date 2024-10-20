//CONSTS
const Express = require('express');
const app = Express();
const port = 80;
const host = '127.0.0.1';
const mongoose = require('mongoose');

// mongoose connect
mongoose.connect('mongodb://localhost/muzammil')

// static FileSystem

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

// mongoose connection

const GTHSschema = new mongoose.Schema({
  Fname: String,
  Lname: String,
  Email: String,
  Phone: String,
  Message: String
});

const GTHSmodel = new mongoose.model('GTHS', GTHSschema);

// Express files
app.use('/static', Express.static('static'));
app.set('view engine', 'pug');

// End points

app.get('/', (req, res)=>{
  res.status(200).render('index');
  console.log('index page is running');
});

app.get('/About', (req, res)=>{
  res.status(200).render('About');
  console.log('about page is running');
});

app.get('/Contact', (req, res)=>{
  res.status(200).render('Contact');
  console.log('Contact is runnig');
});

app.post('/Contact', (req, res) => {
  const schemaValue = new GTHSmodel({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Message: req.body.Message
  });
  if(!schemaValue.Fname || !schemaValue.Lname || !schemaValue.Email || !schemaValue.Phone){
    res.alert('fill the fields properly')
  }else{
  schemaValue.save()
  .then(() => {
    res.status(200).render('Contact')
  })
  .catch((err) => {
    console.error('Error saving data:', err);
    res.status(404).send('Something went wrong. Try again later');
  });
}
});



app.get('/Admission', (req, res)=>{
  res.status(200).render('Admission');
  console.log('Admission is running');
});

app.get('/base', (req, res)=>{
  res.status(200).render('base');
  console.log('base is running');
});

//server

app.listen(port, host, ()=>{
  console.log(`server succesfully start on https://${host}:${port}`);
});






// // mongoose code (created after hardwork of 4 days)

// const fs = require('fs');
// const express = require('express');
// const app = express();
// const port = 80;
// const host = 'localhost';
// const mongoose = require('mongoose');
// const { DiffieHellmanGroup } = require('crypto');

// app.use(express.json());

// mongoose.connect('mongodb://localhost/muzammil')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error(err));

// const contactSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String
// });

// const Contact = mongoose.model('Contact', contactSchema);

// app.get('/', (req, res) => {
//   var file = fs.readFileSync('index1.html', 'utf-8');
//   res.end(file);
// });

// app.post('/contact', (req, res) => {
//   const contact = new Contact({
//     name: req.body.name,
//     age: req.body.age,
//     email: req.body.email
//   });

//   async function saveAndDeleteUser  () {
//     if(contact == null){
      
//     }
//     try {
//       // Check if the user document already exists with the same email
//       const existingUser   = await Contact.findOne({ email: req.body.email });

//       if (existingUser   ) {
//         // If the user document exists, return an error message
//         res.status(404).send(`This email is already used in another account`);
//       } else {
//         // If the user document does not exist, save the new contact
//         await contact.save();
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(404).send(`Error saving contact: ${err.message}`);
//     }
//   }

//   saveAndDeleteUser  ();
// });

// app.listen(port, host, () => {
//   console.log(`Server started successfully on http://${host}:${port}`);
// });
//CONSTS
const Express = require('express');
const app = Express();
const port = 80;
const host = 'localhost';
const mongoose = require('mongoose');

// mongoose connect
mongoose.connect('mongodb://localhost/muzammil')
.then(()=>{
  console.log('mongo is connected');
}).catch(()=>{
  console.error('mongo not connected');
});
const GTHSschema = new mongoose.Schema({
  Fname: String,
  Lname: String,
  Email: String,
  Phone: String,
  Message: String
});

// static FileSystem

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());


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
    Message: req.body.Message,
  });
  if(!schemaValue.Fname || !schemaValue.Lname || !schemaValue.Email || !schemaValue.Phone){
    res.status(400).send('fill the fields properly')
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

app.get('/main%20and%20base%20page%20of%20the%20website', (req, res)=>{
  res.status(200).render('base');
  console.log('base is running');
});

app.get('/login', (req,res)=>{
  res.status(200).render('login')
console.log('login is running')
});

//server

app.listen(port, host, ()=>{
  console.log(`server succesfully start on https://${host}:${port}`);
});

// CMD COMMANDS

//attrib +h +s +r (folder name)
//telnet towel.blinkenlights.nl
//wmic path softwarelicensingservice get OA3xOriginalProductKey
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('./config/database');
require('./config/passport');
const User = require('./model/user.model');

const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const bcrypt = require('bcrypt');
const saltRounds = 10;


app.set('view engine', 'ejs');
app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    collectionName:"sessionTable"
  })
}))

app.use(passport.initialize());
app.use(passport.session());

//base url
app.get('/', (req, res) => {
  res.render('./home.ejs', { title: 'Home' });
});

//GET-REGISTER

app.get('/register', (req, res) => {
  res.render('./register.ejs', { title: 'User Registration' });
});


//POST-REGISTER
app.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({username:req.body.username})
    if(user)
    {
      return  res.status(400).send({ message: 'user is alreday exists' });
    }
    else{
        bcrypt.hash(req.body.password, saltRounds, async (err, hash)=> {
            const newUser = new User({
                username: req.body.username,
                email:req.body.email,
                password: hash
        });
        await newUser.save();
         res.redirect('/login');
       // res.send(newUser); //for checking
       })
    }
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});


const checkLoggedIn = (req,res,next)=>{
if(req.isAuthenticated()){
  return res.redirect('/profile');
}
next();

}

//GET-LOGIN
app.get('/login',checkLoggedIn, (req, res) => {
  res.render('./login.ejs', { title: 'User Login' });
});


//POST-LOGIN
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile',
  })
);



const checkAuthenticate = (req,res,next)=>{
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')

}
//GET-PROFILE ((protected-route))
app.get('/profile', checkAuthenticate, (req, res) => {
  res.render('./profile.ejs', { title: 'User Profile' });
});

//get-logout
app.get('/logout', (req, res) => {
   try {
    req.logout((err)=>{
      if(err){
          return next(err);
      }
      res.redirect('/');
    })
   } catch (error) {
    res.status(500).send(error.message);
   }
});

module.exports = app;

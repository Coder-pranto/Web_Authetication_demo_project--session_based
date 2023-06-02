
const mongoose = require('mongoose')
require('dotenv').config()
const URI = process.env.MONGO_URL

mongoose.connect(URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Database Connected successfully...'))
.catch((err)=>console.log(`> Error while connecting to mongoDB : ${err.message}`))
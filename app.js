const express=require('express');
const app=express();
const bodyParser=require("body-parser")
const path=require('path')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const helmet = require('helmet');


app.use(helmet({contentSecurityPolicy: false,}));



const mongouri="mongodb+srv://dbUser:d61NVqHI6EhQKkFv@cluster0.3k6ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// d61NVqHI6EhQKkFv dbUser
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo db")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


const store = new MongoDBStore({
    uri: mongouri,
    collection: 'mySessions'
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // 2 week
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
}));


require('./models/user')
require('./models/admin')
require('./models/Province')
require('./models/TravelPlan')


app.set('view engine', 'html');



app.use(express.json({limit: '50mb',}))


app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); 
// app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname,'/')));
app.use(require('./routes'))
app.set('view engine', 'html');

app.get('*', (req, res) => {
    res.status(404).render('404');
});


app.listen(process.env.PORT || 5000, function(){
    console.log("app is working on port 5000")
})
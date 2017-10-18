const
    dotenv = require('dotenv').load()
    express = require('express'),
    app = express(),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    userRoutes = require('./routes/users.js'),
    tripRoutes = require('./routes/trips_routes.js'),
    nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

var currentTime = new Date(new Date().getTime()).toLocaleTimeString();
const mailOptions = {
    from: process.env.GMAIL_EMAIL, // sender address
    to: 'dlorahoes@yahoo.com', // list of receivers
    subject: 'Sending from dozer app!', // Subject line
    html: `<p>${currentTime}</p>`// plain text body
};

// environment port
const
    port = process.env.PORT || 3000,
    mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/passport-authentication'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || "Connected to MongoDB (passport-authentication)")
    })

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
    });

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// session + passport
app.use(session({
	secret: "boomchakalaka",
	cookie:{maxAge : 60000000},
	resave: true,
	saveUninitialized: false,
  	store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	app.locals.currentUser = req.user // currentUser now available in ALL views
	app.locals.loggedIn = !!req.user // a boolean loggedIn now available in ALL views

	next()
})

//root route
app.get('/', (req,res) => {
    res.render('index')
})


app.use('/trips', tripRoutes)


app.use('/trips', tripRoutes)
app.use('/', userRoutes)

app.get('/test-email', (req, res) => {
    setTimeout(function() {
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) console.log(err)
            else console.log(info);
         });
    }, 3 * 60 * 1000);
    return res.send(`<h1>Doze off!!</h1>`)
})

app.listen(port, (err) => {
console.log(err || "Server running on port " + port)
})


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const driverRouter = require('./routes/driver');

const app = express();

const cors=require('cors')
const db = require('./config/connection')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods:'*',
    credentials:true
  })
);

db.connect((err) => {
  if (err) {
    // return new Error(err)
    console.log("Connection Error" + err)
  }  else {
    console.log("Database Connected")
  }
})
 

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/driver', driverRouter);


// app.get('/hi',async(req,res)=>{
//   db.get().collection('another').insertOne({isIt:'working'}).then(val=>{
//     res.json(val)
//   })
// })



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;  

app.listen(3001,()=>{
  console.log("Server Started");
})


const express = require('express');
const path = require('path')
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/Blogify').then((e)=>console.log("MongoDB Connected"));

app.set('view engine', 'ejs');
app.set('views' , path.resolve("./views"))

app.use(express.urlencoded({extended:false}));

app.get('/' ,(req , res)=>{
    res.render('home');
})

app.use('/user' , userRouter);


app.listen(PORT, () => {`Server started at PORT ${PORT}`})
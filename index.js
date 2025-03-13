const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog')


const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const checkForAuthenticationCookie = require('./middlewares/authentication');
const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/Blogify').then((e) => console.log("MongoDB Connected"));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public/')));

app.get('/', async (req, res) => {

    const allBlogs = await Blog.find({});

    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user', userRouter);
app.use('/blog', blogRouter); //Blog Route Initialase kr diya 


app.listen(PORT, () => { `Server started at PORT ${PORT}` })
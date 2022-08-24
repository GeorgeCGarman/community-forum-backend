const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv")
const middleware = require('./middleware/index')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const questionRouter = require("./routes/questionRoutes")
const commentRouter = require("./routes/commentRoutes")
const upvoteRouter = require("./routes/upvoteRouter")

const app = express()
dotenv.config()
//use this for Production
// const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
//local
// MONGO_URL=``
// const mongoURL = process.env.MONGO_URL
const mongoURL = `mongodb://localhost:27017/forum-db`
const connectWithRetry = () =>{
mongoose
    .connect(mongoURL)
    .then(()=> console.log("Successfully connected to DB"))
    .catch((e)=> {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
}
connectWithRetry()

app.enable("trust proxy");
app.use(cors({}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//Middleware
// app.use(middleware.decodeToken);

app.use("/questions", questionRouter)
app.use("/comments", commentRouter)
app.use("/upvotes", upvoteRouter)


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on port ${port}`))
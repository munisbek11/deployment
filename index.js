const express = require("express")
const cors = require("cors")
const authRouter = require("./router/auth_router")
const courseRouter = require("./router/course_router")
require("dotenv").config()

const app = express()


app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 4000


app.use(authRouter)
app.use(courseRouter)


app.listen(PORT, ()=>{
  console.log(`Server is running on the port http://localhost:${PORT}`);
})
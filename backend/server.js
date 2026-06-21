require("dotenv").config()

const express=require("express")

const cors=require("cors")

const path=require("path")

const fs=require("fs")

const app=express()



if(!fs.existsSync("uploads")){
 fs.mkdirSync("uploads",{recursive:true})
}

if(!fs.existsSync("reports")){
 fs.mkdirSync("reports",{recursive:true})
}

app.use(
  cors({
    origin: [
      "https://interview-ai-platform-ten.vercel.app"
    ],
    credentials: true
  })
)

app.use(express.json())

app.use("/api/auth",require("./routes/authRoutes"))

app.use("/api/resume",require("./routes/resumeRoutes"))

app.use("/api/interview",require("./routes/interviewRoutes"))

app.use(

"/reports",

express.static(

path.join(

__dirname,

"reports"

)

)

)

app.get("/",(req,res)=>{

res.send("Backend Running")

})

const PORT=

process.env.PORT || 5000

app.listen(PORT,()=>{

console.log(

`Server Running on port ${PORT}`

)

})
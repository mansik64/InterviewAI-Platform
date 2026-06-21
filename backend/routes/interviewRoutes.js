const express=require("express")

const router=express.Router()

const {

generateInterview,

submitAnswer,

saveInterview,

getDashboard,

getHistory,

deleteInterview

}=require(

"../controllers/interviewController"

)



router.post(

"/generate",

generateInterview

)



router.post(

"/submit",

submitAnswer

)



router.post(

"/save",

saveInterview

)



router.get(

"/dashboard",

getDashboard

)



router.get(

"/history",

getHistory

)



router.delete(

"/:id",

deleteInterview

)



module.exports=

router
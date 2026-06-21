const {

deleteResume

}=require(

"../controllers/resumeController"

)
const router=require("express").Router()

const {

getResumeHistory

}=require(

"../controllers/resumeController"

)

const upload=require("../config/upload")

const {
uploadResume
}=require("../controllers/resumeController")

router.post(

"/upload",

upload.single("resume"),

uploadResume

)

router.get(

"/history",

getResumeHistory

)

router.delete(

"/:id",

deleteResume

)
module.exports=router
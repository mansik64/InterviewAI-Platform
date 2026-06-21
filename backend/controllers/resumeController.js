const {

generateResumeReport

}=require(

"../services/resumeReportGenerator"

)
const supabase=

require("../config/supabase")

const {

extractResume

}=require(

"../services/resumeAnalyzer"

)

const {

analyzeResume

}=require(

"../services/gemini"

)



exports.uploadResume=

async(req,res)=>{

try{

if(!req.file){

return res

.status(400)

.json({

message:

"No file uploaded"

})

}



const text=

await extractResume(

req.file.path

)



const result=

await analyzeResume(

text

)


const pdfUrl=

await generateResumeReport(

result.analysis

)





const userId=

req.body.userId



const {data,error}=await supabase

.from(

"resumes"

)

.insert([{

user_id:userId,

file_url:req.file.originalname,

ats_score:result.analysis.atsScore,

skills:result.analysis.skills,

suggestions:result.analysis.suggestions.join("\n"),

pdf_url:pdfUrl

}])

.select()


console.log(data)

console.log(error)


if(error){

throw error

}



res.json({

message:"AI Analysis Complete",

source:result.source,

analysis:result.analysis,

pdfUrl

})


}

catch(err){

res

.status(500)

.json({

error:

err.message

})

}

}
exports.deleteResume=

async(req,res)=>{

try{

const {

id

}=req.params

await supabase

.from(

"resumes"

)

.delete()

.eq(

"id",

id

)

res.json({

message:

"Deleted"

})

}

catch(err){

res.status(500)

.json({

message:

err.message

})

}

}


exports.getResumeHistory=

async(req,res)=>{

try{



const {

userId

}=req.query



const {

data,

error

}=await supabase

.from(

"resumes"

)

.select("*")

.eq(

"user_id",

userId

)

.order(

"created_at",

{

ascending:false

}

)



if(error){

throw error

}



res.json(data)



}

catch(err){

res

.status(500)

.json({

message:

err.message

})

}

}
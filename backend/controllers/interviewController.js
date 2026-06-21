const supabase = require("../config/supabase")

const { evaluateAnswer } = require("../services/answerEvaluator")

const { generateQuestions } = require("../services/questionGenerator")

const { generateReport } = require("../services/reportGenerator")



exports.generateInterview = async (req, res) => {

try{

const { role } = req.body

if(!role){

return res.status(400).json({

message:"role is required"

})

}

const result = await generateQuestions(

role,

10

)

res.json({

success:true,

role,

source:result.source,

questions:result.questions

})

}

catch(err){

res.status(500).json({

message:"Generation Failed",

error:err.message

})

}

}



exports.submitAnswer = async (req,res)=>{

try{

const {

question,

answer,

role

}=req.body



if(

!question ||

!answer

){

return res.status(400)

.json({

message:

"question and answer are required"

})

}



const result=

await evaluateAnswer(

question,

answer,

role || "General"

)



res.json({

success:true,

...result

})

}

catch(err){

res.status(500)

.json({

message:

"Evaluation Failed",

error:

err.message

})

}

}



exports.saveInterview = async (

req,

res

)=>{

try{
  console.log("SAVE API HIT")

console.log(req.body)

const {

userId,

role,

rounds,

practiceMinutes

}=req.body



if(

!Array.isArray(rounds)

||

rounds.length===0

){

return res.status(400)

.json({

message:

"No interview data"

})

}



const overall=Math.round(

rounds.reduce(

(a,b)=>

a+(b.feedback?.overallScore || 0),

0

)

/rounds.length

)

const technical=Math.round(

rounds.reduce(

(a,b)=>

a+(b.feedback?.completeness || 0),

0

)

/rounds.length

)



const communication=Math.round(

rounds.reduce(

(a,b)=>

a+(b.feedback.communication || 0),

0

)

/rounds.length

)



const confidence=Math.round(

rounds.reduce(

(a,b)=>

a+(b.feedback.confidence || 0),

0

)

/rounds.length

)



const fluency=Math.round(

rounds.reduce(

(a,b)=>

a+(b.feedback.clarity || 0),

0

)

/rounds.length

)



const pronunciation =

Math.round(

communication*0.95

)



let feedback = ""

if(overall<40){

feedback+=

"Overall performance needs improvement.\n\n"

}

if(technical<50){

feedback+=

`Technical Skills:\n
• Strengthen core ${role} concepts
• Practice 2 coding questions daily
• Revise important interview topics\n\n`

}

if(communication<50){

feedback+=

`Communication:\n
• Speak slower and use complete sentences
• Practice explaining concepts aloud
• Avoid one-word answers\n\n`

}

if(confidence<50){

feedback+=

`Confidence:\n
• Practice mock interviews
• Maintain eye contact
• Avoid long pauses\n\n`

}

if(pronunciation<50){

feedback+=

`Pronunciation:\n
• Read technical articles aloud
• Practice English speaking daily
• Record your voice and listen back\n\n`

}

feedback +=

`Topics to learn for ${role}:\n`


const roleTopics={

"Frontend Developer":[

"React Hooks",

"Virtual DOM",

"SSR vs CSR",

"Closures",

"State Management"

],

"Backend Developer":[

"NodeJS",

"Express",

"JWT",

"REST APIs",

"Database Design"

],

"HR Manager":[

"Recruitment",

"Employee Relations",

"Compliance",

"Performance Management",

"HR Analytics"

]

}

const topics=

roleTopics[role]

||

["Core concepts"]

feedback +=

topics.join(", ")



const {

data:interview,

error

}=await supabase

.from(

"interviews"

)

.insert([{

user_id:userId,

role,

difficulty:"AI",

overall_score:overall,

technical_score:technical,

communication_score:communication,

confidence_score:confidence,

fluency_score:fluency,

pronunciation_score:pronunciation,

practice_minutes:practiceMinutes,

feedback,

completed:true

}])

.select()

.single()



console.log("INSERT ERROR :",error)

console.log("INSERT DATA :",interview)

if(error){

throw error

}



for(

const round

of rounds

){

await supabase

.from(

"interview_answers"

)

.insert([{

interview_id:

interview.id,

question:

round.question,

answer:

round.answer,

score:

round.feedback.overallScore,

feedback:

round.feedback.feedback

}])

}



const pdf=

await generateReport({

role,

overallScore:overall,

technicalScore:technical,

communicationScore:communication,

confidenceScore:confidence,

fluencyScore:fluency,

pronunciationScore:pronunciation,

practiceMinutes,

feedback

})



const pdfUrl=

`http://localhost:5000/reports/${pdf}`



const {

data:updateData,

error:updateError

}=await supabase

.from("interviews")

.update({

pdf_url:pdfUrl

})

.eq(

"id",

interview.id

)

.select()

.single()


console.log(

"PDF UPDATE ERROR :",

updateError

)

console.log(

"PDF UPDATE DATA :",

updateData

)



res.json({

success:true,

pdfUrl

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



exports.getDashboard = async (

req,

res

)=>{

try{

const {

userId

}=req.query



const {

data

}=await supabase

.from(

"interviews"

)

.select("*")

.eq(

"user_id",

userId

)

.eq(

"completed",

true

)



const interviews=

data || []

const completed=

interviews.length



const average=

completed

?

Math.round(

interviews.reduce(

(a,b)=>

a+b.overall_score,

0

)

/completed

)

:0


const totalMinutes=

interviews.reduce(

(a,b)=>

a+b.practice_minutes,

0

)

const hours=

totalMinutes>=60

?

(totalMinutes/60).toFixed(1)+" h"

:

totalMinutes+" mins"

res.json({

completed,

average,

hours

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


exports.getHistory=async(

req,

res

)=>{

try{

const{

userId

}=req.query

const{

data,

error

}=await supabase

.from(

"interviews"

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

res.status(500)

.json({

message:

err.message

})

}

}



exports.deleteInterview=async(

req,

res

)=>{

try{

const{

id

}=req.params

const{

error

}=await supabase

.from(

"interviews"

)

.delete()

.eq(

"id",

id

)

if(error){

throw error

}

res.json({

success:true,

message:

"Interview deleted"

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
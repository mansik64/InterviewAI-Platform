const Groq = require("groq-sdk")

const groq = new Groq({

apiKey:process.env.GROQ_API_KEY

})

exports.groqEvaluate = async(

question,

answer,

role

)=>{

try{

const completion=

await groq.chat.completions.create({

model:"llama-3.1-8b-instant",

messages:[

{

role:"system",

content:`

You are an expert technical interviewer.

Evaluate ONLY the candidate answer.

Rules:

1. Score only what the candidate actually wrote.

2. Wrong answers should receive very low marks.

3. One-word answers should receive 0.

4. Generate personalized feedback.

5. Generate role-specific improvement suggestions.

6. Generate communication suggestions if needed.

7. Generate confidence suggestions if needed.

8. Generate topics to learn according to the role.

Return ONLY JSON.

{

"overallScore":0,

"relevance":0,

"clarity":0,

"communication":0,

"completeness":0,

"confidence":0,

"feedback":"",

"improvementAreas":[""],

"recommendedTopics":[""]

}

`

},

{

role:"user",

content:`

Role:${role}

Question:${question}

Answer:${answer}

`

}

],

temperature:0.3,

max_tokens:250

})

let text=

completion.choices[0]

.message.content

.trim()

text=text

.replace(/```json/g,"")

.replace(/```/g,"")

.trim()

return JSON.parse(text)

}

catch(err){

return null

}

}
const {
  GoogleGenerativeAI
} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
)
const Groq = require("groq-sdk")

const groq = new Groq({
 apiKey:process.env.GROQ_API_KEY
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Static fallback bank, used only if Gemini is unavailable
const FALLBACK_QUESTIONS = {
  "Frontend Developer": [
    "Explain React Hooks and why they were introduced.",
    "What is the Virtual DOM and how does it improve performance?",
    "Difference between SSR and CSR.",
    "How does CSS specificity work?",
    "What are closures in JavaScript?",
    "Explain the difference between let, const, and var.",
    "How would you optimize a slow-loading webpage?",
    "What is the difference between controlled and uncontrolled components in React?",
    "Explain event bubbling and capturing.",
    "How do you manage state in a large React application?"
  ],
  "Backend Developer": [
    "What is a REST API and what makes an API RESTful?",
    "Explain JWT and how it's used for authentication.",
    "How does Express.js middleware work?",
    "What is the difference between SQL and NoSQL databases?",
    "Explain database indexing and why it matters.",
    "How would you handle rate limiting in an API?",
    "What is the N+1 query problem?",
    "Explain the difference between PUT and PATCH.",
    "How do you secure a backend API?",
    "What is connection pooling and why is it important?"
  ],
  "Full Stack Developer": [
    "How does the frontend communicate with the backend in a typical web app?",
    "What is authentication and how does it differ from authorization?",
    "Explain how you would design a scalable full stack application.",
    "What is CORS and why does it matter?",
    "How do you handle state management across frontend and backend?",
    "Explain RESTful API design principles.",
    "How would you debug a production issue spanning both frontend and backend?",
    "What is the role of caching in a full stack application?",
    "Explain the request-response lifecycle in a web application.",
    "How do you ensure data consistency between client and server?"
  ],
  "Data Scientist": [
    "What is supervised learning and how does it differ from unsupervised learning?",
    "Explain the difference between regression and classification.",
    "What is overfitting and how do you prevent it?",
    "Explain the bias-variance tradeoff.",
    "What is cross-validation and why is it used?",
    "How would you handle missing data in a dataset?",
    "Explain precision, recall, and F1 score.",
    "What is feature engineering?",
    "How do you evaluate a clustering model?",
    "Explain the difference between bagging and boosting."
  ],
  "HR Manager": [
    "Tell me about yourself.",
    "Why should we hire you?",
    "Describe a time you handled a conflict at work.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "Why do you want to leave your current job?",
    "Describe a time you failed and what you learned.",
    "How do you handle pressure or stressful situations?",
    "What motivates you in your work?",
    "Do you have any questions for us?"
  ]
}

exports.generateQuestions = async (role, count = 10) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

  const prompt = `
You are an expert technical interviewer.
Generate exactly ${count} unique interview questions for a candidate applying for the role of "${role}".

Mix the question types: include technical/role-specific questions, a couple of behavioral questions, and at least one scenario-based question. Vary difficulty from beginner to advanced.

Respond ONLY with a valid JSON array of strings, no markdown, no backticks, no extra text, no numbering. Example format:
["Question 1 text", "Question 2 text", "Question 3 text"]
`

  const MAX_RETRIES = 1

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      let text = result.response.text().trim()
      text = text.replace(/```json/g, "").replace(/```/g, "").trim()

      const parsed = JSON.parse(text)

      if (Array.isArray(parsed) && parsed.length > 0) {
        return { source: "gemini", questions: parsed.slice(0, count) }
      }
      throw new Error("Parsed result was not a valid question array")

    } catch (error) {
      console.log(`QUESTION GEN ATTEMPT ${attempt} FAILED:`, error.message)
      const isOverloaded = error.message && error.message.includes("503")
      const isLastAttempt = attempt === MAX_RETRIES

      if (isOverloaded && !isLastAttempt) {
        await sleep(attempt * 1000)
        continue
      }
      break
    }
  }

  // Fallback: use static bank, fill up to `count` if a role list is shorter
 try{

const completion=

await groq.chat.completions.create({

model:"llama-3.3-70b-versatile",

messages:[

{

role:"user",

content:`

Generate exactly ${count}

interview questions for

${role}.

Mix:

technical,

behavioral,

scenario based.

Return ONLY JSON array.

`

}

],

temperature:0.7

})

const text=

completion.choices[0]

.message.content

.trim()

const parsed=

JSON.parse(text)

return{

source:"groq",

questions:parsed.slice(0,count)

}

}

catch(error){

console.log(

"GROQ FAILED:",

error.message

)
const bank=

FALLBACK_QUESTIONS[role]

||

[

`Explain the fundamentals of ${role}`,

`What skills are required for ${role}?`,

`What projects would you build as ${role}?`,

`What tools are used in ${role}?`,

`What challenges are faced in ${role}?`,

`How would you prepare for a ${role} interview?`,

`Explain an important concept in ${role}.`,

`How would you solve a real-world problem using ${role}?`,

`What are current trends in ${role}?`,

`How would you improve yourself in ${role}?`

]

return{

source:"fallback",

questions:bank.slice(0,count)

}

}
}

const {
  GoogleGenerativeAI
} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
)

// Small helper to pause between retries
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

exports.analyzeResume = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

const prompt=`

You are an ATS Resume Analyzer.

Analyze this resume.

Resume:

${text}

Return ONLY JSON.

{

"resumeScore":0,

"atsScore":0,

"skills":[""],

"strengths":[""],

"weaknesses":[""],

"suggestions":[""]

}

Rules:

1. ATS score should be realistic.

2. Detect technical skills.

3. Generate strengths.

4. Generate weaknesses.

5. Generate suggestions.

6. Mention missing sections.

7. Keep suggestions concise.

`

  const MAX_RETRIES = 3

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      let response=

result.response

.text()

.trim()

response=response

.replace(/```json/g,"")

.replace(/```/g,"")

.trim()

return{

source:"gemini",

analysis:

JSON.parse(response)

}
    } catch (error) {
      console.log(`GEMINI ATTEMPT ${attempt} FAILED:`, error.message)

      // If it's a temporary overload (503), wait and retry
      const isOverloaded = error.message && error.message.includes("503")
      const isLastAttempt = attempt === MAX_RETRIES

      if (isOverloaded && !isLastAttempt) {
        await sleep(attempt * 1000) // wait 1s, then 2s, then 3s
        continue
      }

      // Any other error, or out of retries -> fallback
      break
    }
  }

  // ---- FALLBACK LOGIC (unchanged from your original) ----
  let score = 50
  const strengths = []
  const weaknesses = []
  const suggestions = []

  if (text.toLowerCase().includes("project")) {
    score += 15
    strengths.push("Projects included")
  } else {
    weaknesses.push("Projects missing")
    suggestions.push("Add projects")
  }

  if (text.toLowerCase().includes("skill")) {
    score += 15
    strengths.push("Skills section present")
  } else {
    weaknesses.push("Skills section missing")
    suggestions.push("Add technical skills")
  }

  if (text.toLowerCase().includes("experience")) {
    score += 10
    strengths.push("Experience included")
  } else {
    weaknesses.push("Experience missing")
    suggestions.push("Add experience section")
  }

  if (text.length > 1000) {
    score += 10
    strengths.push("Detailed resume")
  }

  return {
    source: "fallback",
    analysis:{

resumeScore:score,

atsScore:score-5,

strengths,

weaknesses,

suggestions

}
  }
}
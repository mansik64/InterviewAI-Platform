const {
  GoogleGenerativeAI
} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
)

const {

groqEvaluate

}=require(

"./groqEvaluator"

)



// const sleep = (ms) =>
//   new Promise(resolve =>
//     setTimeout(resolve, ms)
//   )

 

exports.evaluateAnswer = async (
  question,
  answer,
  role
) => {

  const trimmedAnswer =
    (answer || "").trim()

  const lowerAnswer =
    trimmedAnswer.toLowerCase()

  const lowerQuestion =
    (question || "").toLowerCase()

  const wordCount =
    trimmedAnswer
      .split(/\s+/)
      .filter(Boolean)
      .length


  // ==========================
  // 1. EMPTY ANSWER
  // ==========================

  if (!trimmedAnswer) {

    return {

      source: "rule-based",

      overallScore: 0,

      relevance: 0,

      clarity: 0,

      communication: 0,

      completeness: 0,

      confidence: 0,

      feedback:
        "No answer provided.",

      improvementAreas: [

        "Attempt every question"

      ]

    }

  }


  // ==========================
  // 2. SINGLE LETTER
  // ==========================

  if (

    trimmedAnswer.length === 1

  ) {

    return {

      source: "rule-based",

      overallScore: 0,

      relevance: 0,

      clarity: 0,

      communication: 0,

      completeness: 0,

      confidence: 0,

      feedback:
        "Single letters are not valid interview answers.",

      improvementAreas: [

        "Explain the concept"

      ]

    }

  }


  // ==========================
  // 3. RANDOM WORDS
  // ==========================

  const invalidAnswers = [

    "hi",

    "hello",

    "hey",

    "ok",

    "okay",

    "yes",

    "no",

    "hii",

    "thanks",

    "thank you"

  ]


  if (

    invalidAnswers.includes(

      lowerAnswer

    )

  ) {

    return {

      source: "rule-based",

      overallScore: 0,

      relevance: 0,

      clarity: 0,

      communication: 0,

      completeness: 0,

      confidence: 0,

      feedback:
        "This is not a valid interview answer.",

      improvementAreas: [

        "Provide a technical explanation"

      ]

    }

  }


  // ==========================
  // 4. SYMBOLS ONLY
  // ==========================

  if (

    /^[^a-zA-Z0-9]+$/

      .test(trimmedAnswer)

  ) {

    return {

      source: "rule-based",

      overallScore: 0,

      relevance: 0,

      clarity: 0,

      communication: 0,

      completeness: 0,

      confidence: 0,

      feedback:
        "Invalid answer detected.",

      improvementAreas: [

        "Provide an actual answer"

      ]

    }

  }


  // ==========================
  // QUESTION TYPE DETECTION
  // ==========================

  // const isFullFormQuestion =

  //   lowerQuestion.includes(

  //     "stands for"

  //   )


  // const isDefinitionQuestion =

  //   lowerQuestion.includes(

  //     "what is"

  //   )


  // const isExplainQuestion =

  //   lowerQuestion.includes(

  //     "explain"

  //   )


  // const isScenarioQuestion =

  //   lowerQuestion.includes(

  //     "how would"

  //   )

  //   ||

  //   lowerQuestion.includes(

  //     "how do you"

  //   )


  // const isBehavioralQuestion =

  //   lowerQuestion.includes(

  //     "tell me about"

  //   )

  //   ||

  //   lowerQuestion.includes(

  //     "describe a time"

  //   )


  // ==========================
  // SHORT ANSWER RULES
  // ==========================

  if (

    wordCount <= 2

  ) {

    // Valid full form

    if (

      isFullFormQuestion

    ) {

      // Allow Gemini

    }

    // Valid definition

    else if (

      isDefinitionQuestion

      &&

      trimmedAnswer.length > 15

    ) {

      // Allow Gemini

    }

    else {

      return {

        source: "rule-based",

        overallScore: 0,

        relevance: 0,

        clarity: 0,

        communication: 0,

        completeness: 0,

        confidence: 0,
feedback:

`Very poor answer.

This response is too short to evaluate.

Provide a complete explanation instead of one-word responses.`,

        improvementAreas: [

          "Add explanation",

          "Use examples"

        ]

      }

    }

  }


  // ==========================
  // GEMINI
  // ==========================

  const model =

    genAI.getGenerativeModel({

      model:

      "gemini-2.5-flash"

    })


const prompt=`

You are an expert technical interviewer.

Role:

${role}

Question:

${question}

Candidate Answer:

${trimmedAnswer}

Evaluate ONLY the candidate answer.

Rules:

1. Do not invent skills.

2. Wrong answers should get very low scores.

3. One-word answers should get 0.

4. Excellent answers score above 85.

5. Generate personalized feedback.

6. Generate role-specific suggestions.

7. Generate role-specific topics to learn.

8. Generate communication tips if needed.

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


  const MAX_RETRIES = 1


  for (

    let attempt = 1;

    attempt <= MAX_RETRIES;

    attempt++

  ) {

    try {

      const result =

        await model.generateContent(

          prompt

        )

      let text =

        result.response

          .text()

          .trim()


      text = text

        .replace(

          /```json/g,

          ""

        )

        .replace(

          /```/g,

          ""

        )

        .trim()


      const parsed =

        JSON.parse(text)

console.log("USING GEMINI")
      return {

        source: "gemini",

        ...parsed

      }

    }

   catch(error){

console.log(

"GEMINI FAILED:",

error.message

)

const groq=

await groqEvaluate(

question,

trimmedAnswer,

role

)

if(groq){
  console.log("USING GROQ")

return{

source:"groq",

...groq

}

}

break

}

  }


  // ==========================
  // FALLBACK
  // ==========================

  let baseScore = 20


  if (

    wordCount >= 15

  ) {

    baseScore = 35

  }


  if (

    wordCount >= 30

  ) {

    baseScore = 50

  }

let feedback=`

AI evaluation was unavailable.

General Suggestions:

• Improve technical explanations

• Use complete sentences

• Give real-world examples

• Practice speaking confidently

• Revise important concepts related to your chosen role

`


return{

source:"fallback",

overallScore:baseScore,

relevance:Math.max(baseScore-10,0),

clarity:baseScore,

communication:baseScore,

completeness:Math.max(baseScore-10,0),

confidence:Math.max(baseScore-10,0),

feedback,

improvementAreas:[

"Practice technical concepts",

"Improve communication"

]

}
}
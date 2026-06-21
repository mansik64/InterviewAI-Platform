"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Send,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Trophy,
  X,
  RotateCcw,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Feedback {
  overallScore: number;
  relevance: number;
  clarity: number;
  communication: number;
  completeness: number;
  confidence: number;
  feedback: string;
  improvementAreas: string[];
  source: string;
}

interface Round {
  question: string;
  answer: string;
  feedback: Feedback | null;
}

export default function LiveInterviewPage() {
  const router = useRouter();

  const [role, setRole] = useState("Frontend Developer");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rounds, setRounds] = useState<Round[]>([]);

  const [textAnswer, setTextAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const interviewStartRef = useRef(Date.now());
  const hasSavedRef = useRef(false);


  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("interview_role");
    const storedQuestions = sessionStorage.getItem("interview_questions");

    if (storedRole) setRole(storedRole);
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      setQuestions([
        "Tell me about yourself",
        "What are your strengths and weaknesses?",
      ]);
    }
    setIsLoadingQuestions(false);

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setTextAnswer(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

    useEffect(() => {

 if(isFinished){

   return

 }

 const timer = setInterval(() => {

   setTimeLeft((prev) => {

     if(prev<=1){

       return 0

     }

     return prev-1

   })

 },1000)

 return ()=>clearInterval(timer)

},[currentIndex,isFinished])


useEffect(()=>{

 if(

   timeLeft===0 &&

   !isFinished &&

   !isEvaluating

 ){

   handleSubmitAnswer(true)

 }

},[timeLeft])



 const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTextAnswer("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // Submits the answer, evaluates it silently in the background, and
  // immediately advances to the next question (or finish screen) WITHOUT
  // showing per-question feedback.
  const handleSubmitAnswer = async (

isAuto=false

)=>{

if(

!textAnswer.trim()

&&

!isAuto

){

return

}

if(

!textAnswer.trim()

&&

isAuto

){

setTextAnswer(

"No answer submitted"

)

}

if(

isRecording

&&

recognitionRef.current

){

recognitionRef.current.stop()

setIsRecording(false)

}

setIsEvaluating(true)

const answeredQuestion=

questions[currentIndex]

const answeredText=

textAnswer.trim()

||

"No answer submitted"

let feedback: Feedback | null = null

try{

const response=

await fetch(

'${process.env.NEXT_PUBLIC_API_URL}/api/interview/submit',

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

question:

answeredQuestion,

answer:

answeredText,

role

})

}

)

const data=

await response.json()

feedback={

overallScore:

data.overallScore??0,

relevance:

data.relevance??0,

clarity:

data.clarity??0,

communication:

data.communication??0,

completeness:

data.completeness??0,

confidence:

data.confidence??0,

feedback:

data.feedback??"",

improvementAreas:

data.improvementAreas??[],

source:

data.source??"fallback"

}

setRounds(

(prev)=>

[

...prev,

{

question:

answeredQuestion,

answer:

answeredText,

feedback

}

]

)

}

catch{

feedback={

overallScore:0,

relevance:0,

clarity:0,

communication:0,

completeness:0,

confidence:0,

feedback:"Backend unavailable",

improvementAreas:[],

source:"error"

}

setRounds(

(prev)=>

[

...prev,

{

question:answeredQuestion,

answer:answeredText,

feedback

}

]

)

}


finally{

setIsEvaluating(false)

setTextAnswer("")

setTimeLeft(300)

const isLastQuestion=

currentIndex+1>=questions.length

if(isLastQuestion){
  if(hasSavedRef.current){

return

}

hasSavedRef.current=true

try{

const user=

JSON.parse(

localStorage.getItem("user")

||

"{}"

)
console.log(user)

const practiceMinutes=

Math.ceil(

(

Date.now()

-

interviewStartRef.current

)

/60000

)

await fetch(

'${process.env.NEXT_PUBLIC_API_URL}/api/interview/save',

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

userId:user.id,

role,

rounds:[

...rounds,

{

question:

answeredQuestion,

answer:

answeredText,

feedback

}

],

practiceMinutes

})

}

)

}

catch(err){

console.log(

"Save Error",

err

)

}

setIsFinished(true)

}

else{

setCurrentIndex(

(prev)=>

prev+1

)

}

}

}

  const overallAverage =
    rounds.length > 0
      ? Math.round(
          rounds.reduce((sum, r) => sum + (r.feedback?.overallScore || 0), 0) /
            rounds.length
        )
      : 0;






  if (isLoadingQuestions) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  

  // ---------- FINISHED SCREEN: full report shown only here ----------
  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy size={48} className="text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-2">
                Interview Complete
              </h1>
              <p className="text-slate-500 font-medium mb-10">
                {role} Mock Interview &middot; {questions.length} questions
              </p>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Overall Score
                </p>
                <p className="text-6xl font-black text-white">
                  {overallAverage}
                  <span className="text-2xl text-slate-500">/100</span>
                </p>
              </div>

              <div className="space-y-6 text-left mb-10">
                {rounds.map((r, i) => (
                  <div
                    key={i}
                    className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100"
                  >
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">
                      Question {i + 1}
                    </p>
                    <p className="font-bold text-slate-900 mb-3">
                      {r.question}
                    </p>
                    <p className="text-sm text-slate-500 mb-4 italic">
                      "{r.answer}"
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-slate-900">
                        {r.feedback?.overallScore}%
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {r.feedback?.source === "gemini"
                          ? "AI Evaluated"
                          : "Auto-Scored"}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {[
                        ["Rel", r.feedback?.relevance],
                        ["Clr", r.feedback?.clarity],
                        ["Comm", r.feedback?.communication],
                        ["Comp", r.feedback?.completeness],
                        ["Conf", r.feedback?.confidence],
                      ].map(([label, val]) => (
                        <div key={label as string} className="text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase">
                            {label}
                          </p>
                          <p className="text-sm font-black text-slate-900">
                            {val}%
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-slate-600 mb-3">
                      {r.feedback?.feedback}
                    </p>

                    {r.feedback?.improvementAreas &&
                      r.feedback.improvementAreas.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {r.feedback.improvementAreas.map((area, j) => (
                            <span
                              key={j}
                              className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/interview")}
                  className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw size={18} /> New Interview
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ---------- ACTIVE INTERVIEW SCREEN: no feedback shown between questions ----------
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {role} &middot; Question {currentIndex + 1} of{" "}
                {questions.length}
              </span>

              <div
className="text-red-500 font-black text-sm"
>

{Math.floor(

timeLeft/60

)}

:

{String(

timeLeft%60

)

.padStart(

2,

"0"

)}

</div>
              <button
                onClick={() => router.push("/interview")}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${(currentIndex / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 mb-8 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">
              Interviewer asks
            </p>
            <h1 className="text-3xl font-black text-white leading-tight">
              {questions[currentIndex]}
            </h1>
          </div>

          <div className="flex flex-col items-center mb-8">
            {speechSupported ? (
              <button
                onClick={toggleRecording}
                disabled={isEvaluating}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                  isRecording
                    ? "bg-red-500 animate-pulse scale-110"
                    : "bg-blue-600 hover:scale-105"
                }`}
              >
                {isRecording ? (
                  <MicOff size={36} className="text-white" />
                ) : (
                  <Mic size={36} className="text-white" />
                )}
              </button>
            ) : null}
            <p className="text-slate-400 font-bold text-sm mt-4">
              {speechSupported
                ? isRecording
                  ? "Listening... tap to stop"
                  : "Tap to speak your answer"
                : "Voice not supported in this browser — type below"}
            </p>
          </div>

          <div className="bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-6 mb-8">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Your answer will appear here as you speak, or you can type it directly..."
              className="w-full bg-transparent outline-none font-medium text-slate-900 resize-none min-h-[120px]"
            />
          </div>

          <button
           onClick={() => handleSubmitAnswer()}
           disabled={!textAnswer.trim() || isEvaluating}
           className="w-full bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all"
             >
            {isEvaluating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {currentIndex + 1 >= questions.length
                  ? "Finishing up..."
                  : "Saving answer..."}
              </>
            ) : (
              <>
                <Send size={18} />
                {currentIndex + 1 >= questions.length
                  ? "Submit Final Answer"
                  : "Next Question"}
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

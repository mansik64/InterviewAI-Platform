"use client";
import React, {useState,useEffect} from "react";
import { Play, Calendar, Clock, Trophy, ChevronRight, X, CheckCircle2, AlertCircle, Edit3, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function InterviewPage() {
  const router = useRouter();
  const [showMockModal, setShowMockModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [scheduledTime,setScheduledTime]=useState("")

const [dateError,setDateError]=useState("")

type UpcomingInterview={

time:string

role:string

}

const [upcoming,setUpcoming]=

useState<UpcomingInterview|null>(null)

const [isGenerating,setIsGenerating]=useState(false)
  const [dashboard, setDashboard] = useState({
  completed:0,
  average:0,
  hours:0
  })

  // Role Selection States
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [customRole, setCustomRole] = useState("");

    


useEffect(()=>{

const loadDashboard=async()=>{

try{

const user=

JSON.parse(

localStorage.getItem(

"user"

)

||

"{}"

)

if(!user.id){

return

}

const response=

await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/interview/dashboard?userId=${user.id}`

)

const data=

await response.json()

setDashboard({

completed:data.completed||0,

average:data.average||0,

hours:data.hours||0

})

}

catch(err){

console.log(err)

}

}

loadDashboard()

const saved=

localStorage.getItem(

"upcomingInterview"

)

if(saved){

const interview=

JSON.parse(saved)

setUpcoming(interview)

setScheduledTime(interview.time)

}

},[])





const handleConfirmSchedule=(e:any)=>{

e.preventDefault()

const now=new Date()

const pickedDate=new Date(scheduledTime)

if(pickedDate<now){

setDateError(

"Error: You cannot schedule an interview in the past!"

)

return

}

setDateError("")

const interview={

time:scheduledTime,

role:selectedRole

}

localStorage.setItem(

"upcomingInterview",

JSON.stringify(interview)

)

setUpcoming(interview)

setShowCalendar(false)

}

 
  const handleStartInterview = async () => {
    const role = selectedRole === "Other" ? customRole : selectedRole;

    if (!role.trim()) {
      alert("Please enter a role");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(
        '${process.env.NEXT_PUBLIC_API_URL}/api/interview/generate',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        }
      );

      const data = await response.json();

      // Save role + questions so the live interview page can read them
      sessionStorage.setItem("interview_role", role);
      sessionStorage.setItem(
        "interview_questions",
        JSON.stringify(data.questions || [])
      );

      setShowMockModal(false);
      router.push("/interview/live");
    } catch (err) {
      console.log(err);
      alert("Interview Generation Failed. Is the backend running on port 5000?");
    } finally {
      setIsGenerating(false);
    }
  };


  const handleCancel=()=>{

localStorage.removeItem(

"upcomingInterview"

)

setUpcoming(null)

setScheduledTime("")

}

const canStartInterview=()=>{

if(!upcoming){

return false

}

const now=new Date()

const interviewDate=

new Date(

upcoming.time

)

return now>=interviewDate

}

const handleScheduledInterview=()=>{

if(

!canStartInterview()

){

return

}

router.push(

"/interview/live"

)

}





  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Interview Dashboard</h1>
            <p className="text-slate-500 mt-2 font-medium">Manage your mock sessions and track performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mb-1">Interviews Completed</p>
                <p className="text-3xl font-black text-emerald-900">{dashboard.completed}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600"><CheckCircle2 size={24} strokeWidth={3} /></div>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-widest mb-1">Average AI Score</p>
                <p className="text-3xl font-black text-amber-900">{dashboard.average}%</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm text-amber-600"><Trophy size={24} strokeWidth={3} /></div>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest mb-1">Practice Hours</p>
                <p className="text-3xl font-black text-blue-900">{dashboard.hours}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-600"><Clock size={24} strokeWidth={3} /></div>
            </div>
          </div>

        {upcoming && (

<div className="mb-12 p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">

<div className="flex items-center gap-6">

<div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">

<Calendar size={28}/>

</div>

<div>

<h3 className="text-2xl font-black">

{upcoming.role} Interview

</h3>

<p className="text-blue-400 font-bold">

{new Date(

upcoming.time

).toLocaleString()}

</p>

</div>

</div>

<div className="flex gap-4">

<button

onClick={handleScheduledInterview}

disabled={!canStartInterview()}

className={`

px-6

py-3

rounded-xl

font-black

${

canStartInterview()

?

"bg-green-600"

:

"bg-gray-500 cursor-not-allowed"

}

`}

>

▶ Start Interview

</button>

<button

onClick={handleCancel}

className="px-6 py-3 bg-red-600 rounded-xl font-black"

>

🗑 Cancel

</button>

</div>

</div>

)}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div onClick={() => setShowMockModal(true)} className="group cursor-pointer bg-blue-600 p-10 rounded-[3.5rem] shadow-2xl shadow-blue-100 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[350px]">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-8"><Play size={32} fill="white" /></div>
              <div>
                <h2 className="text-3xl font-black text-white leading-tight">Launch AI <br/> Mock Interview</h2>
                <p className="text-blue-100 mt-4 text-base">Practice now with real-time feedback.</p>
                <button className="mt-8 bg-white text-blue-600 px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 transition-all">Start Session <ChevronRight size={18} /></button>
              </div>
            </div>

            <div onClick={() => { setShowCalendar(true); setDateError(""); }} className="group cursor-pointer bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[350px]">
              <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-slate-100"><Calendar size={32} /></div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">Schedule <br/> Future Prep</h2>
                <p className="text-slate-500 mt-4 text-base">Book a convenient slot for later.</p>
                <button className="mt-8 border-2 border-slate-200 text-slate-900 px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 transition-all">Open Calendar <ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 1. Start Interview Modal (Role Options) */}
      {showMockModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMockModal(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-3xl font-black text-slate-900 mb-2">Configure Mock Test</h3>
            <p className="text-slate-500 mb-8">Select your role to generate AI questions.</p>
            <div className="space-y-6">
              <label className="block">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Select Job Role</span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="mt-2 w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                >
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Data Scientist</option>
                  <option>HR Manager</option>
                  <option value="Other">Other (Type below)</option>
                </select>
              </label>
              {selectedRole === "Other" && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type your role</span>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Architect"
                    className="mt-2 w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                </div>
              )}

              <button
                onClick={handleStartInterview}
                disabled={isGenerating}
                className="w-full bg-blue-600 disabled:bg-slate-300 text-white py-5 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all mt-4"
              >
                {isGenerating ? "Generating Questions..." : "Start AI Evaluation"}
              </button>
            </div>
            <button onClick={() => setShowMockModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X /></button>
          </div>
        </div>
      )}

      {/* 2. Calendar Modal (Date Validation) */}
      {showCalendar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCalendar(false)}></div>
          <form onSubmit={handleConfirmSchedule} className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600"><Calendar size={40} /></div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Schedule Session</h3>
            {dateError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold mb-4 flex items-center gap-2 justify-center">
                <AlertCircle size={14} /> {dateError}
              </div>
            )}
            <input required type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="w-full p-4 bg-slate-50 border rounded-2xl mb-8 font-bold outline-none focus:ring-2 focus:ring-blue-600" />
            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black hover:bg-slate-800 transition-colors shadow-lg">Confirm Time</button>
            <button type="button" onClick={() => setShowCalendar(false)} className="mt-4 text-slate-400 font-bold text-sm">Close</button>
          </form>
        </div>
      )}
    </div>
  );
}

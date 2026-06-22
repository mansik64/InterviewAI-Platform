"use client";

import React, { useEffect, useState } from "react";

import {

Calendar,

FileText,


} from "lucide-react";

import Navbar from "@/components/Navbar";

export default function ProfilePage(){

const [user,setUser]=useState<any>(null)

const [history,setHistory]=useState<any[]>([])

const [resumes,setResumes]=useState<any[]>([])



const fetchHistory=async(userId:string)=>{

try{

const res=await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/interview/history?userId=${userId}`

)

const data=await res.json()

setHistory(data)

}

catch(err){

console.log(err)

}

}



const fetchResumeHistory=async(userId:string)=>{

try{

const res=await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/resume/history?userId=${userId}`

)

const data=await res.json()

setResumes(data)

}

catch(err){

console.log(err)

}

}



const deleteResume=async(id:string)=>{

try{

await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/resume/${id}`,

{

method:"DELETE"

}

)

setResumes(

resumes.filter(

(item)=>item.id!==id

)

)

}

catch(err){

console.log(err)

}

}



const deleteInterview=async(id:string)=>{

try{

await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/interview/${id}`,

{

method:"DELETE"

}

)

setHistory(

history.filter(

(item)=>item.id!==id

)

)

}

catch(err){

console.log(err)

}

}



useEffect(()=>{

const savedUser=

localStorage.getItem(

"user"

)

if(savedUser){

const u=

JSON.parse(

savedUser

)

setUser(u)

fetchHistory(u.id)

fetchResumeHistory(u.id)

}

},[])



const interviewsCompleted = history.length

const resumesAnalyzed = resumes.length

const bestScore =

history.length

?

Math.max(

...history.map(

item=>item.overall_score || 0

)

)

:0

const latestATS =

resumes.length

?

resumes[0].resume_score ||

resumes[0].ats_score ||

0

:0

if(!user){

return(

<div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">

<Navbar/>

<div className="flex-grow flex items-center justify-center">

<div>

<h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">

Profile Locked

</h2>

<p className="text-slate-500 dark:text-slate-300 mb-6">

Please login first

</p>

<a

href="/login"

className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black"

>

Go To Login

</a>

</div>

</div>

</div>

)

}



return(

<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">

<Navbar/>

<main className="flex-grow pt-32 pb-20 px-6">

<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">



{/* LEFT */}

<div className="lg:col-span-4 space-y-8">

<div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700 text-center">

<div className="w-24 h-24 bg-blue-600 rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black">

{user.name?.[0]}

</div>

<h2 className="text-2xl font-black text-slate-900 dark:text-white">

{user.name}

</h2>

<p className="text-slate-500 dark:text-slate-300 text-sm font-bold uppercase tracking-widest mt-1">

Candidate

</p>
<div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 space-y-5">

<div className="flex justify-between items-center">

<p className="text-slate-400 text-sm">

📧 Email

</p>

<p className="font-bold text-sm">

{user.email}

</p>

</div>



<div className="flex justify-between items-center">

<p className="text-slate-400 text-sm">

🚀 Status

</p>

<p className="font-bold text-sm text-green-600">

Active User

</p>

</div>

</div>

</div>


<button

onClick={()=>{

localStorage.removeItem("user")

window.location.href="/"

}}

className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-black"

>

Logout

</button>




<div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 p-8 rounded-[3rem] shadow-sm">

<h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">

🎯 AI Journey

</h3>

<div className="space-y-5">

<div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl">

<div>

<p className="text-slate-500 text-sm">

Interviews

</p>

<p className="font-black">

🎤 Mock Interviews

</p>

</div>

<span className="text-3xl font-black text-blue-600">

{interviewsCompleted}

</span>

</div>



<div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl">

<div>

<p className="text-slate-500 text-sm">

Resumes

</p>

<p className="font-black">

📄 Resume Analysis

</p>

</div>

<span className="text-3xl font-black text-green-600">

{resumesAnalyzed}

</span>

</div>



<div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl">

<div>

<p className="text-slate-500 text-sm">

Best Score

</p>

<p className="font-black">

🏆 Highest Score

</p>

</div>

<span className="text-3xl font-black text-orange-500">

{bestScore}%

</span>

</div>



<div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl">

<div>

<p className="text-slate-500 text-sm">

Latest ATS

</p>

<p className="font-black">

⭐ Resume ATS

</p>

</div>

<span className="text-3xl font-black text-purple-600">

{latestATS}%

</span>

</div>

</div>

</div>

</div>


{/* RIGHT */}

<div className="lg:col-span-8 space-y-8">



{/* INTERVIEWS */}

<div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-700">

<h3 className="text-2xl font-black mb-8 flex items-center gap-3">

<Calendar className="text-blue-600"/>

Session History

</h3>



<div className="space-y-4">

{

history.length===0 ?

(

<div className="p-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center">

No interviews found

</div>

)

:

history.map((item)=>(

<div

key={item.id}

className="border rounded-3xl p-6 flex justify-between items-center"

>

<div>

<h4 className="font-black text-xl">

{item.role}

</h4>

<p>

Overall Score :

{item.overall_score}%

</p>

<p>

Practice :

{item.practice_minutes} mins

</p>

<p>

Date :

{new Date(

item.created_at

).toLocaleDateString()}

</p>

</div>



<div className="flex gap-3">

{item.pdf_url && (

<a
href={item.pdf_url}
target="_blank"
rel="noreferrer"
className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold"
>

📄 View

</a>

)}

<button

onClick={()=>deleteInterview(item.id)}

className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold"

>

🗑 Delete

</button>

</div>

</div>

))

}

</div>

</div>



{/* RESUME */}

<div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-700">

<h3 className="text-2xl font-black mb-8 flex items-center gap-3">

<FileText className="text-blue-600"/>

Resume Analysis

</h3>



<a

href="/resume"

className="inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl font-black mb-6"

>

+ Upload Resume

</a>



<div className="space-y-4">

{

resumes.length===0 ?

(

<div className="p-10 border-2 border-dashed border-slate-100 dark:border-slate-700 rounded-[2.5rem] text-center">

No resume uploaded

</div>

)

:

resumes.map((item)=>(

<div

key={item.id}

className="border border-slate-200 dark:border-slate-700 rounded-3xl p-6 flex justify-between items-center"

>

<div>

<h4 className="font-black text-xl">

{item.file_url}

</h4>

<p>

ATS Score :

{item.ats_score}%

</p>

</div>



<div className="flex gap-3">

{item.pdf_url && (

<a

href={item.pdf_url}

target="_blank"

className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold"

>

📄 View

</a>

)}

<button

onClick={()=>deleteResume(item.id)}

className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold"

>

🗑 Delete

</button>

</div>

</div>

))

}

</div>

</div>

</div>

</div>

</main>

</div>

)

}
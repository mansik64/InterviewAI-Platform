"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2, CheckCircle2, Search, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ResumeAnalysisPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "done">("idle");
  const [analysis,setAnalysis]=useState<any>(null)
  const [pdfUrl,setPdfUrl]=useState("")
  const startAnalysis = async () => {

if(!file){

return

}

const user=

JSON.parse(

localStorage.getItem(

"user"

)

||

"{}"

)



try{

setStatus("uploading")

const formData = new FormData()

formData.append(

"resume",

file

)

formData.append(

"userId",

user.id

)





setStatus("analyzing")

const response = await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/resume/upload`,

{

method:"POST",

body:formData

}

)

const data = await response.json()


console.log(data)

localStorage.setItem(

"latestResume",

JSON.stringify(data)

)

setAnalysis({

...data.analysis,

pdfUrl:data.pdfUrl

})


setStatus("done")


}

catch(err){

console.log(err)

alert(

"Resume upload failed"

)

setStatus("idle")

}

}

  

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-8 hover:text-slate-900 transition-colors">
            <ArrowLeft size={18}/> Back to Dashboard
          </button>

          <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100">
            <h1 className="text-4xl font-black text-slate-900 mb-2">AI Resume Analysis</h1>
            <p className="text-slate-500 font-medium mb-12">Upload your PDF resume to receive instant AI scoring and content improvement suggestions.</p>

            {status === "idle" && (
              <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-20 text-center flex flex-col items-center group hover:border-blue-200 transition-colors">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload size={32} strokeWidth={3} />
                </div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" id="resume-upload" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <p className="text-xl font-black text-slate-900">{file ? file.name : "Click to select resume"}</p>
                  <p className="text-slate-400 font-bold mt-2">Only PDF files are supported</p>
                </label>
                {file && (
                  <button 
                    onClick={startAnalysis}
                    className="mt-10 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                  >
                    Start Analysis
                  </button>
                )}
              </div>
            )}

            {(status === "uploading" || status === "analyzing") && (
              <div className="text-center py-20 flex flex-col items-center animate-in fade-in duration-500">
                <div className="relative w-24 h-24 mb-8">
                  <Loader2 className="text-blue-600 animate-spin absolute inset-0" size={96} strokeWidth={1} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {status === "uploading" ? <Upload size={32} className="text-blue-200"/> : <Search size={32} className="text-blue-200"/>}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {status === "uploading" ? "Uploading to Secure Vault..." : "AI is Analyzing your Content..."}
                </h3>
                <p className="text-slate-400 font-bold mt-2">This usually takes a few seconds.</p>
              </div>
            )}

            {status === "done" && (

<div className="text-center py-20 flex flex-col items-center">

<div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8">

<CheckCircle2

size={48}

strokeWidth={3}

/>

</div>

<h3

className="text-3xl font-black text-slate-900"

>

Analysis Complete

</h3>

<p

className="text-slate-500 mt-4"

>

ATS Score

</p>

<p

className="text-7xl font-black text-blue-600"

>

{analysis?.atsScore}%

</p>

<div

className="flex gap-4 mt-10"

>

<a

href={analysis?.pdfUrl}

target="_blank"

rel="noopener noreferrer"

className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black"

>

📄 View Report

</a>

<button

onClick={()=>router.push("/admin")}

className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black"

>

Go To Dashboard

</button>

</div>

</div>

)}
          </div>
        </div>
      </main>
    </div>
  );
}
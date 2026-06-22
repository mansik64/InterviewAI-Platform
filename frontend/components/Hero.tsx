"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

 const handleAction=(target:string)=>{

try{

const user=

JSON.parse(

localStorage.getItem("user")

||

"{}"

)

if(!user.id){

router.push("/login")

return

}

router.push(target)

}

catch{

localStorage.removeItem("user")

router.push("/login")

}

}

  return (
    <section className="w-full pt-24 pb-10 bg-white dark:bg-slate-950 flex flex-col items-center transition-colors duration-300">
      <div className="max-w-5xl w-full px-6 flex flex-col items-center text-center">
        <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full mb-4 border border-blue-100 text-[10px] font-black uppercase tracking-widest">
          AI-Powered Preparation
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tighter mb-3">
          Prepare <span className="text-blue-600">Smart.</span> <br />
          Interview <span className="text-blue-600">Better.</span>
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-slate-500 dark:text-slate-300 mb-6 leading-relaxed">
          Master your next interview with real-time AI simulations, deep resume 
          insights, and personalized coaching designed to get you hired.
        </p>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100 dark:border-slate-700 mb-8">
            {[['10k+', 'Interviews'], ['98%', 'Success Rate'], ['50+', 'Job Roles'], ['24/7', 'AI Support']].map(([val, label]) => (
              <div key={label}>
                  <h5 className="text-2xl font-black text-slate-900 dark:text-white">{val}</h5>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
              </div>
            ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* LOGIC ADDED HERE */}
          <button onClick={() => handleAction("/interview")} className="px-10 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm">
            START FREE INTERVIEW
          </button>
          <button onClick={() => handleAction("/resume")} className="px-10 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-400 transition-all text-sm">
            ANALYZE RESUME
          </button>
        </div>
      </div>
    </section>
  );
}
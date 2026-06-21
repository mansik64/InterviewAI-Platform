import { CheckCircle2, Star, Zap } from "lucide-react";

export default function About() {
  return (
    /* Changed pb-60 to pb-16 to reduce the gap below this section */
    <section className="w-full pt-32 pb-16 bg-white flex justify-center">
      <div className="max-w-7xl px-10 mx-auto flex flex-col md:flex-row items-center gap-20">
        
        {/* Left Side: Creative AI Dashboard Mockup */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3] bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner p-8 flex flex-col gap-4">
            
            {/* Floating UI Card 1: Score */}
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interview Score</p>
                    <p className="text-xl font-black text-slate-900">88/100</p>
                  </div>
               </div>
            </div>

            {/* Floating UI Card 2: AI Feedback */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-50 mt-4">
               <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]">AI</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Your confidence is high!</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Try to explain your technical architecture in more detail next time.</p>
                  </div>
               </div>
            </div>

            {/* Floating UI Card 3: Skills Meter */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-50 w-2/3 self-end">
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Clarity</span>
                    <span className="text-blue-600">90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-blue-600 rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-6">
            <Zap size={14} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">The Mission</span>
          </div>
          
          <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
            Build unshakeable <br />
            <span className="text-blue-600">Interview Confidence.</span>
          </h2>
          
          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg">
            We combined advanced Large Language Models with behavioral science to create the most realistic interview coach ever built. 
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-4 items-start group">
              <CheckCircle2 className="text-blue-600 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-slate-900 font-bold">Role-Specific Intelligence</p>
                <p className="text-slate-500 text-sm">Questions tailored for Frontend, Backend, Product, or HR roles.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start group">
              <CheckCircle2 className="text-blue-600 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-slate-900 font-bold">Instant Analysis</p>
                <p className="text-slate-500 text-sm">Receive detailed feedback on your pacing, tone, and answer accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
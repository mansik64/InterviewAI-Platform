import { Mic, FileText, BrainCircuit, BarChart3 } from "lucide-react";

const items = [
  { title: "AI Mock Interviews", icon: <BrainCircuit className="w-8 h-8 text-blue-600"/> },
  { title: "Resume Analysis", icon: <FileText className="w-8 h-8 text-blue-600"/> },
  { title: "Voice Evaluation", icon: <Mic className="w-8 h-8 text-blue-600"/> },
  { title: "Performance Reports", icon: <BarChart3 className="w-8 h-8 text-blue-600"/> },
];

export default function Features() {
  return (
    /* py-20 provides a consistent, professional gap (approx 80px) */
    <section className="w-full py-20 bg-slate-50 flex flex-col items-center border-t border-slate-100">
      <div className="max-w-7xl w-full px-10 mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Powerful Features</h2>
          <p className="text-slate-500 text-lg">Everything you need to land your dream job.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full place-items-center">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-10 bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 w-full min-h-[350px] justify-center">
              <div className="mb-8 p-5 bg-blue-50 rounded-2xl text-blue-600">
                {item.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-2">
                Practice technical and HR interviews with AI-generated questions and realistic simulations.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
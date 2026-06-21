export default function Footer() {
  return (
    <footer className="w-full py-12 bg-white border-t border-slate-100 mt-16 flex flex-col items-center">
      <div className="max-w-7xl w-full px-10 mx-auto flex flex-col items-center text-center">
        <h2 className="text-xl font-black text-slate-900 tracking-tighter">INTERVIEW<span className="text-blue-600">AI</span></h2>
        <p className="text-slate-400 text-xs font-medium mt-2">© 2026 • Built by Mansi Shukla</p>
        
        <div className="flex gap-10 mt-8 pt-6 border-t border-slate-100 w-full justify-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
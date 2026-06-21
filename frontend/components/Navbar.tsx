import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
          INTERVIEW<span className="text-blue-600">AI</span>
        </h1>
        <div className="flex items-center gap-10">
          <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600">Home</Link>
          <Link href="/interview" className="text-sm font-bold text-slate-600 hover:text-blue-600">Interview</Link>
          <Link href="/admin" className="text-sm font-bold text-slate-600 hover:text-blue-600">My Profile</Link>
          <Link href="/login" className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-full shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            LOGIN
          </Link>
        </div>
      </nav>
    </header>
  );
}
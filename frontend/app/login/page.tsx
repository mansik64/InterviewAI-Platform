"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleAction = async (

e:React.FormEvent

)=>{

e.preventDefault()

try{

const endpoint=

isSignup

?

"register"

:

"login"



const response=

await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${endpoint}`,

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

name:

formData.name,

email:

formData.email,

password:

formData.password

})

}

)



const data=

await response.json()



if(!response.ok){

alert(

data.message ||

"Authentication failed"

)

return

}



if(isSignup){

alert(

"Registration successful. Please login."

)

setIsSignup(false)

return

}





const loggedUser={

...data.user,

isLoggedIn:true

}

localStorage.setItem(

"user",

JSON.stringify(loggedUser)

)

console.log(

"SAVED USER",

loggedUser

)

router.push(

"/interview"
)
}

catch(err){

console.log(err)

alert(

"Server error"

)

}

}

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-500">
          
          <div className="bg-slate-900 p-10 text-center text-white">
            <h2 className="text-3xl font-black tracking-tighter">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {isSignup ? "Join InterviewAI to start preparing" : "Login to manage your sessions"}
            </p>
          </div>

          <form onSubmit={handleAction} className="p-10 space-y-5">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  required type="text" placeholder="Full Name" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
              <input 
                required type="email" placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {isSignup && (
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  required type="tel" placeholder="Phone Number" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
              <input required type="password" placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold"
              onChange={(e)=>setFormData({...formData,password:e.target.value})}    />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
              {isSignup ? "Sign Up" : "Sign In"} <ArrowRight size={20} />
            </button>

            <p className="text-center text-sm font-bold text-slate-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button 
                type="button" onClick={() => setIsSignup(!isSignup)}
                className="ml-2 text-blue-600 hover:underline"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
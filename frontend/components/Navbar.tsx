"use client"

import { useEffect,useState } from "react"

import Link from "next/link"

import ThemeToggle from "./ThemeToggle"

export default function Navbar(){

  const [user,setUser]=useState<any>(null)

useEffect(()=>{

const savedUser=

JSON.parse(

localStorage.getItem(

"user"

)

||

"null"

)

setUser(savedUser)

},[])

return(

<header

className="fixed top-0 left-0 right-0 h-20 z-[100]
bg-white/90 dark:bg-slate-900/90
backdrop-blur-md
border-b border-slate-100 dark:border-slate-700"

>

<nav className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">

<Link

href="/"

className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white"

>

INTERVIEW

<span className="text-blue-600">

AI

</span>

</Link>

<div className="flex items-center gap-4 md:gap-8">

<Link

href="/"

className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600"

>

Home

</Link>

<Link

href="/interview"

className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600"

>

Interview

</Link>

<Link

href="/admin"

className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600"

>

My Profile

</Link>

<ThemeToggle/>

{

user?.id

?

<Link

href="/admin"

className="px-6 py-2.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-black rounded-full"

>

👤 {user.name}

</Link>

:

<Link

href="/login"

className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-full shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"

>

LOGIN

</Link>

}

</div>

</nav>

</header>

)

}
"use client"

import { Moon, Sun } from "lucide-react"

import { useEffect,useState } from "react"

export default function ThemeToggle(){

const [dark,setDark]=useState(false)

useEffect(()=>{

const saved=

localStorage.getItem("theme")

if(saved==="dark"){

document.documentElement.classList.add("dark")

setDark(true)

}

},[])

const toggleTheme=()=>{

const newTheme=!dark

setDark(newTheme)

if(newTheme){

document.documentElement.classList.add("dark")

localStorage.setItem(

"theme",

"dark"

)

}

else{

document.documentElement.classList.remove("dark")

localStorage.setItem(

"theme",

"light"

)

}

}

return(

<button

onClick={toggleTheme}

className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition"

>

{

dark

?

<Sun size={18}/>

:

<Moon size={18}/>

}

</button>

)

}
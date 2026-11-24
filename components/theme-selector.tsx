'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
const choices = [{key:'light',label:'روشن',icon:Sun},{key:'dark',label:'تاریک',icon:Moon},{key:'system',label:'سیستم',icon:Monitor}]
export function ThemeSelector({compact=false}:{compact?:boolean}) {
 const { theme, setTheme }=useTheme()
 const [mounted,setMounted]=useState(false)
 useEffect(()=>setMounted(true),[])
 return <div aria-label="انتخاب تم رابط کاربری" role="group" className={`inline-flex flex-wrap items-center gap-1 rounded-xl border border-border bg-muted p-1 ${compact?'':'w-fit'}`}>
  {choices.map(item=><button key={item.key} type="button" aria-pressed={mounted && theme===item.key} onClick={()=>setTheme(item.key)} title={item.label} className={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors ${mounted&&theme===item.key?'bg-card text-primary shadow-sm':'text-muted-foreground hover:text-foreground'}`}><item.icon size={16} aria-hidden="true"/>{!compact&&item.label}</button>)}
 </div>
}

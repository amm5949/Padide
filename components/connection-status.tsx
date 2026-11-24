'use client'
import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'
export function ConnectionStatus(){
 const [offline,setOffline]=useState(false)
 useEffect(()=>{
  const update=()=>setOffline(!navigator.onLine)
  update();window.addEventListener('online',update);window.addEventListener('offline',update)
  return()=>{window.removeEventListener('online',update);window.removeEventListener('offline',update)}
 },[])
 if(!offline)return null
 return <div role="status" className="flex items-center justify-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"><WifiOff size={16}/>به نظر می‌رسد اتصال اینترنت قطع است. داده‌های خصوصی به‌صورت آفلاین ذخیره نمی‌شوند.</div>
}

import type { ReactNode } from 'react'
export function PageHeader({title,description,actions,eyebrow}:{title:string;description?:string;actions?:ReactNode;eyebrow?:string}) {
 return <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-7 sm:flex-row sm:items-center">
  <div className="min-w-0">{eyebrow&&<p className="mb-1 text-xs font-bold text-primary">{eyebrow}</p>}<h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{title}</h1>{description&&<p className="mt-1 text-sm leading-7 text-muted-foreground">{description}</p>}</div>
  {actions&&<div className="flex w-full flex-wrap gap-2 sm:w-auto">{actions}</div>}
 </div>
}

import { Card, CardContent, CardHeader } from './ui/card'
import type { ReactNode } from 'react'
export function DetailSection({title,children,description}:{title:string;children:ReactNode;description?:string}) {
 return <Card><CardHeader><h2 className="text-base font-bold sm:text-lg">{title}</h2>{description&&<p className="text-xs text-muted-foreground">{description}</p>}</CardHeader><CardContent>{children}</CardContent></Card>
}
export function DetailGrid({items}:{items:{label:string;value:ReactNode}[]}) {
 return <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((x,i)=><div className="min-w-0 border-b border-border pb-3" key={`${x.label}-${i}`}><dt className="mb-1 text-xs text-muted-foreground">{x.label}</dt><dd className="break-words text-sm font-semibold text-foreground">{x.value || '—'}</dd></div>)}</dl>
}

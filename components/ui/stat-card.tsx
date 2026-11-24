import type { LucideIcon } from 'lucide-react'
import { Card } from './card'
export function StatCard({title,value,note,icon:Icon,kind='primary'}:{title:string;value:string;note:string;icon:LucideIcon;kind?:'primary'|'success'|'warning'|'purple'}) {
 const colors={primary:'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200',success:'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',warning:'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200',purple:'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-200'}
 return <Card className="p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><p className="text-xs font-medium text-muted-foreground sm:text-sm">{title}</p><div className={`grid size-10 shrink-0 place-items-center rounded-xl ${colors[kind]}`}><Icon size={19} aria-hidden="true"/></div></div><p className="mt-2 text-2xl font-extrabold tabular-nums sm:text-3xl">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></Card>
}

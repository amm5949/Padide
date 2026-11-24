import { CircleCheck, Clock3, CircleX, RotateCcw } from 'lucide-react'
import type { RequestStatus } from '@/lib/types'
import { statusLabels } from '@/lib/status'
const visuals = {
 pending:{icon:Clock3,style:'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'},
 approved:{icon:CircleCheck,style:'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'},
 rejected:{icon:CircleX,style:'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'},
 needs_changes:{icon:RotateCcw,style:'bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300'},
}
export function StatusBadge({status}:{status:RequestStatus}) {
 const config = visuals[status]
 return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${config.style}`}><config.icon size={13} aria-hidden="true"/>{statusLabels[status]}</span>
}

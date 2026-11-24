import { Inbox } from 'lucide-react'
export function EmptyState({title='موردی پیدا نشد',description='فیلترها را تغییر دهید یا دوباره تلاش کنید.'}:{title?:string;description?:string}) {
 return <div className="flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center"><div className="mb-3 grid size-13 place-items-center rounded-2xl bg-muted text-muted-foreground"><Inbox size={24}/></div><h3 className="font-bold">{title}</h3><p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p></div>
}

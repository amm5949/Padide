'use client'
import { useMemo, useState, type ReactNode } from 'react'
import { Search, ListFilter, ChevronRight, ChevronLeft, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import type { RequestStatus } from '@/lib/types'
import { statusLabels } from '@/lib/status'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { StatusBadge } from '@/components/ui/status-badge'
import { faNumber } from '@/lib/utils'
export interface TableColumn<T> {key:string;label:string;render:(row:T)=>ReactNode;mobile?:boolean}
interface DataTableProps<T extends {id:string;status:RequestStatus}> {
 rows:T[];columns:TableColumn<T>[];getSearch:(row:T)=>string;getHref:(row:T)=>string;
 title:string;description?:string;pageSize?:number;getDate?:(row:T)=>string
}
export function DataTable<T extends {id:string;status:RequestStatus}>({rows,columns,getSearch,getHref,title,description,pageSize=6,getDate}:DataTableProps<T>) {
 const [query,setQuery]=useState('');const [status,setStatus]=useState('all');const [newest,setNewest]=useState(true);const [page,setPage]=useState(1)
 const filtered=useMemo(()=>{
  const result=rows.filter(r=>getSearch(r).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())&&(status==='all'||r.status===status))
  if(getDate) result.sort((a,b)=>newest?getDate(b).localeCompare(getDate(a),'fa'):getDate(a).localeCompare(getDate(b),'fa'))
  return result
 },[rows,query,status,newest,getSearch,getDate])
 const pages=Math.max(1,Math.ceil(filtered.length/pageSize));const safePage=Math.min(page,pages);const visible=filtered.slice((safePage-1)*pageSize,safePage*pageSize)
 const updateQuery=(s:string)=>{setQuery(s);setPage(1)}
 const updateStatus=(s:string)=>{setStatus(s);setPage(1)}
 return <Card className="overflow-hidden"><div className="flex flex-col gap-4 border-b border-border p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
  <div><h2 className="text-base font-bold sm:text-lg">{title}</h2>{description&&<p className="mt-1 text-xs text-muted-foreground">{description}</p>}</div>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
   <label className="relative block sm:min-w-56"><Search size={16} className="pointer-events-none absolute inset-y-0 my-auto start-3 text-muted-foreground"/><span className="sr-only">جست‌وجو</span><input value={query} onChange={e=>updateQuery(e.target.value)} className="form-control ps-9" placeholder="جست‌وجو در درخواست‌ها..."/></label>
   <label className="relative"><ListFilter size={15} className="pointer-events-none absolute inset-y-0 my-auto start-3 text-muted-foreground"/><span className="sr-only">فیلتر وضعیت</span><select value={status} onChange={e=>updateStatus(e.target.value)} className="form-control min-w-40 ps-9"><option value="all">همه وضعیت‌ها</option>{Object.entries(statusLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
   <Button variant="outline" onClick={()=>setNewest(x=>!x)} title="تغییر ترتیب تاریخ"><ArrowUpDown size={16}/>{newest?'جدیدترین':'قدیمی‌ترین'}</Button>
  </div>
 </div>
 {visible.length===0?<EmptyState/>:<>
  <div className="hidden overflow-x-auto lg:block"><table className="w-full text-start text-sm"><thead className="bg-muted/70 text-xs text-muted-foreground"><tr>{columns.map(col=><th key={col.key} scope="col" className="whitespace-nowrap px-5 py-4 text-start font-semibold">{col.label}</th>)}<th scope="col" className="px-4 py-4 text-start">جزئیات</th></tr></thead><tbody>{visible.map(row=><tr key={row.id} className="border-t border-border transition-colors hover:bg-muted/50">{columns.map(col=><td key={col.key} className="px-5 py-4 align-middle">{col.render(row)}</td>)}<td className="px-4 py-3"><Button asChild variant="ghost" size="sm"><Link href={getHref(row)} aria-label={`مشاهده جزئیات ${row.id}`}><ChevronLeft size={17}/></Link></Button></td></tr>)}</tbody></table></div>
  <div className="divide-y divide-border lg:hidden">{visible.map(row=><Link href={getHref(row)} className="block p-4 transition-colors hover:bg-muted/50 sm:p-5" key={row.id}><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-semibold text-primary number-ltr">{row.id}</span><StatusBadge status={row.status}/></div><dl className="grid grid-cols-2 gap-x-3 gap-y-3">{columns.filter(c=>c.mobile!==false&&c.key!=='status').slice(0,6).map(col=><div className="min-w-0" key={col.key}><dt className="text-xs text-muted-foreground">{col.label}</dt><dd className="mt-0.5 break-words text-sm font-semibold">{col.render(row)}</dd></div>)}</dl><div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">مشاهده جزئیات <ChevronLeft size={15}/></div></Link>)}</div>
 </>}
 <div className="flex flex-col gap-3 border-t border-border px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6"><p>نمایش {faNumber(visible.length)} از {faNumber(filtered.length)} مورد</p><div className="flex items-center gap-2"><Button size="sm" variant="outline" disabled={safePage<=1} onClick={()=>setPage(safePage-1)}><ChevronRight size={15}/>قبلی</Button><span className="px-2">صفحه {faNumber(safePage)} از {faNumber(pages)}</span><Button size="sm" variant="outline" disabled={safePage>=pages} onClick={()=>setPage(safePage+1)}>بعدی<ChevronLeft size={15}/></Button></div></div>
 </Card>
}

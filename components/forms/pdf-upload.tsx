'use client'
import { useRef, useState, type DragEvent, type ChangeEvent } from 'react'
import { FileUp, FileText, X, CheckCircle2, AlertTriangle, ShieldCheck, CloudUpload } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { uploadStatement } from '@/lib/upload-client'
const MAX_MB=Number(process.env.NEXT_PUBLIC_MAX_PDF_MB||'10')
const MAX_BYTES=(Number.isFinite(MAX_MB)&&MAX_MB>0?MAX_MB:10)*1024*1024
const ENDPOINT=process.env.NEXT_PUBLIC_STATEMENT_UPLOAD_ENDPOINT||''
function fileSize(bytes:number){return (bytes/1024/1024).toLocaleString('fa-IR',{maximumFractionDigits:2})+' مگابایت'}
export function PdfUpload(){
 const input=useRef<HTMLInputElement>(null)
 const [file,setFile]=useState<File|null>(null);const [error,setError]=useState('');const [state,setState]=useState<'idle'|'uploading'|'success'|'error'>('idle');const [progress,setProgress]=useState(0);const [drag,setDrag]=useState(false)
 function pick(next:File|null){setError('');setState('idle');setProgress(0);if(!next){setFile(null);return}
  if(!/\.pdf$/i.test(next.name)||next.type!=='application/pdf'){setFile(null);setError('فقط فایل PDF با نوع MIME معتبر پذیرفته می‌شود.');return}
  if(next.size===0){setFile(null);setError('فایل انتخاب‌شده خالی است.');return}
  if(next.size>MAX_BYTES){setFile(null);setError(`حجم فایل باید حداکثر ${MAX_MB} مگابایت باشد.`);return}
  setFile(next)
 }
 function change(e:ChangeEvent<HTMLInputElement>){pick(e.target.files?.[0]||null);e.target.value=''}
 function drop(e:DragEvent<HTMLDivElement>){e.preventDefault();setDrag(false);pick(e.dataTransfer.files?.[0]||null)}
 async function submit(){if(!file||!ENDPOINT||state==='uploading')return;setState('uploading');setProgress(0);setError('');try{await uploadStatement(file,ENDPOINT,setProgress);setState('success')}catch(e){setState('error');setError(e instanceof Error?e.message:'ارسال انجام نشد.')}}
 return <><PageHeader eyebrow="درخواست‌های کاربر" title="بارگذاری پرینت حساب" description="پرینت حساب بانکی را در قالب PDF برای بررسی ارسال کنید."/>
 <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]"><Card><CardHeader><h2 className="text-lg font-bold">انتخاب فایل پرینت حساب</h2><p className="text-xs text-muted-foreground">فقط PDF · حداکثر {MAX_MB} مگابایت · یک فایل در هر بار</p></CardHeader><CardContent>
  <input id="pdf-file" className="sr-only" ref={input} type="file" accept="application/pdf,.pdf" onChange={change} aria-label="انتخاب فایل PDF"/>
  <div role="group" aria-label="ناحیه بارگذاری فایل" onDrop={drop} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={e=>{e.preventDefault();setDrag(false)}} className={`flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition-colors ${drag?'border-primary bg-secondary':'border-border bg-muted/40'}`}><span className="mb-4 grid size-16 place-items-center rounded-2xl bg-secondary text-primary"><CloudUpload size={29}/></span><h3 className="text-base font-bold">فایل PDF را اینجا رها کنید</h3><p className="mt-1 text-xs text-muted-foreground">یا از حافظه دستگاه انتخاب کنید</p><Button className="mt-5" variant="outline" type="button" onClick={()=>input.current?.click()}><FileUp size={17}/>انتخاب فایل از دستگاه</Button></div>
  {file&&<div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border p-4"><span className="grid size-11 place-items-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"><FileText size={22}/></span><div className="min-w-0 flex-1"><p className="break-all text-sm font-bold" dir="auto">{file.name}</p><p className="text-xs text-muted-foreground">{fileSize(file.size)} · PDF</p></div><Button type="button" variant="ghost" size="icon" onClick={()=>pick(null)} disabled={state==='uploading'} aria-label="حذف فایل انتخاب‌شده"><X size={18}/></Button></div>}
  {state==='uploading'&&<div className="mt-4" role="status"><div className="flex justify-between text-xs"><span>در حال ارسال واقعی به API</span><span>{progress}٪</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-primary" style={{width:`${progress}%`}}/></div></div>}
  {error&&<div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"><AlertTriangle size={17}/><p>{error}</p></div>}
  {state==='success'&&<div role="status" className="mt-4 flex gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"><CheckCircle2 size={20}/>سرویس ارسال، پاسخ موفق دریافت کرد. وضعیت نهایی بررسی سند باید از API استعلام شود.</div>}
  <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="max-w-sm text-xs leading-6 text-muted-foreground">{ENDPOINT?'ارسال به API تنظیم‌شده انجام خواهد شد.':'در نسخه نمایشی، API ارسال پیکربندی نشده است؛ فایل فقط روی همین دستگاه انتخاب و بررسی اولیه می‌شود.'}</p><Button onClick={()=>void submit()} disabled={!file||!ENDPOINT||state==='uploading'||state==='success'}><FileUp size={17}/>{state==='uploading'?'در حال ارسال...':'ارسال فایل به سرور'}</Button></div>
 </CardContent></Card>
 <div className="space-y-5"><Card><CardHeader><h2 className="text-base font-bold">نکات امنیتی</h2></CardHeader><CardContent><ul className="space-y-3 text-sm text-muted-foreground"><li className="flex gap-2"><ShieldCheck className="mt-1 shrink-0 text-success" size={18}/>اعتبارسنجی فرمت و حجم در مرورگر انجام می‌شود.</li><li className="flex gap-2"><ShieldCheck className="mt-1 shrink-0 text-success" size={18}/>بررسی محتوای PDF، اسکن و ذخیره امن باید سمت سرور انجام شود.</li><li className="flex gap-2"><ShieldCheck className="mt-1 shrink-0 text-success" size={18}/>فایل انتخاب‌شده در حافظه محلی مرورگر ذخیره دائمی نمی‌شود.</li></ul></CardContent></Card><Card><CardHeader><h2 className="text-base font-bold">وضعیت بررسی سند</h2></CardHeader><CardContent><p className="text-sm text-muted-foreground">پس از اتصال API، شناسه سند، تاریخ ارسال، وضعیت رسیدگی و یادداشت کارشناس در این بخش نمایش داده خواهد شد.</p><p className="mt-4 rounded-xl bg-muted p-3 text-xs">وضعیت فعلی: {state==='success'?'پاسخ موفق سرویس؛ وضعیت بررسی نامشخص':state==='uploading'?'در حال ارسال':'سندی به‌صورت واقعی ثبت نشده است'}</p></CardContent></Card></div></div>
 </>
}

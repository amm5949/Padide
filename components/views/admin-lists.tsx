'use client'
import Link from 'next/link'
import { FileCheck2, WalletCards, Files } from 'lucide-react'
import { DataTable, type TableColumn } from '@/components/data-table'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { credits, checks, statements } from '@/lib/mock-data'
import { money } from '@/lib/utils'
import type { CreditRequest, CheckRequest, BankStatement } from '@/lib/types'
const amount=(v:number)=><span className="whitespace-nowrap text-xs font-semibold">{money(v)}</span>
const creditCols:TableColumn<CreditRequest>[]=[
 {key:'customer',label:'مشتری',render:r=><div><strong className="text-sm">{r.customerName}</strong><span className="block text-xs text-muted-foreground number-ltr">{r.customerCode}</span></div>},
 {key:'branch',label:'شعبه',render:r=>r.branchCode},
 {key:'creditLimit',label:'سقف اعتبار',render:r=>amount(r.creditLimit)},
 {key:'totalPurchase',label:'کل خرید',render:r=>amount(r.totalPurchase),mobile:false},
 {key:'lastPurchase',label:'خرید ۳ ماه گذشته',render:r=>amount(r.lastThreeMonthsPurchase),mobile:false},
 {key:'requested',label:'مبلغ درخواستی',render:r=>amount(r.requestedAmount)},
 {key:'status',label:'وضعیت',render:r=><StatusBadge status={r.status}/>},
]
const checkCols:TableColumn<CheckRequest>[]=[
 {key:'identifier',label:'شناسه',render:r=><span className="number-ltr inline-block">{r.identifier}</span>},
 {key:'group',label:'گروه مشتری',render:r=><span className="font-semibold">{r.customerGroup}</span>},
 {key:'invoiceDate',label:'تاریخ فاکتور',render:r=>r.invoiceDate},
 {key:'invoiceAmount',label:'مبلغ فاکتور',render:r=>amount(r.invoiceAmount)},
 {key:'checkNumber',label:'شماره چک',render:r=><span className="number-ltr inline-block">{r.checkNumber}</span>},
 {key:'status',label:'وضعیت',render:r=><StatusBadge status={r.status}/>},
]
const statementCols:TableColumn<BankStatement>[]=[
 {key:'name',label:'سند',render:r=><div><strong>{r.title}</strong><span className="block text-xs text-muted-foreground" dir="ltr">{r.fileName}</span></div>},
 {key:'account',label:'شماره حساب',render:r=>r.accountHint},
 {key:'uploaded',label:'تاریخ ارسال',render:r=>r.uploadedAt},
 {key:'fileSize',label:'حجم',render:r=>(r.fileSize/1024/1024).toFixed(1)+' MB'},
 {key:'status',label:'وضعیت',render:r=><StatusBadge status={r.status}/>},
]
export function AdminCreditList(){return <><PageHeader eyebrow="کارتابل مدیریت" title="درخواست‌های اعتبار" description="جست‌وجو، فیلتر و بررسی پرونده‌های اعتبار در یک صفحه مستقل" actions={<Button asChild variant="outline"><Link href="/admin">بازگشت به داشبورد</Link></Button>}/><DataTable rows={credits} columns={creditCols} getSearch={r=>`${r.customerName} ${r.customerCode} ${r.branchCode} ${r.id}`} getHref={r=>`/admin/credit/${r.id}`} getDate={r=>r.createdAt} title="فهرست درخواست‌های اعتبار" description={`${credits.length} پرونده نمونه · نمایش جزئیات و تصمیم در صفحه مستقل`}/></>}
export function AdminCheckList(){return <><PageHeader eyebrow="کارتابل مدیریت" title="مدیریت چک‌ها" description="بررسی درخواست‌های تأیید چک و جزئیات فاکتور و وصول"/><DataTable rows={checks} columns={checkCols} getSearch={r=>`${r.identifier} ${r.customerGroup} ${r.checkNumber} ${r.sellerName} ${r.id}`} getHref={r=>`/admin/checks/${r.id}`} getDate={r=>r.createdAt} title="فهرست درخواست‌های تأیید چک" description={`${checks.length} چک نمونه · عملیات محاسبه موجود در نسخه قدیم تا تعیین قواعد غیرفعال است`}/></>}
export function AdminStatementList(){return <><PageHeader eyebrow="کارتابل مدیریت" title="اسناد پرینت حساب" description="مشاهده وضعیت پرونده‌های بانکی و پیگیری بررسی اسناد PDF"/><DataTable rows={statements} columns={statementCols} getSearch={r=>`${r.title} ${r.fileName} ${r.accountHint} ${r.id}`} getHref={r=>`/admin/statements/${r.id}`} getDate={r=>r.uploadedAt} title="فهرست اسناد دریافت‌شده" description="این رکوردها ساختگی هستند؛ فایل PDF واقعی همراه آن‌ها وجود ندارد."/></>}

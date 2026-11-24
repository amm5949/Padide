'use client'
import { PageHeader } from '@/components/page-header'
import { DataTable, type TableColumn } from '@/components/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { allRequests, type AnyRequest } from '@/lib/mock-data'
import { kindLabels } from '@/lib/status'
import { money } from '@/lib/utils'
const myRequests=allRequests.filter(x=>x.ownerId==='demo-user')
const cols:TableColumn<AnyRequest>[]=[
 {key:'type',label:'نوع درخواست',render:r=>kindLabels[r.kind]},
 {key:'title',label:'شرح درخواست',render:r=><span className="font-semibold">{r.title}</span>},
 {key:'amount',label:'مبلغ',render:r=>r.amount==null?'—':money(r.amount)},
 {key:'date',label:'تاریخ',render:r=>r.date},
 {key:'status',label:'وضعیت',render:r=><StatusBadge status={r.status}/>},
]
export function UserRequests(){return <><PageHeader eyebrow="درخواست‌های کاربر" title="پیگیری درخواست‌های من" description="سوابق، وضعیت رسیدگی و جزئیات پرونده‌های متعلق به حساب نمایشی شما"/><DataTable rows={myRequests} columns={cols} getSearch={r=>`${r.title} ${r.id} ${kindLabels[r.kind]}`} getHref={r=>`/user/requests/${r.id}`} getDate={r=>r.date} title="سوابق درخواست‌ها" description="تنها داده‌های مرتبط با demo-user در این صفحه نمایش داده می‌شوند."/></>}

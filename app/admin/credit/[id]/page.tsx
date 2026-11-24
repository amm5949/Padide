import { notFound } from 'next/navigation'
import { credits } from '@/lib/mock-data'
import { CreditDetails } from '@/components/views/admin-details'
export const metadata={title:'جزئیات درخواست اعتبار'}
export default async function AdminCreditDetailsPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const record=credits.find(x=>x.id===id)
 if(!record)notFound()
 return <CreditDetails record={record}/>
}

import { notFound } from 'next/navigation'
import { statements } from '@/lib/mock-data'
import { StatementDetails } from '@/components/views/admin-details'
export const metadata={title:'جزئیات پرینت حساب'}
export default async function AdminStatementDetailsPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const record=statements.find(x=>x.id===id)
 if(!record)notFound()
 return <StatementDetails record={record}/>
}

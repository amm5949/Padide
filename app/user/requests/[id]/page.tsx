import { notFound } from 'next/navigation'
import { credits, checks, statements, getOwnedRequest } from '@/lib/mock-data'
import { CreditDetails, CheckDetails, StatementDetails } from '@/components/views/admin-details'
export const metadata={title:'جزئیات درخواست'}
export default async function UserRequestDetailsPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params
 const owned=getOwnedRequest(id,'demo-user');if(!owned)notFound()
 if(owned.kind==='credit'){const record=credits.find(x=>x.id===id);if(!record)notFound();return <CreditDetails record={record} readonly/>}
 if(owned.kind==='check'){const record=checks.find(x=>x.id===id);if(!record)notFound();return <CheckDetails record={record} readonly/>}
 const record=statements.find(x=>x.id===id);if(!record)notFound();return <StatementDetails record={record} readonly/>
}

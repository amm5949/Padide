import { notFound } from 'next/navigation'
import { checks } from '@/lib/mock-data'
import { CheckDetails } from '@/components/views/admin-details'
export const metadata={title:'جزئیات چک'}
export default async function AdminCheckDetailsPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const record=checks.find(x=>x.id===id)
 if(!record)notFound()
 return <CheckDetails record={record}/>
}

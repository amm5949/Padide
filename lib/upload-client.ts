export interface UploadResult { id?: string; message?: string }
/** Only call when a same-origin upload API is configured. No demo upload is simulated. */
export function uploadStatement(file:File,endpoint:string,onProgress:(percent:number)=>void):Promise<UploadResult> {
 if(!endpoint.startsWith('/')||endpoint.startsWith('//'))return Promise.reject(new Error('نشانی سرویس باید نسبی و هم‌مبدأ باشد.'))
 return new Promise((resolve,reject)=>{
  const xhr=new XMLHttpRequest()
  xhr.open('POST',endpoint,true)
  xhr.withCredentials=true
  xhr.responseType='json'
  xhr.upload.onprogress=e=>{if(e.lengthComputable)onProgress(Math.round(e.loaded/e.total*100))}
  xhr.onerror=()=>reject(new Error('ارتباط شبکه برقرار نشد.'))
  xhr.onabort=()=>reject(new Error('ارسال لغو شد.'))
  xhr.onload=()=>{if(xhr.status>=200&&xhr.status<300)resolve(xhr.response as UploadResult||{});else reject(new Error((xhr.response as UploadResult)?.message||`خطای سرویس: ${xhr.status}`))}
  const data=new FormData();data.append('file',file,file.name);xhr.send(data)
 })
}

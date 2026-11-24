'use client'
import { Controller, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'
import type { FormField } from '@/lib/types'
import { formatMoneyInput, normalizeMoney, normalizeDigits } from '@/lib/utils'
export function FormFieldControl<T extends FieldValues>({definition,form}:{definition:FormField<Path<T>>;form:UseFormReturn<T>}) {
 const { key, label, kind, required, hint }=definition
 const error=form.getFieldState(key,form.formState).error?.message
 return <div className={`min-w-0 ${kind==='textarea'?'md:col-span-2':''}`}>
  <label htmlFor={`field-${key}`} className="mb-1.5 block text-xs font-bold text-foreground">{label}{required&&<span className="ms-1 text-danger" aria-label="الزامی">*</span>}</label>
  <Controller name={key} control={form.control} render={({field})=> {
   const raw=String(field.value??'')
   const common={id:`field-${key}`,name:field.name,onBlur:field.onBlur,ref:field.ref,'aria-invalid':!!error,'aria-describedby':error?`error-${key}`:hint?`hint-${key}`:undefined} as const
   if(kind==='textarea')return <textarea {...common} rows={3} value={raw} onChange={e=>field.onChange(e.target.value)} placeholder={`توضیح مربوط به ${label}`} className="form-control resize-y"/>
   if(kind==='select'&&definition.options)return <select {...common} value={raw} onChange={e=>field.onChange(e.target.value)} className="form-control"><option value="">انتخاب کنید</option>{definition.options.map(x=><option key={x} value={x}>{x}</option>)}</select>
   const isNumeric=kind==='money'||kind==='number'||kind==='percent'
   return <div className="relative"><input {...common} type={kind==='date'?'date':'text'} lang="fa-IR" dir={isNumeric||kind==='date'?'ltr':'rtl'} inputMode={isNumeric?'decimal':undefined} value={kind==='money'?formatMoneyInput(raw):raw} onChange={e=>field.onChange(kind==='money'?normalizeMoney(e.target.value):isNumeric?normalizeDigits(e.target.value):e.target.value)} placeholder={definition.placeholder||`ورود ${label}`} className={`form-control ${isNumeric?(kind==='percent'?'pe-12 text-start number-ltr':'text-start number-ltr'):''}`} />{kind==='percent'&&<span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-[11px] text-muted-foreground">{'٪'}</span>}</div>
  }}/>
  {error?<p id={`error-${key}`} role="alert" className="mt-1.5 text-xs font-medium text-danger">{error}</p>:hint?<p id={`hint-${key}`} className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>:null}
 </div>
}

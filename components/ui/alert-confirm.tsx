'use client'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from './button'
import type { ReactNode } from 'react'
export function ConfirmDialog({trigger,title,description,onConfirm,confirmLabel='تأیید تصمیم'}:{trigger:ReactNode;title:string;description:string;onConfirm:()=>void;confirmLabel?:string}) {
 return <AlertDialog.Root>
  <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
  <AlertDialog.Portal>
   <AlertDialog.Overlay className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-[2px]"/>
   <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl" dir="rtl">
    <AlertDialog.Title className="text-lg font-bold text-foreground">{title}</AlertDialog.Title>
    <AlertDialog.Description className="mt-2 text-sm leading-7 text-muted-foreground">{description}</AlertDialog.Description>
    <div className="mt-6 flex flex-wrap justify-end gap-2"><AlertDialog.Cancel asChild><Button variant="outline">انصراف</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button onClick={onConfirm}>{confirmLabel}</Button></AlertDialog.Action></div>
   </AlertDialog.Content>
  </AlertDialog.Portal>
 </AlertDialog.Root>
}

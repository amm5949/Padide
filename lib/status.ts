import type { RequestStatus, RequestKind } from './types'
export const statusLabels:Record<RequestStatus,string> = {pending:'در انتظار بررسی',approved:'تأیید شده',rejected:'رد شده',needs_changes:'نیازمند اصلاح'}
export const kindLabels:Record<RequestKind,string> = {credit:'درخواست اعتبار',check:'تأیید چک',statement:'پرینت حساب'}

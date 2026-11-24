import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
export function faNumber(value: number | string) { return new Intl.NumberFormat('fa-IR').format(Number(value) || 0) }
export function money(value: number | null | undefined) { return value == null ? '—' : new Intl.NumberFormat('fa-IR').format(value) }
export function normalizeDigits(value: string) {
  return value.replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632))
}
export function normalizeMoney(value: string) { return normalizeDigits(value).replace(/[^\d]/g, '') }
export function formatMoneyInput(value: string) {
  const v = normalizeMoney(value)
  return v ? v.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
}

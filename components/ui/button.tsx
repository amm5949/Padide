import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const buttonVariants = cva('inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring', {
  variants: { variant: {
    default: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-80',
    outline: 'border border-border bg-card text-foreground hover:bg-muted',
    ghost: 'text-foreground hover:bg-muted',
    destructive: 'bg-danger text-white hover:opacity-90',
  }, size: { default:'h-11 px-4',sm:'h-10 px-3',lg:'h-12 px-6',icon:'h-11 w-11 p-0' } },
  defaultVariants: {variant:'default',size:'default'}
})
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants> {asChild?:boolean}
export function Button({ className, variant, size, asChild=false, ...props}:ButtonProps) {
 const Comp = asChild ? Slot : 'button'
 return <Comp data-slot="button" className={cn(buttonVariants({variant,size}),className)} {...props}/>
}

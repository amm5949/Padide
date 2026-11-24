export type Role = 'user' | 'admin'
export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'needs_changes'
export type RequestKind = 'credit' | 'check' | 'statement'
export type Permission = 'dashboard:read:own' | 'profile:write:own' | 'credit:create' | 'check:create' | 'statement:create' | 'requests:read:own' | 'credit:read:all' | 'credit:review' | 'check:read:all' | 'check:review' | 'statement:read:all' | 'statement:review'
export interface CreditRequest {
  id: string; customerCode: string; customerName: string; branchCode: string;
  creditLimit: number; totalPurchase: number; lastThreeMonthsPurchase: number;
  requestedAmount: number; status: RequestStatus; createdAt: string; ownerId: string;
  realName?: string; phone?: string; sellerName?: string;
  detail: Partial<Record<CreditFieldKey, string>>
}
export interface CheckRequest {
  id: string; identifier: string; customerGroup: string; invoiceDate: string;
  invoiceAmount: number; checkNumber: string; checkAmount: number; checkDueDate: string;
  checkRas: number; status: RequestStatus; sellerName: string;
  checkStatus: string; sourceStatus?: string; productGroup: string; ownerId: string; createdAt: string
}
export interface BankStatement {
  id: string; title: string; fileName: string; fileSize: number; accountHint: string;
  uploadedAt: string; status: RequestStatus; ownerId: string; note: string
}
export type CreditFieldKey =
  'customerCode' | 'customerName' | 'branchCode' | 'creditLimit' | 'totalPurchase' | 'lastThreeMonthsPurchase' |
  'phone' | 'realName' | 'customerGroup' | 'ownershipStatus' | 'sellerName' | 'registrationDate' | 'returnAmount' | 'netSales' |
  'firstInvoiceDate' | 'openInvoiceCount' | 'overdueAmount' | 'bouncedCheckCount' | 'bouncedCheckAmount' | 'outstandingCheckAmount' |
  'totalDebt' | 'averageDailySales' | 'collectionPeriod' | 'openInvoiceAmount' | 'newRequestAmount' | 'saleTerms' |
  'creditRequestCount' | 'averageMonthlyPurchase' | 'extraCredit' | 'requestedCredit' | 'commissionDiscount' | 'volumeDiscount' |
  'extraDiscount' | 'totalDiscount' | 'cartonCount' | 'requestedPlan' | 'financeOpinion' | 'description'
export type CheckFieldKey = 'identifier' | 'customerGroup' | 'invoiceDate' | 'invoiceAmount' | 'checkNumber' | 'checkAmount' | 'checkDueDate' | 'checkRas' | 'status' | 'sellerName' | 'checkStatus' | 'productGroup'
export type FieldKind = 'text' | 'money' | 'number' | 'date' | 'percent' | 'textarea' | 'select'
export interface FormField<K extends string> { key: K; label: string; kind: FieldKind; required?: boolean; placeholder?: string; options?: string[]; hint?: string }

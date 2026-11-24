// DEMO ONLY: static, synthetic records. Never treat as API data or persist real financial data here.
import type { CreditRequest, CheckRequest, BankStatement, RequestStatus, RequestKind } from './types'
export const credits: CreditRequest[] = [
  { id:'CR-1009',customerCode:'CUST-1001',customerName:'شرکت بازرگانی البرز',branchCode:'BR-001',creditLimit:250000000,totalPurchase:800000000,lastThreeMonthsPurchase:280000000,requestedAmount:160000000,status:'pending',createdAt:'۱۴۰۵/۰۸/۲۷',ownerId:'demo-user',phone:'۰۲۱-۸۸۰۰۱۲۳۴',sellerName:'علی رضایی',detail:{realName:'بازرگانی البرز',customerGroup:'مشتریان زنجیره‌ای',ownershipStatus:'مالک',netSales:'770000000',openInvoiceCount:'4',overdueAmount:'15000000',totalDebt:'95000000',averageMonthlyPurchase:'93000000',requestedCredit:'160000000',description:'بررسی افزایش سقف اعتبار'} },
  { id:'CR-1008',customerCode:'CUST-1002',customerName:'فروشگاه زنجیره‌ای رفاه',branchCode:'BR-002',creditLimit:150000000,totalPurchase:420000000,lastThreeMonthsPurchase:175000000,requestedAmount:95000000,status:'approved',createdAt:'۱۴۰۵/۰۸/۲۵',ownerId:'demo-user',detail:{requestedCredit:'95000000',extraCredit:'25000000'} },
  { id:'CR-1007',customerCode:'CUST-1003',customerName:'صنایع غذایی سحر',branchCode:'BR-001',creditLimit:500000000,totalPurchase:1100000000,lastThreeMonthsPurchase:380000000,requestedAmount:300000000,status:'needs_changes',createdAt:'۱۴۰۵/۰۸/۲۳',ownerId:'demo-user',detail:{requestedCredit:'300000000',financeOpinion:'نیاز به تکمیل مدارک'} },
  { id:'CR-1006',customerCode:'6565',customerName:'فروشگاه سپید',branchCode:'BR-003',creditLimit:90000000,totalPurchase:165000000,lastThreeMonthsPurchase:58000000,requestedAmount:60000000,status:'rejected',createdAt:'۱۴۰۵/۰۸/۲۰',ownerId:'other-user',detail:{} },
  { id:'CR-1005',customerCode:'123546',customerName:'حسین‌زاده',branchCode:'شیراز',creditLimit:0,totalPurchase:5213265,lastThreeMonthsPurchase:1254654,requestedAmount:10000000,status:'pending',createdAt:'۱۴۰۵/۰۸/۱۹',ownerId:'other-user',detail:{} },
  { id:'CR-1004',customerCode:'8980',customerName:'قلی‌پور',branchCode:'شیراز',creditLimit:0,totalPurchase:2342342,lastThreeMonthsPurchase:234234234,requestedAmount:20000000,status:'pending',createdAt:'۱۴۰۵/۰۸/۱۸',ownerId:'other-user',detail:{phone:'23213125',realName:'اروند',sellerName:'حسین پور'} },
  { id:'CR-1003',customerCode:'55465',customerName:'فروشگاه نگین',branchCode:'BR-003',creditLimit:0,totalPurchase:0,lastThreeMonthsPurchase:0,requestedAmount:75000000,status:'approved',createdAt:'۱۴۰۵/۰۸/۱۷',ownerId:'other-user',detail:{} },
  { id:'CR-1002',customerCode:'UDF',customerName:'فروشگاه مهر',branchCode:'33',creditLimit:0,totalPurchase:0,lastThreeMonthsPurchase:0,requestedAmount:30000000,status:'needs_changes',createdAt:'۱۴۰۵/۰۸/۱۶',ownerId:'other-user',detail:{} },
  { id:'CR-1001',customerCode:'1200',customerName:'فروشگاه بهار',branchCode:'BR-002',creditLimit:0,totalPurchase:0,lastThreeMonthsPurchase:0,requestedAmount:25000000,status:'approved',createdAt:'۱۴۰۵/۰۸/۱۵',ownerId:'other-user',detail:{} },
]
export const checks: CheckRequest[] = [
  {id:'CH-1005',identifier:'1',customerGroup:'مشتریان قراردادی',invoiceDate:'۱۴۰۵/۰۸/۲۷',invoiceAmount:488233728,checkNumber:'783671',checkAmount:488233728,checkDueDate:'۱۴۰۵/۱۰/۲۰',checkRas:74,status:'pending',sellerName:'رضا محمدنیا',checkStatus:'سفید',productGroup:'دستمال',ownerId:'demo-user',createdAt:'۱۴۰۵/۰۸/۲۷'},
  {id:'CH-1004',identifier:'2',customerGroup:'مشتریان قراردادی',invoiceDate:'۱۴۰۵/۰۸/۲۴',invoiceAmount:11888801680,checkNumber:'783671',checkAmount:40845000000,checkDueDate:'۱۴۰۵/۱۰/۱۶',checkRas:74,status:'approved',sellerName:'رضا محمدنیا',checkStatus:'سفید',productGroup:'دستمال',ownerId:'demo-user',createdAt:'۱۴۰۵/۰۸/۲۴'},
  {id:'CH-1003',identifier:'3',customerGroup:'مشتریان قراردادی',invoiceDate:'۱۴۰۵/۰۸/۲۳',invoiceAmount:29316899885,checkNumber:'783671',checkAmount:29316899885,checkDueDate:'۱۴۰۵/۱۰/۱۷',checkRas:62,status:'needs_changes',sellerName:'محمد حسینی',checkStatus:'در انتظار',productGroup:'مواد غذایی',ownerId:'demo-user',createdAt:'۱۴۰۵/۰۸/۲۳'},
  {id:'CH-1002',identifier:'33',customerGroup:'33',invoiceDate:'۱۴۰۵/۰۸/۱۸',invoiceAmount:423423,checkNumber:'23423523',checkAmount:423423,checkDueDate:'۱۴۰۵/۰۹/۲۲',checkRas:22,status:'rejected',sellerName:'کارشناس فروش',checkStatus:'برگشتی',productGroup:'بهداشتی',ownerId:'other-user',createdAt:'۱۴۰۵/۰۸/۱۸'},
  {id:'CH-1001',identifier:'546456',customerGroup:'فروشگاه سپید',invoiceDate:'۱۴۰۵/۰۸/۱۵',invoiceAmount:0,checkNumber:'—',checkAmount:0,checkDueDate:'',checkRas:0,status:'pending',sellerName:'—',checkStatus:'نامشخص',productGroup:'—',ownerId:'other-user',createdAt:'۱۴۰۵/۰۸/۱۵'},
]
export const statements: BankStatement[] = [
  {id:'ST-1003',title:'صورت‌حساب بانکی آبان',fileName:'statement-aban.pdf',fileSize:1720000,accountHint:'**** ۴۲۶۱',uploadedAt:'۱۴۰۵/۰۸/۲۷',status:'pending',ownerId:'demo-user',note:'در انتظار بررسی سند'},
  {id:'ST-1002',title:'صورت‌حساب بانکی مهر',fileName:'statement-mehr.pdf',fileSize:960000,accountHint:'**** ۴۲۶۱',uploadedAt:'۱۴۰۵/۰۷/۳۰',status:'approved',ownerId:'demo-user',note:'بررسی نمایشی تکمیل شده'},
  {id:'ST-1001',title:'صورت‌حساب شعبه جنوب',fileName:'bank-report.pdf',fileSize:2400000,accountHint:'**** ۷۸۰۰',uploadedAt:'۱۴۰۵/۰۸/۱۸',status:'needs_changes',ownerId:'other-user',note:'کیفیت نسخه اسکن شده نیاز به بررسی دارد'},
]
export type AnyRequest = { id:string; kind:RequestKind; title:string; date:string; status:RequestStatus; amount?:number; ownerId:string }
export const allRequests: AnyRequest[] = [
  ...credits.map(x => ({id:x.id,kind:'credit' as const,title:'درخواست اعتبار — '+x.customerName,date:x.createdAt,status:x.status,amount:x.requestedAmount,ownerId:x.ownerId})),
  ...checks.map(x => ({id:x.id,kind:'check' as const,title:'تأیید چک — '+x.checkNumber,date:x.createdAt,status:x.status,amount:x.checkAmount,ownerId:x.ownerId})),
  ...statements.map(x => ({id:x.id,kind:'statement' as const,title:x.title,date:x.uploadedAt,status:x.status,ownerId:x.ownerId})),
]
export function getOwnedRequest(id:string,ownerId:string) {return allRequests.find(x=>x.id===id && x.ownerId===ownerId)}

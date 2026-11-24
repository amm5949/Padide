import type { CreditFieldKey, CheckFieldKey, FormField } from './types'
export const creditSteps: { title:string; description:string; fields: FormField<CreditFieldKey>[] }[] = [
  { title:'مشتری و شعبه', description:'مشخصات شناسایی، اطلاعات تماس و سوابق پایه مشتری', fields:[
    {key:'customerCode',label:'کد مشتری',kind:'text',required:true},
    {key:'customerName',label:'نام مشتری',kind:'text',required:true},
    {key:'branchCode',label:'کد شعبه',kind:'text',required:true},
    {key:'phone',label:'تلفن',kind:'text'},
    {key:'realName',label:'نام واقعی',kind:'text'},
    {key:'customerGroup',label:'گروه مشتری',kind:'text'},
    {key:'ownershipStatus',label:'وضعیت مالکیت',kind:'text'},
    {key:'sellerName',label:'نام فروشنده',kind:'text'},
    {key:'registrationDate',label:'تاریخ ثبت',kind:'date'},
    {key:'firstInvoiceDate',label:'تاریخ اولین فاکتور',kind:'date'},
  ]},
  { title:'فروش و بدهی', description:'مبالغ خرید، بازپرداخت، چک‌ها و وضعیت مطالبات', fields:[
    {key:'totalPurchase',label:'کل خرید',kind:'money'},
    {key:'lastThreeMonthsPurchase',label:'خرید ۳ ماه گذشته',kind:'money'},
    {key:'returnAmount',label:'مبلغ مرجوعی',kind:'money'},
    {key:'netSales',label:'فروش خالص',kind:'money'},
    {key:'openInvoiceCount',label:'تعداد فاکتورهای باز',kind:'number'},
    {key:'overdueAmount',label:'مبلغ معوقات',kind:'money'},
    {key:'bouncedCheckCount',label:'تعداد چک برگشتی',kind:'number'},
    {key:'bouncedCheckAmount',label:'مبلغ چک برگشتی',kind:'money'},
    {key:'outstandingCheckAmount',label:'مبلغ چک‌های در جریان',kind:'money'},
    {key:'totalDebt',label:'کل بدهی',kind:'money'},
    {key:'averageDailySales',label:'میانگین فروش روزانه',kind:'money'},
    {key:'openInvoiceAmount',label:'مبلغ فاکتورهای باز',kind:'money'},
    {key:'averageMonthlyPurchase',label:'میانگین خرید ماهانه',kind:'money'},
  ]},
  { title:'شاخص‌های اعتبار', description:'سقف اعتبار، دوره وصول و مبالغ مربوط به درخواست', fields:[
    {key:'creditLimit',label:'سقف اعتبار',kind:'money'},
    {key:'collectionPeriod',label:'دوره وصول',kind:'number',hint:'واحد دوره وصول باید با کارفرما تعیین شود.'},
    {key:'newRequestAmount',label:'مبلغ درخواست جدید',kind:'money'},
    {key:'creditRequestCount',label:'تعداد درخواست اعتبار',kind:'number'},
    {key:'extraCredit',label:'اعتبار مازاد',kind:'money'},
    {key:'requestedCredit',label:'مبلغ اعتبار درخواستی',kind:'money'},
  ]},
  { title:'شرایط و توضیحات', description:'طرح فروش، تخفیف‌ها و توضیحات تکمیلی', fields:[
    {key:'saleTerms',label:'شرایط فروش',kind:'text'},
    {key:'commissionDiscount',label:'درصد تخفیف کمیسیون',kind:'percent'},
    {key:'volumeDiscount',label:'تخفیف حجمی',kind:'percent'},
    {key:'extraDiscount',label:'درصد تخفیف مازاد',kind:'percent'},
    {key:'totalDiscount',label:'درصد کل تخفیفات',kind:'percent',hint:'حد مجاز درصد هنوز مشخص نیست؛ اعتبارسنجی دامنه اعمال نشده است.'},
    {key:'cartonCount',label:'تعداد کارتن',kind:'number'},
    {key:'requestedPlan',label:'طرح درخواستی',kind:'text'},
    {key:'financeOpinion',label:'نظر مالی',kind:'textarea',hint:'در نسخه عملیاتی تعیین شود این فیلد متعلق به درخواست‌کننده است یا کارشناس مالی.'},
    {key:'description',label:'توضیحات',kind:'textarea'},
  ]},
]
export const creditFields = creditSteps.flatMap(step => step.fields)
export const checkSections: { title:string; description:string; fields: FormField<CheckFieldKey>[] }[] = [
  { title:'اطلاعات پایه و فاکتور', description:'اطلاعات شناسایی و ارتباط چک با فاکتور', fields:[
    {key:'identifier',label:'شناسه',kind:'text',required:true},
    {key:'customerGroup',label:'گروه مشتری',kind:'text',required:true},
    {key:'invoiceDate',label:'تاریخ فاکتور',kind:'date'},
    {key:'invoiceAmount',label:'مبلغ فاکتور',kind:'money'},
    {key:'checkNumber',label:'شماره چک',kind:'text',required:true},
  ]},
  { title:'اطلاعات تکمیلی چک', description:'مشخصات وصول، فروشنده و وضعیت چک', fields:[
    {key:'checkAmount',label:'مبلغ چک',kind:'money'},
    {key:'checkDueDate',label:'تاریخ سررسید چک',kind:'date'},
    {key:'checkRas',label:'راس چک',kind:'number',hint:'تعریف و واحد «راس چک» نیازمند تأیید کارفرماست.'},
    {key:'status',label:'وضعیت',kind:'text'},
    {key:'sellerName',label:'نام فروشنده',kind:'text'},
    {key:'checkStatus',label:'وضعیت چک',kind:'text'},
    {key:'productGroup',label:'گروه محصول',kind:'text'},
  ]},
]
export const checkFields = checkSections.flatMap(section => section.fields)

import { test, expect } from '@playwright/test'
async function login(page:import('@playwright/test').Page,role:'user'|'admin') {
 await page.goto('/login')
 await page.getByRole('radio',{name:role==='admin'?/مدیر/:/کاربر/}).check()
 await page.getByRole('button',{name:/ورود به محیط نمایشی/}).click()
 await expect(page).toHaveURL(role==='admin'?/\/admin$/:/\/user$/)
}
test('role-based demo navigation and settings',async({page})=>{
 await login(page,'user')
 await page.goto('/user/settings')
 await expect(page.getByRole('heading',{name:'تنظیمات'})).toBeVisible()
 await page.goto('/admin/credit')
 await expect(page).toHaveURL(/\/user$/)
})
test('credit wizard validates required customer identifiers',async({page})=>{
 await login(page,'user')
 await page.goto('/user/credit/new')
 await page.getByRole('button',{name:/مرحله بعد/}).click()
 await expect(page.getByText('کد مشتری را وارد کنید.')).toBeVisible()
 await page.getByLabel(/کد مشتری/).fill('CUST-22')
 await page.getByLabel(/نام مشتری/).fill('فروشگاه آزمایشی')
 await page.getByLabel(/کد شعبه/).fill('BR-1')
 await page.getByRole('button',{name:/مرحله بعد/}).click()
 await expect(page.getByRole('heading',{name:'فروش و بدهی'})).toBeVisible()
})
test('admin details have simulation-only decisions',async({page})=>{
 await login(page,'admin')
 await page.goto('/admin/credit/CR-1009')
 await expect(page.getByText('بررسی و تصمیم مدیریتی')).toBeVisible()
 await page.getByRole('button',{name:'تأیید درخواست'}).click()
 await expect(page.getByRole('alertdialog')).toBeVisible()
 await page.getByRole('button',{name:'اجرای شبیه‌سازی'}).click()
 await expect(page.getByText(/تغییر نمایشی بدون ذخیره در سرور/)).toBeVisible()
})
test('pdf rejects non-pdf files',async({page})=>{
 await login(page,'user')
 await page.goto('/user/statements/new')
 await page.locator('input[type=file]').setInputFiles({name:'bad.txt',mimeType:'text/plain',buffer:Buffer.from('test')})
 await expect(page.getByRole('alert')).toContainText('فقط فایل PDF')
})
for(const width of [360,390,768,1024,1440]){
 test(`user interface fits ${width}px without document overflow`,async({page})=>{
  await page.setViewportSize({width,height:800})
  await login(page,'user')
  for(const route of ['/user','/user/credit/new','/user/checks/new','/user/statements/new','/user/requests']){
   await page.goto(route)
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),route).toBeTruthy()
  }
 })
}

import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'سیستم مدیریت مجوزها | شرکت پخش پدیده پایدار', short_name: 'پدیده پایدار',
    description: 'مدیریت اعتبارات، چک‌ها و اسناد مالی', start_url: '/login', scope: '/',
    display: 'standalone', orientation: 'any', background_color: '#f5f7fb', theme_color: '#3548b9', lang: 'fa', dir: 'rtl',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

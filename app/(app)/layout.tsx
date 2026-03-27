import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <Topbar />
        <div className="mt-6">{children}</div>
      </div>
    </main>
  )
}

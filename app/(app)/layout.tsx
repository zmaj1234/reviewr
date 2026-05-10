import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/layout/sidebar'
import { ToastProvider } from '@/components/ui/toast'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg">
        <Sidebar userEmail={user.email ?? ''} />
        <main className="ml-[220px] min-h-screen">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ToastProvider } from '@/components/ui/toast'

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) redirect('/login')
    return <ToastProvider>{children}</ToastProvider>
  } catch {
    redirect('/login')
  }
}

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Settings, HelpCircle, LogOut, Users, TrendingUp } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/toast'

interface SidebarProps {
  userEmail: string
  plan: 'solo' | 'growth'
  isManager: boolean
  ownerName?: string
}

export function Sidebar({ userEmail, plan, isManager }: SidebarProps) {
  const pathname = usePathname()
  const router   = useRouter()
  const { toast } = useToast()

  const initials = userEmail.slice(0, 2).toUpperCase()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast('Signed out', 'success')
    router.push('/login')
    router.refresh()
  }

  const nav = [
    { href: '/dashboard',           label: 'Dashboard',  icon: LayoutDashboard, show: true },
    { href: '/dashboard/analytics', label: 'Analytics',  icon: TrendingUp,      show: plan === 'growth' && !isManager },
    { href: '/dashboard/team',      label: 'Team',       icon: Users,           show: plan === 'growth' && !isManager },
    { href: '/settings',            label: 'Settings',   icon: Settings,        show: !isManager },
  ].filter(n => n.show)

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-black/[0.07] flex flex-col z-40">

      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <LogoMark size={30} />
          <span className="font-serif text-[1.1rem] font-semibold text-[#1c1c1e] tracking-tight">
            Reviewr
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-[#16a34a]/10 text-[#16a34a]'
                  : 'text-[#6c6c70] hover:text-[#1c1c1e] hover:bg-black/[0.04]'
              }`}
            >
              <Icon size={16} strokeWidth={active ? 2 : 1.75} />
              {label}
            </Link>
          )
        })}

        <a
          href="mailto:reviewr.info@gmail.com"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6c6c70] hover:text-[#1c1c1e] hover:bg-black/[0.04] transition-all duration-150"
        >
          <HelpCircle size={16} strokeWidth={1.75} />
          Help
        </a>
      </nav>

      {/* Plan chip */}
      <div className="px-4 pb-3">
        {isManager ? (
          <div className="text-center text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-violet-50 text-violet-500">
            Manager access
          </div>
        ) : (
          <Link
            href={plan === 'growth' ? '/settings' : '/api/stripe/checkout?plan=growth'}
            className={`block text-center text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors ${
              plan === 'growth'
                ? 'bg-[#16a34a]/10 text-[#16a34a]'
                : 'bg-black/[0.04] text-[#aeaeb2] hover:text-[#6c6c70]'
            }`}
          >
            {plan === 'growth' ? 'Growth plan' : 'Solo · Upgrade ↗'}
          </Link>
        )}
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-black/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#16a34a]/15 flex items-center justify-center shrink-0">
            <span className="text-[#16a34a] text-xs font-bold">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[0.8125rem] font-medium text-[#1c1c1e] truncate leading-tight">
              {userEmail.split('@')[0]}
            </p>
            <p className="text-[11px] text-[#aeaeb2] truncate leading-tight mt-0.5">
              {userEmail}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6c6c70] hover:text-[#ff3b30] hover:bg-[#ff3b30]/5 transition-all duration-150 w-full"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}

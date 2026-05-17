'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Settings, HelpCircle, LogOut, Users } from 'lucide-react'
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
  const router = useRouter()
  const { toast } = useToast()

  const initials = userEmail.slice(0, 2).toUpperCase()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast('Signed out successfully', 'success')
    router.push('/login')
    router.refresh()
  }

  const nav = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, show: true },
    { href: '/dashboard/team', label: 'Team', icon: Users, show: plan === 'growth' && !isManager },
    { href: '/settings', label: 'Settings', icon: Settings, show: !isManager },
  ].filter(n => n.show)

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-surface border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3 group transition-all duration-200 hover:-translate-y-px hover:brightness-105">
          <LogoMark size={32} noShadow />
          <span className="font-serif text-lg text-primary">Reviewr</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium
                transition-all duration-150
                ${active
                  ? 'bg-accent/10 text-accent'
                  : 'text-secondary hover:text-primary hover:bg-card'
                }
              `}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}

        <a
          href="mailto:support@reviewr.app"
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-secondary hover:text-primary hover:bg-card transition-all duration-150"
        >
          <HelpCircle size={16} />
          Help
        </a>
      </nav>

      {/* Plan badge */}
      <div className="px-3 pb-2">
        {isManager ? (
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-secondary border border-border bg-surface text-center">
            Manager access
          </div>
        ) : (
          <Link
            href={plan === 'growth' ? '/settings' : 'mailto:hello@reviewr.app?subject=Upgrade to Growth'}
            className={`block px-3 py-1.5 rounded-lg text-xs font-semibold text-center transition-colors ${
              plan === 'growth'
                ? 'bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20 hover:bg-[#16a34a]/15'
                : 'bg-surface text-muted border border-border hover:text-secondary'
            }`}
          >
            {plan === 'growth' ? 'Growth plan' : 'Solo plan — Upgrade'}
          </Link>
        )}
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] mb-1">
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
            <span className="text-accent text-xs font-semibold">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-primary truncate max-w-[130px]">{userEmail.split('@')[0]}</p>
            <p className="text-[10px] text-muted truncate max-w-[130px]">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-secondary hover:text-danger hover:bg-danger/5 transition-all duration-150 w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Settings, HelpCircle, LogOut, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/toast'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  userEmail: string
}

export function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast('Signed out successfully', 'success')
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-surface border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Star size={14} fill="black" className="text-black" />
          </div>
          <span className="font-serif text-lg text-primary">Reviewr</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium text-secondary hover:text-primary hover:bg-card transition-all duration-150"
        >
          <HelpCircle size={16} />
          Help
        </a>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        <div className="px-3 py-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-1">
            <span className="text-accent text-xs font-semibold">
              {userEmail.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-secondary truncate max-w-[160px]">{userEmail}</p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium text-secondary hover:text-danger hover:bg-danger/5 transition-all duration-150 w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}

import Link from 'next/link'
import { BarChart3, BriefcaseBusiness, Building2, CalendarRange, CircleDollarSign, LayoutDashboard, LockKeyhole, PiggyBank, Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Lançamentos', icon: CircleDollarSign },
  { href: '#', label: 'Reservas', icon: PiggyBank },
  { href: '#', label: 'DRE', icon: BarChart3 },
  { href: '#', label: 'Sócios', icon: BriefcaseBusiness },
  { href: '#', label: 'Fechamento', icon: CalendarRange },
  { href: '#', label: 'Empresa', icon: Building2 },
  { href: '#', label: 'Configurações', icon: Settings2 }
]

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/5 bg-[#0c0f16]/80 px-5 py-6 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient shadow-soft">
          <LockKeyhole className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-display text-xl tracking-wide">Financeiro</p>
          <p className="text-sm text-muted-foreground">Soluv.IA</p>
        </div>
      </div>

      <nav className="space-y-1.5">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white',
                index === 0 ? 'bg-white/5 text-white' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-panel-gradient p-4">
        <p className="text-sm font-medium">Governança mensal</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Fechamento, reservas e distribuição precisam ficar visíveis desde o primeiro marco.
        </p>
      </div>
    </aside>
  )
}

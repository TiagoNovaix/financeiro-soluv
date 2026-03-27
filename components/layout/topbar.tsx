import { Bell, Search, Sparkles } from 'lucide-react'

export function Topbar() {
  return (
    <header className="flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Financeiro executivo</p>
        <h1 className="mt-2 font-display text-3xl">Visão gerencial do mês</h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          Buscar módulo, cliente ou lançamento
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition hover:text-white">
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">TN</div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                Tiago Novaes
                <Sparkles className="h-3.5 w-3.5 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground">admin • março/2026</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

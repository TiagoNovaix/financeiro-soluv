import { HighlightsPanel } from '@/components/dashboard/highlights-panel'
import { OverviewCards } from '@/components/dashboard/overview-cards'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <OverviewCards />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <RevenueChart />
        <HighlightsPanel />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Caixinhas / reservas</CardTitle>
            <CardDescription>Bloco visual para o core do produto entrar cedo no shell.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="font-medium text-foreground">Reserva de impostos</p>
              <p className="mt-1">10% sobre receita recebida • saldo projetado R$ 18.400</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="font-medium text-foreground">Reinvestimento</p>
              <p className="mt-1">8% sobre receita operacional • saldo projetado R$ 12.900</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos vencimentos</CardTitle>
            <CardDescription>Placeholder para fluxo de caixa e contas 7/30 dias.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div>
                <p className="font-medium text-foreground">Folha / pró-labore</p>
                <p className="text-xs">vence em 3 dias</p>
              </div>
              <span className="font-mono text-danger">R$ 14.500</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div>
                <p className="font-medium text-foreground">Tributos provisionados</p>
                <p className="text-xs">vence em 8 dias</p>
              </div>
              <span className="font-mono text-warning">R$ 22.100</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status do mês</CardTitle>
            <CardDescription>Fechamento mensal é tratado como recurso de governança, não detalhe operacional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Aberto</p>
              <p className="mt-2 font-medium text-foreground">Março/2026 ainda em revisão</p>
              <p className="mt-2">Pendências: regra de reabertura, permissões por perfil e snapshot oficial da DRE.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

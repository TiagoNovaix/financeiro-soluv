import { ArrowDownRight, ArrowUpRight, PiggyBank, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const cards = [
  {
    title: 'Receita líquida',
    value: 'R$ 184.320',
    delta: '+12,4% vs mês anterior',
    icon: ArrowUpRight,
    tone: 'text-positive'
  },
  {
    title: 'Despesas totais',
    value: 'R$ 91.870',
    delta: '+4,1% em relação ao previsto',
    icon: ArrowDownRight,
    tone: 'text-danger'
  },
  {
    title: 'Reservas provisionadas',
    value: 'R$ 42.500',
    delta: 'Impostos + reinvestimento + emergência',
    icon: PiggyBank,
    tone: 'text-warning'
  },
  {
    title: 'Disponível p/ distribuição',
    value: 'R$ 28.940',
    delta: 'Após caixa mínimo e pró-labore',
    icon: Wallet,
    tone: 'text-primary'
  }
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Card key={card.title} className="border-white/6 bg-white/[0.03]">
            <CardHeader className="pb-3">
              <CardDescription>{card.title}</CardDescription>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="font-mono text-2xl tracking-tight">{card.value}</CardTitle>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                  <Icon className={`h-4 w-4 ${card.tone}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.delta}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

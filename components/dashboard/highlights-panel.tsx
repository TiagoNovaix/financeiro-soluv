import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const items = [
  {
    title: 'Disponível operacional seguro',
    description: 'Após provisionar impostos, emergência e reinvestimento, o caixa livre permanece saudável.',
    icon: CheckCircle2,
    tone: 'text-positive'
  },
  {
    title: 'Distribuição de sócios pendente',
    description: 'Definir regra de trava por reserva mínima antes da primeira automação real.',
    icon: ShieldCheck,
    tone: 'text-warning'
  },
  {
    title: 'Fechamento mensal ainda aberto',
    description: 'Precisamos da decisão final sobre workflow de reabertura e permissões por perfil.',
    icon: AlertTriangle,
    tone: 'text-danger'
  }
]

export function HighlightsPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Radar executivo</CardTitle>
        <CardDescription>Mensagem visual já puxando o posicionamento do produto: governança, reservas e decisão.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white/5 p-2">
                  <Icon className={`h-4 w-4 ${item.tone}`} />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

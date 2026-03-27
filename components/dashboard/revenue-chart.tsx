'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { month: 'Jan', receita: 98000, lucro: 34000 },
  { month: 'Fev', receita: 121000, lucro: 41200 },
  { month: 'Mar', receita: 112500, lucro: 37500 },
  { month: 'Abr', receita: 144800, lucro: 52100 },
  { month: 'Mai', receita: 162900, lucro: 61800 },
  { month: 'Jun', receita: 184320, lucro: 72450 }
]

export function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Receita x lucro operacional</CardTitle>
        <CardDescription>Placeholder visual do dashboard executivo com linguagem já alinhada ao PRD.</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="receita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e20055" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#e20055" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lucro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9e11cd" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#9e11cd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94a3b8" />
            <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" tickFormatter={(v) => `R$ ${v / 1000}k`} />
            <Tooltip
              contentStyle={{
                background: '#141720',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                color: '#E8EAF0'
              }}
            />
            <Area type="monotone" dataKey="receita" stroke="#e20055" strokeWidth={2.4} fill="url(#receita)" />
            <Area type="monotone" dataKey="lucro" stroke="#9e11cd" strokeWidth={2.4} fill="url(#lucro)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

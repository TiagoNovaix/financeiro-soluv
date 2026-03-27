'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    if (!supabase) {
      setMessage('Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para ativar o login real.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? error.message : 'Login realizado com sucesso. Integração base de auth pronta para evoluir.')
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-white/6 bg-panel-gradient p-8 shadow-glow lg:p-12">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Financeiro Soluv.IA</p>
            <h1 className="mt-5 font-display text-5xl leading-tight text-white">
              Clareza financeira para decidir sem depender de planilhas paralelas.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Primeiro marco visual focado em credibilidade executiva: dark mode, linguagem de governança e espaço para dashboard, DRE, reservas e fechamento mensal.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              'Dashboard executivo com visão mensal',
              'Reservas automáticas como conceito central',
              'Auth base com Supabase pronta para conectar'
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </section>

        <Card className="self-center">
          <CardHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient">
              <LockKeyhole className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-2xl">Entrar na operação</CardTitle>
            <CardDescription>Acesso por email e senha via Supabase Auth.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Email</label>
                <Input type="email" placeholder="voce@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Senha</label>
                <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full" size="lg" type="submit" disabled={loading}>
                {loading ? 'Conectando...' : 'Acessar plataforma'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-positive" />
              {message || 'Login visual pronto. Quando as envs forem definidas, o fluxo básico de autenticação já encaixa sem refazer a tela.'}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

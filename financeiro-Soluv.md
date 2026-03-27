# Control Tower — PRD v1.0

## Nome do App
**Control Tower Financeira**

---

## Objetivo
Sistema de gestão financeira executiva para empresas com sociedade, projetado para apurar lucro real, governar retiradas de sócios, controlar reservas automatizadas e fechar mês com clareza gerencial — não apenas registrar entradas e saídas.

---

## Público
Sócios e CEOs de pequenas e médias empresas (2–10 pessoas) que precisam de controle financeiro real sem depender de contador para tomar decisões do dia a dia. Perfil: gestor que já perdeu dinheiro por falta de visibilidade financeira.

---

## Problema que resolve
Empresários que usam planilhas ou apps simples não conseguem responder: *quanto posso retirar hoje sem prejudicar o caixa?* O sistema resolve a lacuna entre "lançar movimentações" e "tomar decisões com segurança".

---

## Escopo inicial (V1 — MVP funcional)

### O que entra:
- Lançamentos financeiros completos (entradas, saídas, transferências)
- Categorias DRE gerencial
- Recorrências e parcelamentos
- Caixinhas / reservas com regras automáticas e configuração de origem
- Gestão de sócios (percentual, pró-labore, distribuição)
- DRE mensal gerencial
- Dashboard executivo
- Fechamento mensal com trava
- Contas bancárias / caixas
- Auditoria de alterações

### O que não entra (V1):
- Multiempresa
- Integração bancária automática (OFX/Open Finance)
- NF-e / integração fiscal
- App mobile
- IA para sugestão de categorias
- Relatórios avançados de projeção
- Centro de custo (entra na V2)
- Anexos de comprovantes (entra na V2)

---

## Funcionalidades

### Módulo 1 — Dashboard Executivo
- Cards: receita bruta, receita líquida, despesas totais, lucro operacional, lucro líquido, caixa atual
- Cards: contas a pagar 7/30 dias, saldo em reservas, disponível para distribuição, inadimplência
- Gráficos: receita por mês, despesas por categoria, evolução de lucro, fluxo de caixa, previsto x realizado, distribuição por sócio, reservas acumuladas

### Módulo 2 — Lançamentos
Cada lançamento contém:
- `tipo`: entrada | saída | transferência
- `subtipo`: receita | despesa | imposto | pró-labore | aporte | retirada | transferência
- descrição, valor, data de competência, data de vencimento, data de pagamento
- `status`: pendente | pago | atrasado | cancelado
- categoria DRE, conta bancária, forma de pagamento
- recorrência (referência ao modelo), parcelamento (referência ao grupo)
- sócio relacionado (nullable), observação

Tipos suportados: receita avulsa, receita recorrente, despesa fixa, despesa variável, imposto recorrente, parcela de compra, retirada de sócio, aporte, transferência entre contas, provisionamento de reserva

### Módulo 3 — DRE Gerencial
Estrutura:
```
Receita Bruta
(-) Deduções / Estornos
(=) Receita Líquida
(-) Custos Diretos
(=) Lucro Bruto
(-) Despesas Operacionais
   - Comercial | Marketing | Administrativo | Tecnologia | Jurídico/Contábil | Pessoal
(=) EBITDA / Lucro Operacional
(-) Impostos
(-) Financeiro
(=) Lucro Líquido
```
Filtros: por mês, anual, comparativo entre meses, previsto x realizado, exportar PDF/Excel

### Módulo 4 — Sócios e Distribuição
- Cadastro de sócios com percentual societário e pró-labore fixo
- Regras de distribuição de lucro por sócio
- Travas para retirada (imposto provisionado, reserva mínima, caixa operacional mínimo)
- Histórico de alterações societárias
- Eventos separados: `pro_labore`, `distribuicao_lucro`, `retirada_extraordinaria`, `aporte_socio`
- Histórico de retiradas e saldo pendente por sócio

### Módulo 5 — Caixinhas / Reservas ⬅️ CORE
Criar, editar e excluir reservas com configuração total:

**Campos de uma Caixinha:**
- nome (ex: "Reserva de Impostos")
- tipo: imposto | emergência | reinvestimento | distribuição futura | personalizado
- percentual de provisionamento (ex: 10%)
- gatilho: automático por entrada recebida | manual
- **origem da dedução:** de qual tipo de receita incide (todas as entradas | só receitas operacionais | só receitas extras | configuração personalizada por categoria)
- **destino contábil:** classificação interna — não mistura com despesa operacional
- saldo atual
- histórico de movimentações (entrada automática / saída manual / ajuste)
- status: ativa | pausada | arquivada

**Comportamento:**
- Ao registrar uma entrada, o sistema aplica todas as caixinhas ativas e calcula os provisionamentos automaticamente
- O saldo "disponível operacional" = entrada recebida – soma das caixinhas ativas
- Movimentação manual com justificativa obrigatória
- Regras de saída: saque livre | aprovação necessária | trava por regra societária

**Exemplo de funcionamento:**
```
Entrada: R$ 20.000
→ Impostos (10%): R$ 2.000
→ Emergência (5%): R$ 1.000
→ Reinvestimento (10%): R$ 2.000
→ Distribuição futura (20%): R$ 4.000
Disponível operacional: R$ 11.000
```

### Módulo 6 — Recorrências e Parcelamentos
- Modelo de recorrência separado das instâncias geradas
- Suporte: mensal, semanal, quinzenal, anual, com ou sem data final
- Parcelamento em X vezes com vencimento configurável
- Edição de instâncias futuras sem alterar as passadas
- Baixa individual por parcela
- Cancelamento de próximas cobranças

### Módulo 7 — Fechamento Mensal
- Ciclo de status: Aberto → Em conferência → Fechado → Reaberto (com permissão)
- Trava de edições retroativas após fechamento
- Snapshot da DRE no momento do fechamento
- Registro: quem fechou, quando, observação
- Qualquer edição pós-fechamento exige log + justificativa + usuário

### Módulo 8 — Configurações
- Categorias DRE (criar, editar, inativar, vincular a grupo DRE)
- Contas bancárias e caixas
- Regras de recorrência
- Dados da empresa e regime tributário
- Usuários e permissões (admin / operador / visualizador)

---

## Telas

| Tela | Descrição |
|---|---|
| `/dashboard` | Visão executiva do mês |
| `/lancamentos` | Lista, filtros, ações rápidas |
| `/lancamentos/novo` | Formulário de lançamento |
| `/dre` | DRE gerencial por período |
| `/reservas` | Lista de caixinhas + saldos |
| `/reservas/nova` | Criar/editar caixinha com regras de dedução |
| `/reservas/:id` | Detalhe + histórico de movimentações |
| `/socios` | Percentuais, pró-labore, histórico |
| `/socios/distribuicao` | Calcular e aprovar distribuição |
| `/fechamento` | Controle de meses, status, travas |
| `/configuracoes` | Categorias, contas, empresa, usuários |

---

## Regras de Negócio

**Regra 1:** Nenhum lançamento sem categoria DRE.

**Regra 2:** Retirada de sócio nunca entra como despesa operacional. Usa subtipo próprio (`pro_labore`, `distribuicao_lucro`, `retirada_extraordinaria`).

**Regra 3:** Distribuição de lucro só é liberada após: impostos provisionados + reserva mínima abastecida + caixa operacional mínimo mantido.

**Regra 4:** Caixinhas automáticas incidem sobre entrada **recebida** (status pago), não sobre faturamento prometido — salvo configuração explícita da caixinha.

**Regra 5:** Mês fechado não edita sem log de auditoria com justificativa e usuário responsável.

**Regra 6:** Parcelas e recorrências geram instâncias independentes — cada uma com status e baixa próprios.

**Regra 7:** Todo lançamento tem data de competência e data de vencimento separadas. DRE usa competência; fluxo de caixa usa vencimento.

**Regra 8:** Saldo de caixinha é virtual (provisionado) — não representa conta bancária real, mas aparece deduzido do disponível operacional.

**Regra 9:** Origem de cada caixinha é configurável — uma caixinha de imposto pode incidir só sobre receitas operacionais, enquanto uma de reinvestimento pode incidir sobre tudo.

**Regra 10:** Toda movimentação manual em caixinha exige observação.

---

## Backend

### Autenticação
- Supabase Auth (email/senha, com suporte a convite de usuários)
- Row Level Security (RLS) por `company_id`
- Roles: `admin`, `operador`, `viewer`

### Banco de dados
PostgreSQL via Supabase

**Entidades principais:**
```
companies, partners, bank_accounts, categories,
transactions, recurring_rules, installment_groups,
reserves, reserve_movements, monthly_closings,
profit_distributions, profit_distribution_items,
audit_logs, users_companies
```

**Tabela `reserves` (detalhada):**
```sql
id, company_id, nome, tipo, percentual,
automatico (bool), gatilho (recebimento|manual),
origem_tipo (todas|operacional|extra|personalizado),
origem_categorias (array de category_id, nullable),
destino_contabil (label interno),
permite_saque_livre (bool),
saldo_atual (calculado),
status (ativa|pausada|arquivada),
created_at, updated_at
```

**Tabela `reserve_movements`:**
```sql
id, reserve_id, company_id, transaction_id (nullable),
tipo (entrada_automatica|saida_manual|ajuste|estorno),
valor, data, observacao, user_id, created_at
```

### Endpoints esperados
```
POST   /transactions
PUT    /transactions/:id
DELETE /transactions/:id (soft delete)

GET    /dre?month=&year=
GET    /cashflow?days=30|60|90

POST   /reserves
PUT    /reserves/:id
DELETE /reserves/:id
GET    /reserves
POST   /reserves/:id/movements

POST   /monthly-closings/:month/close
POST   /monthly-closings/:month/reopen

POST   /partners
PUT    /partners/:id
POST   /profit-distributions

GET    /audit-logs?entity=&entity_id=
```

### Automações (n8n)
- Gerar instâncias de recorrências mensalmente
- Alertar vencimentos (D-3, D-1, vencido)
- Aplicar provisionamento automático de caixinhas ao registrar entrada paga
- Enviar resumo semanal por e-mail/WhatsApp
- Acionar status "Em conferência" no dia X do mês

---

## Frontend

### Stack
- **Framework:** Next.js 14 (App Router) ou Lovable para protótipo rápido
- **UI:** Tailwind CSS + shadcn/ui
- **Gráficos:** Recharts ou Tremor
- **Estado:** Zustand ou React Query para server state
- **Forms:** React Hook Form + Zod

### Páginas
Conforme lista de telas acima.

### Componentes-chave
- `TransactionForm` — formulário completo com lógica condicional por subtipo
- `DRETable` — tabela hierárquica com grupos e subtotais
- `ReserveCard` — card de caixinha com saldo, percentual e botão de movimentação
- `ReserveRuleBuilder` — configurador de origem da dedução (qual receita, qual percentual)
- `MonthClosingBadge` — badge de status do mês com ações
- `PartnerDistributionCalc` — calculadora de distribuição por sócio
- `CashflowChart` — gráfico de fluxo 30/60/90 dias

### Fluxo do usuário (dia a dia)
1. Acessa dashboard → vê resumo do mês
2. Registra entrada → sistema aplica caixinhas automaticamente → mostra disponível operacional atualizado
3. Registra saídas → classifica por categoria DRE
4. Ao final do mês: revisa DRE → calcula distribuição → fecha mês

---

## Design / UX

### Estilo
- **Tema:** Dark mode por padrão — financeiro executivo pede seriedade. Colocar possibilidade de tema White mode também
- **Paleta:** Fundo `#0D0F14`, superfícies `#141720`, texto `#E8EAF0`, accent `#a400b6 ` , alerta `#F59E0B`, positivo `#10B981`, negativo `#e20055 `, Gradiente de identidade: #e20055 → #9e11cd
- **Tipografia:** Display — `DM Serif Display` ou `Playfair Display` para números grandes; corpo — `IBM Plex Mono` para valores financeiros, `DM Sans` para textos
- **Densidade:** Alta — muita informação por tela, sem espaço desperdiçado
- **Componentes:** Cards com bordas finas, tabelas compactas, badges de status coloridos

### O que evitar
- Branco puro como fundo (parece planilha)
- Cores pastel (comunica amador)
- Ícones decorativos sem função
- Dashboards com informação genérica que não responde nada concreto
- Formulários sem feedback imediato de validação

---

## Dados

### Entidades e campos críticos

**transactions**
`id, company_id, type, subtype, description, amount, competence_date, due_date, payment_date, status, category_id, bank_account_id, partner_id, recurring_rule_id, installment_group_id, notes, created_by, created_at`

**reserves**
`id, company_id, nome, tipo, percentual, automatico, gatilho, origem_tipo, origem_categorias[], destino_contabil, permite_saque_livre, status`

**reserve_movements**
`id, reserve_id, transaction_id, tipo, valor, data, observacao, user_id`

**partners**
`id, company_id, nome, percentual_societario, pro_labore, regra_distribuicao, ativo`

**categories**
`id, company_id, nome, tipo, grupo_dre, subgrupo_dre, ativa`

**monthly_closings**
`id, company_id, reference_month, status, closed_by, closed_at, snapshot_dre (jsonb), notes`

**audit_logs**
`id, company_id, user_id, action, entity, entity_id, old_data (jsonb), new_data (jsonb), created_at`

---

## Fora do Escopo (V1)

- Integração bancária automática (OFX, Open Finance)
- Emissão ou leitura de notas fiscais
- App mobile nativo
- Multiempresa / holding
- IA para categorização automática
- Centro de custo
- Projeção financeira com IA
- Relatório orçado x realizado
- Anexos de comprovantes

---

## Prioridades

1. **Primeiro:** Lançamentos + Categorias DRE + Dashboard básico — sistema funciona para registrar e visualizar
2. **Segundo:** Caixinhas com regras automáticas + Sócios + DRE gerencial — sistema responde perguntas de gestão
3. **Terceiro:** Fechamento mensal + Recorrências + Parcelamentos — sistema fecha o ciclo operacional
4. **Depois (V2):** Centro de custo, anexos, fluxo de caixa projetado, alertas automáticos, auditoria detalhada

---

## Critérios de Aceite

O sistema está pronto quando consegue responder, sem planilha paralela:

- [ ] Quanto a empresa faturou este mês?
- [ ] Qual foi o lucro líquido real?
- [ ] Quanto cada sócio pode retirar hoje?
- [ ] Quanto está provisionado em impostos?
- [ ] Qual o disponível operacional após as caixinhas?
- [ ] Qual a DRE do mês, com comparativo do mês anterior?
- [ ] Quais contas vencem nos próximos 30 dias?
- [ ] O mês está fechado e travado?
- [ ] Uma caixinha pode ser criada, editada, pausada e excluída sem afetar histórico?
- [ ] Uma entrada registrada dispara automaticamente os provisionamentos corretos por caixinha?

---

## Stack Desejada

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 + Tailwind + shadcn/ui + Recharts |
| Backend / BaaS | Supabase (Auth + Postgres + RLS + Storage) |
| Automações | n8n (recorrências, alertas, fechamentos) |
| Deploy | Vercel (frontend) + Supabase Cloud |
| Prototipagem | Lovable (para validar telas antes de codar) |

---

## Deploy

- **Frontend:** Vercel (CI/CD automático via GitHub)
- **Banco:** Supabase Cloud (região São Paulo se disponível, ou us-east)
- **n8n:** VPS Contabo existente via Docker (já configurado)
- **Domínio:** subdomain dedicado ex: `financeiro.nassessoria.com.br`

---

## Observações

- **Pró-labore nunca aparece como despesa operacional na DRE.** Fica em linha própria abaixo do lucro operacional.
- **Caixinha não é conta bancária.** É um provisionamento virtual que deduz do disponível. O dinheiro real fica na conta, mas o sistema controla quanto é "reservado".
- **A origem da caixinha importa muito:** uma reserva de imposto do Simples Nacional deve incidir sobre receita bruta; uma reserva de reinvestimento pode incidir só sobre o lucro líquido. Isso deve ser configurável por caixinha.
- **O fechamento mensal é o coração da governança.** Sem ele, o sistema vira planilha. Com ele, vira ferramenta de decisão.
- O sistema deve ser construído pensando em **multi-usuário desde o início** (RLS por company_id), mesmo que comece single-company.
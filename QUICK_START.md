# 🚀 INSTRUÇÕES RÁPIDAS - P2P Exchange

## ⚡ Para colocar no ar HOJE (Grátis):

### 1. MongoDB (Banco de Dados)
- Acesse: https://www.mongodb.com/atlas
- Crie conta → Cluster gratuito → Copie a string de conexão

### 2. Backend (API)
- Acesse: https://render.com
- New Web Service → Conecte GitHub
- Build: `cd backend && npm install`
- Start: `cd backend && npm start`
- Variáveis:
  - MONGODB_URI: (sua string do MongoDB)
  - JWT_SECRET: qualquer_texto_secreto_123
  - NODE_ENV: production

### 3. Frontend (Site)
- Acesse: https://vercel.com
- New Project → Conecte GitHub
- Root Directory: `frontend`
- Variável: NEXT_PUBLIC_API_URL: (URL do seu Render)

### 4. Finalizar
- Volte no Render → Adicione FRONTEND_URL: (URL do Vercel)
- Redeploy

## ✅ Pronto! Sua plataforma estará no ar!

### 🎯 O que funciona:
- Cadastro/Login
- Criar ordens de câmbio
- Ver ordens disponíveis
- Aceitar ordens
- Dashboard pessoal
- 4 moedas: USD, BRL, PYG, ARS

### 🔄 Próximos passos:
- Chat entre usuários
- Sistema de pagamento real
- Escrow/garantia

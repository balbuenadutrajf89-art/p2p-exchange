# 🚀 P2P Exchange - Plataforma de Câmbio

Uma plataforma P2P para câmbio entre USD/USDT, Real Brasileiro, Guarani Paraguaio e Peso Argentino.

## 📋 Funcionalidades

✅ **Cadastro e Login de usuários**  
✅ **Criação de ordens de compra/venda**  
✅ **Listagem de ordens disponíveis**  
✅ **Sistema de aceitação de ordens**  
✅ **Dashboard personalizado**  
✅ **4 moedas suportadas: USD/USDT, BRL, PYG, ARS**  

## 🛠️ Tecnologias

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 🚀 Como Hospedar (GRATUITO)

### 1. Preparar o Banco de Dados (MongoDB)

**Opção A - MongoDB Atlas (Recomendado - Grátis):**
1. Acesse [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Crie uma conta gratuita
3. Crie um cluster gratuito
4. Em "Database Access", crie um usuário
5. Em "Network Access", adicione `0.0.0.0/0` (permite qualquer IP)
6. Copie a string de conexão (algo como: `mongodb+srv://usuario:senha@cluster.mongodb.net/p2p-exchange`)

**Opção B - Railway (Grátis):**
1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project" → "Provision MongoDB"
4. Copie a URL de conexão

### 2. Hospedar o Backend (API)

**Usando Render (Grátis):**
1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Clique em "New" → "Web Service"
4. Conecte seu repositório GitHub (você precisa fazer upload do código)
5. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:**
     - `MONGODB_URI`: Cole sua string de conexão do MongoDB
     - `JWT_SECRET`: `meu_jwt_super_secreto_123456`
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: `https://seu-frontend.vercel.app` (você vai pegar isso depois)

### 3. Hospedar o Frontend

**Usando Vercel (Grátis):**
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Conecte seu repositório GitHub
5. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Environment Variables:**
     - `NEXT_PUBLIC_API_URL`: Cole a URL do seu backend do Render (ex: `https://seu-backend.onrender.com`)

### 4. Atualizar URLs

Depois que ambos estiverem no ar:
1. Volte no Render (backend)
2. Atualize a variável `FRONTEND_URL` com a URL do Vercel
3. Redeploy o backend

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- MongoDB local ou Atlas

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Estrutura do Projeto

```
p2p-exchange/
├── frontend/                 # Next.js app
│   ├── src/
│   │   ├── pages/           # Páginas (index, login, register, dashboard)
│   │   ├── components/      # Componentes reutilizáveis
│   │   └── styles/          # CSS global
│   └── package.json
├── backend/                 # Express API
│   ├── src/
│   │   ├── models/         # Modelos do MongoDB
│   │   ├── routes/         # Rotas da API
│   │   ├── middleware/     # Middlewares (auth)
│   │   └── server.js       # Servidor principal
│   └── package.json
└── README.md
```

## 🔐 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação via JWT
- Validação de dados de entrada
- CORS configurado
- Middleware de autenticação

## 🚧 Próximas Funcionalidades

- [ ] Chat interno entre usuários
- [ ] Sistema de escrow/garantia
- [ ] Integração com PIX
- [ ] Integração com carteiras de criptomoedas
- [ ] Sistema de avaliações
- [ ] Painel administrativo
- [ ] Notificações em tempo real

## 📞 Suporte

Se tiver dúvidas sobre hospedagem ou configuração, me avise!

---

**Desenvolvido para demonstração de plataforma P2P Exchange**

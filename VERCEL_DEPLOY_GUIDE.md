# 🚀 Guia de Deploy na Vercel

## ❌ Problema Atual
O deploy está falhando com erro: `Firebase: Error (auth/invalid-api-key)` porque as variáveis de ambiente do Firebase não estão configuradas na Vercel.

## ✅ Solução

### 1. Configurar Variáveis de Ambiente na Vercel

Aceda ao dashboard da Vercel e configure as seguintes variáveis:

**🔥 Firebase Configuration:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCEz5lT9oYsqS6mGNs3PYNPdIS7M_1VYzg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dino-world-43d29.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dino-world-43d29
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dino-world-43d29.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1038930071389
NEXT_PUBLIC_FIREBASE_APP_ID=1:1038930071389:web:139f2fb58cb895c2e4e2b4
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NVH885K99E
```

**🌐 Site Configuration:**
```
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

### 2. Como Configurar na Vercel

1. **Aceder ao Dashboard:**
   - Vá para [vercel.com](https://vercel.com)
   - Selecione o projeto `mundo-musical`

2. **Configurar Environment Variables:**
   - Clique em **Settings** (Definições)
   - Navegue para **Environment Variables**
   - Adicione cada variável uma por uma:
     - **Name:** `NEXT_PUBLIC_FIREBASE_API_KEY`
     - **Value:** `AIzaSyCEz5lT9oYsqS6mGNs3PYNPdIS7M_1VYzg`
     - **Environment:** Selecione `Production`, `Preview`, e `Development`

3. **Repetir para todas as variáveis:**
   - Adicione todas as 8 variáveis listadas acima
   - Certifique-se que todas estão ativas para Production

4. **Redeployar:**
   - Volte à aba **Deployments**
   - Clique em **Redeploy** no último deployment
   - ✅ O build deve funcionar agora!

### 3. Verificar Configuração

Após configurar as variáveis:
- ✅ Build deve compilar sem erros
- ✅ Páginas admin devem carregar
- ✅ Firebase deve funcionar corretamente

## 📝 Notas Importantes

- **Todas as variáveis começam com `NEXT_PUBLIC_`** porque são usadas no frontend
- **Não altere os valores** - são as configurações corretas do projeto Firebase
- **Configure para todos os ambientes** (Production, Preview, Development)
- **O `NEXT_PUBLIC_SITE_URL`** deve ser o domínio real da Vercel

## 🔗 Links Úteis

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

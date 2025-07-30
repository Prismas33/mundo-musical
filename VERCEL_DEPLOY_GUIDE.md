# 🚀 Guia de Deploy na Vercel

## ❌ Problema Atual
O deploy está falhando com erro: `Firebase: Error (auth/invalid-api-key)` porque as variáveis de ambiente do Firebase não estão configuradas na Vercel.

## ✅ Solução

### 1. Configurar Variáveis de Ambiente na Vercel

Aceda ao dashboard da Vercel e configure as seguintes variáveis:

**🔥 Firebase Configuration:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
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
     - **Value:** `[obtenha do Firebase Console]`
     - **Environment:** Selecione `Production`, `Preview`, e `Development`

3. **Repetir para todas as variáveis:**
   - Adicione todas as variáveis listadas acima
   - Certifique-se que todas estão ativas para Production
   - **IMPORTANTE:** Use os valores reais do seu Firebase Console

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
- **Use os valores do seu Firebase Console** - não copie exemplos
- **Configure para todos os ambientes** (Production, Preview, Development)
- **O `NEXT_PUBLIC_SITE_URL`** deve ser o domínio real da Vercel

## 🔗 Links Úteis

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🔐 Segurança

**NUNCA** commite chaves API para o Git. Use sempre variáveis de ambiente na Vercel.

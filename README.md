# Mundo Musical - Site Oficial

## 📋 Informações do Projeto

**Stack:** Next.js + React + Tailwind CSS  
**Objetivo:** Site institucional infantil com visual moderno e colorido, focado em captar emails, mostrar vídeos e preparar lançamentos  
**Linguagem:** Português  
**SEO:** Otimizado com título, descrição e metatags  

---

## 🚀 1. Setup Inicial

### Tecnologias
- Next.js
- React
- React DOM
- Tailwind CSS
- Autoprefixer
- PostCSS

### Estrutura de Pastas
```
dino-musical-world/
├── pages/
│   ├── index.tsx         -> Página Inicial
│   ├── sobre.tsx         -> Sobre o Dino
│   ├── videos.tsx        -> Grelha com vídeos YouTube e Rumble
│   ├── em-breve.tsx      -> Mockups de produtos futuros
│   └── contacto.tsx      -> Formulário + inscrição no Dino Club
├── components/
│   ├── Layout.tsx        -> Layout base
│   ├── Navbar.tsx        -> Navegação
│   ├── Footer.tsx        -> Rodapé
│   ├── Hero.tsx          -> Seção hero
│   ├── Card.tsx          -> Cards reutilizáveis
│   ├── VideoGrid.tsx     -> Grade de vídeos
│   ├── NewsletterForm.tsx -> Captura de email
│   ├── MockupSection.tsx -> Produtos futuros
│   └── DinoIntro.tsx     -> Introdução do Dino
├── public/
│   ├── images/           -> Imagens e assets
│   └── icons/            -> Ícones
└── styles/               -> Estilos globais (se necessário)
```

---

## 🎨 2. Paleta de Cores

```css
/* Cores principais */
--orange-primary: #FFA500    /* Laranja vibrante */
--blue-secondary: #00BFFF    /* Azul celeste */
--green-accent: #ADFF2F      /* Verde limão */
--background: #FDF6EC        /* Fundo papel */
--white: #FFFFFF             /* Branco puro */

/* Tipografia recomendada */
font-family: 'Poppins', 'Nunito', 'Baloo 2', sans-serif;
```

---

## 📄 3. Estrutura das Páginas

### Página Inicial (`/`)
- **Hero:** "O Dino está a conquistar os miúdos... e os pais também."
- **Botões:** "Ver Vídeos" | "Colorir com o Dino (em breve)"
- **Secções:**
  - Ver vídeos → `/videos`
  - Colorir com o Dino (em breve) → `/em-breve`
  - App Dino TV (a caminho) → newsletter

### Sobre (`/sobre`)
- História do Dino
- Missão educativa
- Valores do projeto

### Vídeos (`/videos`)
- Grade responsiva de vídeos
- Integração YouTube e Rumble
- Filtros e categorias

### Em Breve (`/em-breve`)
- Mockups de produtos futuros
- Livros para colorir
- Aplicação móvel
- Peluches e merchandising

### Contacto (`/contacto`)
- Formulário de contacto
- Inscrição no Dino Club
- Redes sociais

---

## 🧩 4. Componentes Essenciais

### Layout Base
- **Navbar:** Links para todas as páginas
- **Footer:** Redes sociais, direitos reservados, Dino Club

### Componentes Funcionais
- **`<Hero />`** - Imagem + headline + botão para ver vídeos
- **`<Card />`** - Para mostrar produtos futuros
- **`<VideoGrid />`** - Grade de vídeos embebidos
- **`<NewsletterForm />`** - Captura de email com validação
- **`<MockupSection />`** - Produtos em desenvolvimento
- **`<DinoIntro />`** - Secção animada sobre o Dino

---

## 🔍 5. SEO e Meta Tags

Cada página terá:
```html
<Head>
  <title>Página Específica - Dino Musical World</title>
  <meta name="description" content="Descrição única da página" />
  <meta property="og:title" content="Título para redes sociais" />
  <meta property="og:description" content="Descrição para redes sociais" />
</Head>
```

**Exemplo da página inicial:**
- Título: "Mundo Musical – Vídeos educativos e diversão para os mais pequenos"
- Descrição: "Descobre o mundo musical do Dino! Vídeos educativos, atividades e diversão para crianças. Junta-te ao Dino Club!"

---

## 📱 6. Design Responsivo

- **Mobile First:** Tailwind CSS com breakpoints responsivos
- **Menu:** Hamburguer no mobile, horizontal no desktop
- **Imagens:** Otimizadas com `next/image`
- **Grid:** Adaptável para diferentes tamanhos de ecrã

---

## 🚀 7. Funcionalidades Principais

### Atuais
- [x] Navegação intuitiva
- [x] Visualização de vídeos
- [x] Captura de emails (newsletter)
- [x] Design colorido e atrativo
- [x] SEO otimizado

### Futuras (Comentadas no código)
- [ ] **Integração Mailchimp/Beehiiv** para newsletter
- [ ] **Stripe/Gumroad** para venda de produtos
- [ ] **PWA** - Instalação como aplicação
- [ ] **Sistema de login** para área do Dino Club
- [ ] **Comentários** nos vídeos
- [ ] **Jogos interativos** embebidos

---

## 🛠️ 8. Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start

# Linting
npm run lint
```

---

## 📂 9. Estrutura de Deployment

### Recomendações
- **Vercel** (nativo para Next.js)
- **Netlify** (alternativa)
- **GitHub Pages** (estático)

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SITE_URL=https://mundomusical.com
NEXT_PUBLIC_NEWSLETTER_API=sua_api_key
```

---

## 🎯 10. Objetivos e KPIs

### Principais Métricas
- **Inscrições na newsletter** (Dino Club)
- **Visualizações de vídeos**
- **Tempo de permanência no site**
- **Taxa de conversão email**

### Objetivos
1. Construir base de fãs fiéis
2. Preparar lançamento de produtos
3. Estabelecer presença digital forte
4. Educar e entreter crianças

---

*Projeto criado com ❤️ para o Mundo Musical*

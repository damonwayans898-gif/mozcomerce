# MozCommerce - Marketplace Digital de Moçambique

## 🇲🇿 Visão Geral

MozCommerce é um marketplace 100% moçambicano de alto nível, escalável e preparado para milhões de usuários. A plataforma permite compra e venda de produtos físicos e serviços, com integração total com métodos de pagamento móveis locais e WhatsApp.

## 🎯 Características Principais

### Para Compradores
- ✅ Navegação intuitiva e responsiva
- ✅ Busca avançada de produtos e serviços
- ✅ Múltiplos métodos de pagamento (M-Pesa, E-Mola, M-Kesh, VISA, Mastercard)
- ✅ Contacto direto com vendedores via WhatsApp
- ✅ Sistema de avaliações e reviews
- ✅ Rastreamento de pedidos em tempo real
- ✅ Carrinho de compras persistente

### Para Vendedores
- ✅ Dashboard profissional completo
- ✅ Gestão de produtos com upload múltiplo de imagens
- ✅ Gestão de pedidos e inventário
- ✅ Estatísticas e relatórios de vendas
- ✅ Sistema de comissão automática (5%)
- ✅ Notificações via WhatsApp
- ✅ Plano gratuito e premium disponíveis
- ✅ Sistema de verificação KYC

### Para Administradores
- ✅ Dashboard com métricas em tempo real
- ✅ Aprovação de vendedores
- ✅ Gestão de disputas e denúncias
- ✅ Controle de comissões
- ✅ Sistema antifraude integrado
- ✅ Relatórios mensais automatizados
- ✅ Gestão de banners promocionais

## 💰 Sistema de Pagamentos

### Métodos Integrados
1. **M-Pesa Moçambique** - Pagamento móvel líder
2. **E-Mola** - Carteira digital
3. **M-Kesh** - Sistema de pagamento móvel
4. **VISA** - Cartões de crédito/débito
5. **Mastercard** - Cartões de crédito/débito
6. **PayPal** (Opcional) - Pagamentos internacionais

### Fluxo de Pagamento
```
1. Cliente escolhe método de pagamento
2. Insere número de telefone ou dados do cartão
3. Recebe solicitação de pagamento no dispositivo
4. Confirma pagamento
5. Plataforma recebe confirmação via webhook
6. Pedido muda para status "Pago"
7. Comissão (5%) aplicada automaticamente
8. Pagamento retido em escrow
9. Após confirmação de entrega, pagamento liberado ao vendedor
```

### Recursos de Segurança
- ✅ Sistema de escrow (retenção de pagamento)
- ✅ Webhooks para confirmação em tempo real
- ✅ Registro seguro de todas as transações
- ✅ Sistema antifraude com pontuação de risco
- ✅ Criptografia de dados sensíveis
- ✅ Autenticação de dois fatores (2FA)

## 📱 Integração WhatsApp

### WhatsApp Direct
- Botão direto em cada produto
- Mensagem automática pré-formatada: 
  ```
  "Olá, estou interessado no produto [Nome do Produto] anunciado no MozCommerce."
  ```
- Formato de número: 258 + número (sem zero inicial)

### WhatsApp Business API (Futuro)
- ✅ Notificação automática de novo pedido
- ✅ Confirmação de pagamento
- ✅ Atualização de status de envio
- ✅ Chatbot básico de suporte
- ✅ Templates aprovados pelo Meta

## 🏗️ Arquitetura Técnica

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno e responsivo
- **JavaScript ES6+** - Funcionalidades interativas
- **Design System** - Paleta de cores baseada na bandeira moçambicana

### Estrutura de Arquivos
```
MozCommerce/
├── index.html              # Página principal
├── seller-dashboard.html   # Dashboard do vendedor
├── styles.css             # Estilos principais
├── dashboard.css          # Estilos do dashboard
├── script.js              # JavaScript principal
├── dashboard.js           # JavaScript do dashboard
└── README.md             # Documentação
```

### Estado Global (MozCommerce)
```javascript
{
  state: {
    user: null,              // Usuário autenticado
    cart: [],                // Carrinho de compras
    products: [],            // Produtos disponíveis
    categories: [],          // Categorias
    services: [],            // Serviços
    isAuthenticated: false,  // Status de autenticação
    userType: null           // 'buyer', 'seller', 'admin'
  },
  config: {
    currency: 'MZN',         // Metical moçambicano
    locale: 'pt-MZ',         // Português de Moçambique
    commissionRate: 0.05     // 5% de comissão
  }
}
```

## 🔐 Sistema de Autenticação

### Tipos de Usuário
1. **Comprador (Buyer)**
   - Registro simples
   - Aprovação automática
   - Acesso a compras e rastreamento

2. **Vendedor (Seller)**
   - Registro com informações adicionais
   - Verificação KYC obrigatória
   - Aprovação manual pelo admin
   - Acesso ao dashboard de vendas

3. **Administrador (Admin)**
   - Acesso total ao sistema
   - Gestão de usuários e disputas
   - Controle financeiro

### Processo de Verificação (KYC)
1. Upload de documento de identidade
2. Verificação de telefone via SMS
3. Verificação de email
4. Análise manual pelo admin
5. Aprovação ou rejeição

## 🛡️ Sistema Antifraude

### Pontuação de Risco
```javascript
Fatores de Risco:
- Valor do pedido > 50.000 MZN: +20 pontos
- Valor do pedido > 100.000 MZN: +30 pontos
- Conta nova (< 1 dia): +30 pontos
- Conta nova (< 7 dias): +15 pontos
- Telefone não verificado: +20 pontos

Score > 70: Alto risco - Pedido bloqueado
Score 40-70: Médio risco - Análise manual
Score < 40: Baixo risco - Aprovação automática
```

### Medidas de Proteção
- ✅ Verificação de telefone obrigatória
- ✅ Limite de pedidos para contas novas
- ✅ Monitoramento de atividades suspeitas
- ✅ Sistema de denúncias
- ✅ Bloqueio automático de usuários fraudulentos

## 📦 Gestão de Pedidos

### Status de Pedidos
1. **Pendente** - Aguardando pagamento
2. **Pago** - Pagamento confirmado
3. **Processando** - Preparando para envio
4. **Enviado** - Em trânsito
5. **Entregue** - Entrega confirmada
6. **Completo** - Pagamento liberado ao vendedor
7. **Cancelado** - Pedido cancelado

### Comissões
- Taxa padrão: **5% por transação**
- Plano Premium: **3% por transação** (em desenvolvimento)
- Pagamento ao vendedor: **Valor total - Comissão**
- Liberação: **Após confirmação de entrega**

## 🚚 Sistema de Entrega

### Parceiros de Logística (Planejado)
- Correios de Moçambique
- DHL Moçambique
- Transportadoras locais
- Opção de entrega própria do vendedor

### Rastreamento
- Código de rastreamento único
- Atualizações em tempo real
- Notificações via WhatsApp
- Histórico completo de movimentação

## 💼 Planos de Vendedor

### Plano Gratuito
- ✅ Até 50 produtos
- ✅ Comissão de 5%
- ✅ Suporte básico
- ✅ Estatísticas básicas

### Plano Premium (Em Desenvolvimento)
- ✅ Produtos ilimitados
- ✅ Comissão de 3%
- ✅ Suporte prioritário
- ✅ Estatísticas avançadas
- ✅ Destaque na plataforma
- ✅ API para integração
- **Preço:** 2.500 MZN/mês

## 📊 Analytics e Relatórios

### Para Vendedores
- Vendas diárias/mensais/anuais
- Produtos mais vendidos
- Taxa de conversão
- Valor médio do pedido
- Gráficos interativos
- Exportação em PDF/Excel

### Para Admin
- Receita total da plataforma
- Total de vendas processadas
- Número de usuários ativos
- Taxa de crescimento
- Produtos mais populares
- Categorias em destaque

## 🌍 Escalabilidade

### Preparado Para
- ✅ Milhões de usuários simultâneos
- ✅ Milhares de transações por minuto
- ✅ Armazenamento escalável de imagens
- ✅ CDN para entrega rápida de conteúdo
- ✅ Load balancing
- ✅ Cache distribuído
- ✅ Database sharding

### Expansão Futura
- 🚀 África Austral (África do Sul, Zimbabwe, Malawi)
- 🚀 Países de língua portuguesa (Angola, Portugal, Brasil)
- 🚀 App mobile nativo (iOS e Android)
- 🚀 Progressive Web App (PWA)

## 🎨 Design System

### Paleta de Cores
```css
--primary: #D84315        /* Vermelho (bandeira) */
--secondary: #FFA726      /* Laranja/Amarelo */
--accent: #FDD835         /* Amarelo brilhante */
--success: #66BB6A        /* Verde */
--danger: #EF5350         /* Vermelho erro */
```

### Tipografia
- **Display:** Outfit (800)
- **Body:** Outfit (400-600)
- **Monospace:** Space Mono (dados numéricos)

### Componentes
- Botões responsivos
- Cards com hover effects
- Modais acessíveis
- Forms validados
- Tabelas responsivas
- Badges de status
- Loading states

## 🚀 Como Usar

### Instalação Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mozcommerce.git

# Entre na pasta
cd mozcommerce

# Abra o index.html no navegador
open index.html
```

### Estrutura Básica
```html
<!DOCTYPE html>
<html lang="pt-MZ">
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Conteúdo -->
    <script src="script.js"></script>
</body>
</html>
```

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 480px
- **Tablet:** 481px - 768px
- **Desktop:** 769px - 1024px
- **Large Desktop:** > 1024px

### Mobile First
- Layout fluido
- Touch-friendly (botões ≥ 44px)
- Menu hamburger
- Imagens otimizadas
- Lazy loading

## 🔧 API Endpoints (Planejado)

### Autenticação
```
POST /api/auth/register      - Registrar usuário
POST /api/auth/login         - Login
POST /api/auth/logout        - Logout
POST /api/auth/verify        - Verificar telefone/email
```

### Produtos
```
GET    /api/products         - Listar produtos
POST   /api/products         - Criar produto
PUT    /api/products/:id     - Atualizar produto
DELETE /api/products/:id     - Deletar produto
GET    /api/products/:id     - Detalhes do produto
```

### Pedidos
```
GET  /api/orders             - Listar pedidos
POST /api/orders             - Criar pedido
GET  /api/orders/:id         - Detalhes do pedido
PUT  /api/orders/:id/status  - Atualizar status
```

### Pagamentos
```
POST /api/payments/initiate  - Iniciar pagamento
POST /api/payments/webhook   - Webhook de confirmação
GET  /api/payments/:id       - Status do pagamento
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário e está protegido por direitos autorais.

## 👥 Equipe

- **Desenvolvimento:** Equipe MozCommerce
- **Design:** Equipe MozCommerce
- **País:** Moçambique 🇲🇿

## 📞 Contato

- **Email:** suporte@mozcommerce.co.mz
- **WhatsApp:** +258 84 000 0000
- **Website:** https://mozcommerce.co.mz

## 🎉 Agradecimentos

Obrigado por escolher MozCommerce - Feito em Moçambique, para Moçambique!

---

**MozCommerce** - O Futuro do Comércio Digital em Moçambique 🇲🇿

# FluxusAI - MVP PCP Nível 1

Sistema de simulação do fluxo completo de mobilização do PCP Nível 1, com 4 telas essenciais projetadas com foco em responsividade, interfaces visualmente amigáveis e acessibilidade.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização responsiva
- **React Router** para navegação

## 📋 Páginas

### 1. Painel de Controle (NIR / Gestor)
- Botão principal "Declarar PCP Nível 1" em cor Fúcsia
- Feedback visual imediato após ativação
- Design responsivo priorizando desktop

### 2. Notificação de Ação (Médico)
- Modal/pop-up com animação fade-in e scale
- Tela de fundo simulada (prontuário eletrônico)
- Alerta de prioridade coletiva
- Botão de confirmação proeminente

### 3. Lista de Tarefas (Higienização)
- Lista de tarefas com priorização automática
- Tarefa PCP aparece no topo com animação slide-down
- Destaque visual com borda Fúcsia
- Design otimizado para mobile/tablet

### 4. Dashboard de Status (Pronto-Socorro)
- Visualização em tempo real do progresso
- 3 estágios de status com codificação de cores:
  - 🟠 Laranja: Aguardando Assinatura Médica
  - 🟡 Amarelo: Aguardando Higienização
  - 🟢 Verde: Leito Pronto
- Layout responsivo priorizando desktop

## 🎨 Design System

- **Fonte**: Inter (Google Fonts)
- **Cor Principal**: Fúcsia (#D946EF)
- **Cores de Status**: Laranja → Amarelo → Verde
- **Acessibilidade**: Alto contraste, suporte a leitores de tela

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Fluxo de Uso

1. **Página 1**: Gestor ativa o PCP Nível 1
2. **Página 2**: Médico recebe alerta e confirma assinatura de alta
3. **Página 3**: Equipe de higienização recebe tarefa prioritária
4. **Página 4**: Dashboard atualiza status em tempo real

## ♿ Acessibilidade

- Suporte a leitores de tela (ARIA labels)
- Alto contraste
- Navegação por teclado
- Foco visual claro

## 📄 Licença

Este é um projeto MVP para demonstração.


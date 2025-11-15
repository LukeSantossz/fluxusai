# 🚀 Guia de Deploy no Vercel

Este guia explica como hospedar o projeto FluxusAI MVP no Vercel.

## Pré-requisitos

- Conta no [Vercel](https://vercel.com) (gratuita)
- Conta no [GitHub](https://github.com), [GitLab](https://gitlab.com) ou [Bitbucket](https://bitbucket.org) (para deploy automático)

## Opção 1: Deploy via Interface Web (Recomendado)

### Passo 1: Preparar o Repositório

1. Inicialize um repositório Git (se ainda não tiver):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Crie um repositório no GitHub/GitLab/Bitbucket e faça o push:
   ```bash
   git remote add origin <URL_DO_SEU_REPOSITORIO>
   git branch -M main
   git push -u origin main
   ```

### Passo 2: Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"** ou **"Import Project"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Selecione o repositório do projeto
5. O Vercel detectará automaticamente as configurações:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Clique em **"Deploy"**

### Passo 3: Configuração (Opcional)

O arquivo `vercel.json` já está configurado, mas você pode ajustar:
- **Environment Variables**: Se precisar de variáveis de ambiente
- **Domain**: Configure um domínio personalizado se desejar

## Opção 2: Deploy via CLI

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

### Passo 3: Deploy

```bash
# Deploy de produção
vercel

# Deploy de preview
vercel --prod
```

## Configuração do Roteamento

O arquivo `vercel.json` já está configurado com rewrites para garantir que o React Router funcione corretamente. Todas as rotas serão redirecionadas para `index.html`, permitindo que o React Router gerencie o roteamento no lado do cliente.

## Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ A página inicial carrega corretamente
2. ✅ A navegação entre páginas funciona
3. ✅ As animações estão funcionando
4. ✅ O design responsivo está correto em diferentes dispositivos

## Atualizações Futuras

Com o deploy conectado ao Git, qualquer push para a branch principal (`main`) irá:
- Automaticamente fazer um novo build
- Fazer deploy da nova versão
- Gerar uma URL de preview para Pull Requests

## Troubleshooting

### Problema: Página 404 ao acessar rotas diretamente

**Solução**: O `vercel.json` já resolve isso com os rewrites. Se ainda ocorrer, verifique se o arquivo está na raiz do projeto.

### Problema: Build falha

**Solução**: 
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente para verificar erros
- Verifique os logs de build no dashboard do Vercel

### Problema: Estilos não carregam

**Solução**: 
- Verifique se o Tailwind CSS está configurado corretamente
- Certifique-se de que o `index.css` importa o Tailwind

## Suporte

Para mais informações, consulte a [documentação do Vercel](https://vercel.com/docs).


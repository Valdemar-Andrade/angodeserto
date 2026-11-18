# Angodeserto · Gestão de Fotografias

O painel está em `/admin`. Uma conta gere a Galeria e um Destaque Especial. A Galeria tem de uma a cinco fotografias. Um destaque pode ter uma fotografia principal, até três complementares e um título opcional.

## Configurar o Preview na Vercel

1. No projeto **angodeserto**, abra **Storage**. Crie um **Blob privado** para o ambiente de avaliação e ligue-o exclusivamente a **Preview**, com o prefixo de variável padrão `BLOB`. Use um armazenamento separado para uma eventual ativação em Production.
2. Em **Settings → Environment Variables**, confirme que `BLOB_READ_WRITE_TOKEN` foi definido para Preview. Mantenha a exposição automática das variáveis de sistema ativa para a aplicação receber `VERCEL_ENV`. Se a interface permitir, restrinja as variáveis à branch `feat/angodeserto-admin-minimal`.
3. Num terminal local com Node.js 24, execute `npm run admin:hash`. Introduza uma palavra-passe longa, exclusiva, de 16 a 256 bytes. A entrada fica oculta. Copie apenas o hash para `ADMIN_PASSWORD_HASH`. Gere outro segredo localmente com `openssl rand -hex 32`.
4. Adicione as variáveis abaixo nas definições protegidas de **Preview**. Guarde a palavra-passe num gestor de palavras-passe. Cole o hash inteiro, incluindo os sinais de dólar.

| Variável | Valor esperado |
| --- | --- |
| `ADMIN_USERNAME` | Nome escolhido para a única conta |
| `ADMIN_PASSWORD_HASH` | Hash scrypt gerado por `npm run admin:hash` |
| `ADMIN_SESSION_SECRET` | Segredo aleatório de 32 bytes, representado por 64 caracteres hexadecimais |
| `BLOB_READ_WRITE_TOKEN` | Token do Blob privado, criado na ligação à Vercel |

5. Faça um redeploy **do Preview** para carregar a configuração. Abra `/admin` nesse deployment, publique uma fotografia de teste, volte à homepage do mesmo deployment e confirme a alteração. As publicações seguintes dispensam redeploy.

Para retirar um destaque, selecione **Retirar destaque** e confirme. **Recuperar versão anterior** repõe a última publicação da área, incluindo um destaque retirado. Um rascunho aberto perdura enquanto a página estiver aberta. Depois de substituir uma imagem, confirme se a descrição e a legenda ainda se aplicam.

## Persistência e recuperação

As fotografias ficam em chaves imutáveis e o manifesto privado de cada área contém a publicação atual e a versão anterior. O editor valida referências e compara tanto a revisão que foi aberta como o ETag do manifesto. Uma edição concorrente recebe uma mensagem para recarregar, sem substituir a publicação mais recente.

As leituras do manifesto vão à origem do Blob. A publicação invalida a cache de dados e a homepage pré-renderizada com Next.js. A revalidação de dois minutos funciona como recuperação adicional. Se for preciso reconstruir a página enquanto o Blob está indisponível, a Galeria utiliza as cinco fotografias originais e o capítulo opcional fica oculto. Os ficheiros carregados mantêm-se no Blob para permitir recuperação. Retirar uma fotografia impede a entrega pelo endpoint público após a revalidação. Cópias já entregues podem expirar segundo a cache de imagens.

As Functions recebem um máximo de 4 MB por pedido. O navegador prepara originais acima desse limite, até 28 MB, antes de os enviar. O servidor valida o formato, descodifica a imagem, corrige a orientação e cria um WebP de até 1920 px no lado maior. Guarde os originais fora do painel.

## Acesso e proteção

A sessão expira em seis horas. Terminar sessão elimina o cookie desse navegador. Alterar o hash da palavra-passe ou o segredo invalida as sessões emitidas com os valores anteriores após redeploy.

O limite distribuído permite seis tentativas por origem e 40 por ambiente a cada dez minutos. O contador usa escrita condicional no Blob e guarda um identificador derivado do IP. Se o armazenamento falhar, o login fica indisponível. Um limite complementar pode ser aplicado pelo Vercel Firewall ao método `POST` no caminho `/api/admin/login`, conforme o plano e as permissões da equipa. O limite de aplicação funciona sem essa regra.

A aplicação usa os caminhos `angodeserto/editorial/v1/preview/`, `production/` e `development/` dentro do armazenamento. Guarde credenciais de Preview e Production em ambientes próprios. A Vercel deve definir `VERCEL_ENV` automaticamente.

## Validação local

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:admin
```

A suíte usa o build Next.js e um servidor Blob simulado no loopback, com credenciais descartáveis geradas em memória. Cobre acesso, uploads, publicação, escrita concorrente, recuperação e isolamento. A validação do Blob real é feita no Preview com os segredos do próprio ambiente.

[Documentação da Vercel Blob privada](https://vercel.com/docs/vercel-blob/private-storage) · [Variáveis de sistema da Vercel](https://vercel.com/docs/environment-variables/system-environment-variables) · [Rate limiting na Vercel](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)

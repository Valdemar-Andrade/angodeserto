# Curadoria fotográfica da Angodeserto V2

As referências `AD-N##` e `Q##` correspondem ao manifesto do pacote `Angodeserto_V2_Assets_para_Work.zip`. O pacote mantém os originais fornecidos. Os originais já publicados permanecem no histórico Git, incluindo a `main` no commit `1b02136`. `public/media/` contém os derivados da V2.

| Capítulo | Origem e composição |
| --- | --- |
| Abertura desktop | `galeria 2.jpeg`, camelos em primeiro plano e a montanha ao fundo. O recorte de 1200 × 1032 preenche o ecrã sem deformar a imagem. A margem esquerda recebe o título e o contraste necessário para leitura. |
| Abertura móvel | `AD-N14`, encontro de visitantes com os camelos. O enquadramento vertical de 880 × 1173 aproxima o visitante da experiência e mantém o centro da fotografia acima do texto. |
| Rota dos Camelos, o cenário | `camelo 2.jpeg`, com a silhueta das montanhas e a sombra do camelo. O capítulo abre em grande escala, com enquadramento próprio para cada orientação. |
| Rota dos Camelos, o encontro | `AD-N10` mostra a interação de um visitante. `galeria 3.jpeg` aproxima o olhar dos camelos e recupera a montanha ao fundo. |
| Rota dos Camelos, a vivência | `AD-N07`, convívio, e `AD-N30`, fogueira ao cair da noite. Quem quiser pode abrir o filme promocional da travessia, proveniente de `video destaque.mp4`. |
| Restaurante | `AD-N04` abre com os pratos vistos de cima. `AD-N01` mostra a sala com a mesa posta e `AD-N15` acompanha a preparação. |
| Hospedagem | `Q04` e `Q06` são as capas do quarto de casal e do quarto com beliches. `Q02` e `Q09` mostram ângulos complementares. |
| Álbum da hospedagem | `Q01`, `Q03`, `Q05`, `Q07` e `Q08` complementam as quatro fotografias dos quartos na visualização ampliada. |
| Galeria | `pessoa no camelo.jpeg` abre o mosaico. Seguem-se `AD-N22`, `AD-N18`, `AD-N25` e `galeria 5.jpeg`. |
| Encerramento | `por do sol.jpeg`, horizonte aberto de Caraculo ao pôr do sol. O texto fica acima do sol. |
| Identidade e partilha | Logótipo original convertido para WebP e favicon. Recorte de `galeria 2.jpeg` com 1200 × 630 para partilha. |

Na primeira curadoria, os derivados receberam orientação correta, conversão para sRGB, pequenos ajustes de exposição e contraste e nitidez subtil. Os ambientes interiores receberam um ligeiro ajuste do canal azul para moderar a dominante quente. A fogueira recebeu redução leve de ruído.

Nesta revisão, `camelo 2.jpeg`, `galeria 3.jpeg` e `por do sol.jpeg` foram exportados em WebP, com orientação incorporada e sem EXIF. O azul da fotografia da planície recebeu uma redução moderada de saturação. O detalhe dos camelos foi reduzido para 768 × 1024. O hero continua a servir AVIF pré-gerado com alternativas por viewport e usa `next/image` como fallback. O restante enquadramento é feito em CSS, com proporções preservadas e as dimensões dos derivados registadas no catálogo de imagens.

O filme de 34 segundos remove as margens pretas do original e conserva a sequência visual sem áudio. Os originais da antiga hospedagem, os quatro vídeos de quartos e a Q10 ficam em arquivo. O acervo antigo de tendas fica em arquivo até confirmação do estado atual.

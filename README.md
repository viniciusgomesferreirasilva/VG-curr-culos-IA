# Projeto Vila Parque

Primeira proposta estática e responsiva baseada exclusivamente no PDF `VP (3).pdf`. O repositório VG-curr-culos-IA foi preservado.

## Executar

Na pasta `/workspace/vila-parque`, execute `python3 -m http.server 4173 --bind 0.0.0.0`. Não exige dependências, chaves ou compilação. Use o checkout existente; não crie worktrees para executar este site.

## Conteúdo e pendências

- Imagem e apresentação originais extraídas do PDF fornecido.
- Vila Parque é o nome solicitado pelo usuário; a apresentação chama o empreendimento de Vila Parque. Confirmar a marca final antes de publicar.
- Áudio recebido, mas sem transcrição disponível nesta sessão.
- BOOK Mall & Office compactado recebido e analisado: 23 páginas. Conteúdo integrado ao site.
- Contatos, preços, disponibilidade e promessas comerciais não foram inventados. Integração de contato depende dos dados oficiais.
- O pedido do áudio ainda precisa de transcrição. O BOOK foi integrado. Publicação depende de ativação do GitHub Pages.

## GitHub e publicação

A cópia versionada está em `vila-parque/` no repositório `viniciusgomesferreirasilva/VG-curr-culos-IA`. O workflow `.github/workflows/vila-parque-pages.yml` publica somente esta pasta, sem alterar o aplicativo de currículos.

Endereço esperado após publicação bem-sucedida: https://viniciusgomesferreirasilva.github.io/VG-curr-culos-IA/ . A disponibilidade pública ainda não foi confirmada: o proxy do ambiente recusou a consulta com HTTP 403. A API do GitHub também não está acessível nesta sessão, portanto o resultado do workflow deve ser conferido na aba Actions. Não confundir envio do código com publicação concluída.

Validação executada: Chromium, 1440×1000 e 390×844; carregamento sem erro JavaScript, galeria abre/fecha com Escape, menu móvel, 17 imagens de páginas e ausência de rolagem horizontal. Fotos de destaque extraídas diretamente do PDF, sem regravação dos bytes.

## PDF único

`assets/vila-parque-apresentacao-completa.pdf` reúne capa editorial, as 17 páginas VP e as 23 páginas BOOK. `unificar_pdf.py` gera o documento e verifica todos os textos e hashes das imagens. O site oferece somente esse PDF unificado.

## Site publicado

A publicação nativa via branch `gh-pages` resolveu o bloqueio inicial. Run 40715346928: Status Success. Site: https://viniciusgomesferreirasilva.github.io/VG-curr-culos-IA/ . O workflow personalizado anterior foi removido. Para futuras alterações já commitadas, `python3 vila-parque/publicar.py` envia main e gh-pages sem force-push; conferir o resultado do deploy nativo.

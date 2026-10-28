# Projeto Vila Park

Primeira proposta estática e responsiva baseada exclusivamente no PDF `VP (3).pdf`. O repositório VG-curr-culos-IA foi preservado.

## Executar

Na pasta `/workspace/vila-park`, execute `python3 -m http.server 4173 --bind 0.0.0.0`. Não exige dependências, chaves ou compilação. Use o checkout existente; não crie worktrees para executar este site.

## Conteúdo e pendências

- Imagem e apresentação originais extraídas do PDF fornecido.
- Vila Park é o nome solicitado pelo usuário; a apresentação chama o empreendimento de Vila Parque. Confirmar a marca final antes de publicar.
- Áudio recebido, mas sem transcrição disponível nesta sessão.
- PDF BOOK MALL E OFFICE não pôde ser baixado por exceder 32 MiB. Não foi analisado.
- Contatos, preços, disponibilidade e promessas comerciais não foram inventados. Integração de contato depende dos dados oficiais.
- Esta proposta ainda precisa ser confrontada com o pedido do áudio e o segundo PDF. Não representa entrega final nem publicação.

## GitHub e publicação

A cópia versionada está em `vila-park/` no repositório `viniciusgomesferreirasilva/VG-curr-culos-IA`. O workflow `.github/workflows/vila-park-pages.yml` publica somente esta pasta, sem alterar o aplicativo de currículos.

Endereço esperado após publicação bem-sucedida: https://viniciusgomesferreirasilva.github.io/VG-curr-culos-IA/ . A disponibilidade pública ainda não foi confirmada: o proxy do ambiente recusou a consulta com HTTP 403. A API do GitHub também não está acessível nesta sessão, portanto o resultado do workflow deve ser conferido na aba Actions. Não confundir envio do código com publicação concluída.

Validação executada: Chromium, 1440×1000 e 390×844; carregamento sem erro JavaScript, galeria abre/fecha com Escape, menu móvel, 17 imagens de páginas e ausência de rolagem horizontal. Fotos de destaque extraídas diretamente do PDF, sem regravação dos bytes.

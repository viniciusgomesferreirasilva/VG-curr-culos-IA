# Projeto Vila Park — continuidade

O site é a prioridade. Preservar as imagens originais; não gerar substituições. Usuário autorizou commits e pushes de todas as alterações e pede link de acesso ao encerrar cada entrega.

## Fonte e integridade

`assets/apresentacao-vila-parque.pdf` é o VP original. As cinco fotos de destaque foram extraídas diretamente dos objetos do PDF, sem alterar seus bytes. `assets/fotos-originais.json` registra origem e SHA-256. A galeria também contém as 17 páginas inteiras. O PDF revisado atual preserva a composição original dentro de uma moldura; ainda não é a reformulação editorial solicitada.

## Pendências reais

- BOOK MALL E OFFICE V4 foi reenviado, mas `download_file` recusa arquivos maiores que 32 MiB antes de transferir bytes. Não foi importado nem analisado. É necessário receber versão menor/dividida ou URL de download acessível por ferramenta disponível. Autorização do usuário já existe; o bloqueio é técnico.
- Áudio da cliente não transcrito. Não inventar seus requisitos.
- Confirmar marca Vila Park versus Vila Parque, dados de contato e conteúdo comercial.
- GitHub Actions contém publicação do site via Pages. Conferir resultado antes de afirmar que existe URL pública. Caso GitHub Pages precise ser habilitado por administrador, o workflow pode falhar em configure-pages.

## Desenvolvimento

Use o checkout existente, sem criar worktrees. `python3 -m http.server 4173 --bind 0.0.0.0 --directory vila-park` na raiz do repositório. Sem dependências de frontend. Não alterar o aplicativo de currículos para executar este site.

## Entregas

Salvar alterações do site com commit e push para main; conferir o SHA remoto. Informar link público somente quando houver confirmação. Nunca descrever um commit local como backup remoto concluído.

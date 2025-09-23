# OP Borborema Dossiê

Simulador de hacking fake para eventos de airsoft, feito em Electron. O app simula uma invasão, descriptografia e transferência de dados, com interface imersiva e animações.

## Arquitetura do Projeto

```
/public
  index.html         # Interface principal (HUD, overlays, animações)
  style.css          # Estilos e temas (inclui animações)
  common.js          # Utilidades JS para animações e efeitos
  transferir.gif     # (Opcional) GIF de fundo para efeito hacking
/src
  main.js            # Processo principal do Electron (cria janela, integra preload)
  preload.js         # Ponte segura entre Electron e front-end (expondo hackerAPI)
  script.js          # Lógica do fake hacker (HUD, fluxo, overlays)
package.json         # Configuração do projeto, scripts e build
README.md            # Este arquivo
```

- **public/**: Tudo que é carregado no front-end (HTML, CSS, JS, imagens).
- **src/**: Código do Electron (main process, preload, lógica do fake hacker).

## Como Executar em Desenvolvimento

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o app em modo desenvolvimento:
   ```bash
   npm start
   ```

## Como Gerar o Executável (.exe)

1. Instale as dependências (se ainda não fez):
   ```bash
   npm install
   ```
2. Gere o instalador para Windows:
   ```bash
   npm run build
   ```
3. O instalador estará na pasta `dist/`.

## Fluxo do App
- Ao abrir, aparece uma tela de preinicialização fake ("Inicializando sistema...").
- Depois, o terminal/HUD é exibido.
- O usuário pode iniciar o hacking fake, que simula detecção, descriptografia e transferência de dados.
- Ao final, aparece o overlay de "Acesso Garantido" com animação de dinheiro.

## Personalização
- Para mudar o fundo, altere o GIF ou o CSS do body/terminal.
- Para customizar as animações, edite `common.js` ou `style.css`.
- Para alterar o fluxo do fake hacker, edite `src/script.js`.

---

Feito para fins lúdicos e educativos. Não representa hacking real.

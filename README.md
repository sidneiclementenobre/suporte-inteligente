# EasyDesk – Fluxo de Suporte Inteligente

O **EasyDesk** é um sistema funcional de Help Desk desenvolvido para rodar inteiramente no navegador do usuário. O projeto simula o cenário real de uma operação interna ou equipe de suporte que necessita centralizar, organizar e gerenciar chamados técnicos de forma ágil, eliminando a perda de informações em canais descentralizados.

Este projeto representa a transição do desenvolvimento estático para aplicações dinâmicas que gerenciam estados, manipulam estruturas de dados em tempo real e reagem instantaneamente às ações do usuário através da manipulação avançada do DOM (Document Object Model).

---

## 🚀 Funcionalidades Principais

- **Registro Padronizado:** Formulário dinâmico que captura o nome do solicitante, descrição detalhada do problema técnico e nível de prioridade (Baixa, Média e Alta).
- **Identificador Único:** Cada novo chamado recebe um ID exclusivo gerado via código no padrão `CH-XXXXXX`.
- **Gestão de Ciclo de Vida (Estados):** Alteração progressiva do status do chamado através do fluxo: `Pendente` ➔ `Em Progresso` ➔ `Concluído`.
- **Feedback Visual Automático:** A identidade visual do card (cor das bordas e tags) reage dinamicamente baseada no status e prioridade atuais do chamado.
- **Filtros e Busca Avançada:** Filtros rápidos por botões de status combinados com uma barra de pesquisa por texto que varre simultaneamente os campos de solicitante e descrição.
- **Persistência de Dados:** Integração com o `LocalStorage` do navegador, garantindo que os chamados sobrevivam a atualizações de página ou fechamento do navegador.
- **Interface Responsiva:** Layout mobile-first projetado para funcionar perfeitamente em smartphones e telas desktop.

---

## 🛠️ Tecnologias e Conceitos Aplicados

Este projeto foi construído utilizando **Vanilla JavaScript (JS Puro)**, HTML5 e CSS3, aplicando os seguintes pilares de engenharia de software:

- **Gerenciamento de Estado:** Sincronização entre o estado lógico da aplicação (array de objetos na memória) e o estado visual da tela (DOM).
- **Métodos Avançados de Array:** Uso rigoroso de métodos declarativos e imutabilidade para manipulação de listas:
  - `.push()` para inserção de novos registros.
  - `.filter()` para as regras de negócio de busca por termos e filtragem por abas de status.
  - `.map()` para a renderização limpa e injeção do HTML dinâmico no contêiner.
- **Event Delegation (Delegação de Eventos):** Padrão de projeto utilizado na listagem de chamados, onde um único escutador de eventos no elemento pai gerencia os cliques dos botões filhos criados dinamicamente, otimizando o uso de memória do navegador.
- **Manipulação Eficiente do DOM:** Reconstrução cirúrgica de nós HTML sem a necessidade de recargas parciais ou totais da página (`window.location.reload`).
- **Serialização de Dados:** Uso de `JSON.stringify()` e `JSON.parse()` para tratamento de persistência local.

---

## 📁 Estrutura do Projeto

```text
├── index.html       # Estrutura semântica do app e seções do painel
├── style.css        # Estilização moderna, variáveis CSS (Themes) e responsividade
└── app.js           # Toda a inteligência, controle de estado e regras de negócio do app
```

---

## 🔧 Como Executar o Projeto

1. Faça o clone deste repositório ou baixe os arquivos em sua máquina.
2. Abra a pasta do projeto utilizando o **Visual Studio Code**.
3. Abra o arquivo `index.html` diretamente no seu navegador de preferência ou utilize a extensão **Live Server** do VS Code para rodar um servidor local.

---

## 👨‍💻 Contexto de Desenvolvimento

O EasyDesk foi desenvolvido como parte de um desafio técnico de nível intermediário (Fase 2). O projeto foi desenhado sob um cronograma sugerido de 8 semanas, evoluindo progressivamente através de quatro marcos de maturidade de software: Captura de dados, Ciclo de vida de estados, Lógica de filtros complexos e Persistência/Refino de interface.

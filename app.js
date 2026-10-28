// Estado global da aplicação (Marco 1)
let tickets = [];
let currentFilter = "Todos";

// Seletores do DOM
const ticketForm = document.getElementById("ticket-form");
const ticketsContainer = document.getElementById("tickets-container");
const searchBar = document.getElementById("search-bar");
const filterButtons = document.querySelectorAll(".btn-filter");

// 1. Inicialização do App e Persistência Local (Marco 4)
document.addEventListener("DOMContentLoaded", () => {
  const localData = localStorage.getItem("easyDesk_tickets");
  if (localData) {
    tickets = JSON.parse(localData);
  }
  renderTickets();
});

// Salvar dados no LocalStorage (Marco 4)
function saveToLocalStorage() {
  localStorage.setItem("easyDesk_tickets", JSON.stringify(tickets));
}

// 2. Captura e Registro de Chamados (Marco 1)
ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const solicitante = document.getElementById("solicitante").value;
  const descricao = document.getElementById("descricao").value;
  const prioridade = document.getElementById("prioridade").value;

  // Estrutura de dados do objeto chamado
  const newTicket = {
    id: "CH-" + Math.floor(100000 + Math.random() * 900000), // ID Único Gerado via Código
    solicitante,
    descricao,
    prioridade,
    status: "Pendente", // Status Inicial Padrão
  };

  tickets.push(newTicket); // Método .push() obrigatório
  saveToLocalStorage();
  renderTickets();

  ticketForm.reset(); // Limpa o formulário após registrar
});

// 3. Renderização Dinâmica e Filtragem (Marco 1, Marco 3)
function renderTickets() {
  const searchText = searchBar.value.toLowerCase();

  // Aplicação das regras de filtragem dinâmica utilizando .filter() obrigatório
  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter =
      currentFilter === "Todos" || ticket.status === currentFilter;
    const matchesSearch =
      ticket.solicitante.toLowerCase().includes(searchText) ||
      ticket.descricao.toLowerCase().includes(searchText);
    return matchesFilter && matchesSearch;
  });

  // Injeção dinâmica no DOM utilizando o método .map() obrigatório
  ticketsContainer.innerHTML = filteredTickets
    .map((ticket) => {
      // Formata a classe CSS de status removendo espaços
      const statusClass = ticket.status.replace(" ", "-");

      // Define o próximo estado do fluxo de vida
      let nextStatusText = "";
      if (ticket.status === "Pendente") nextStatusText = "Atender";
      if (ticket.status === "Em Progresso") nextStatusText = "Concluir";

      return `
            <div class="ticket-card ${statusClass}">
                <div>
                    <div class="ticket-header">
                        <span>ID: ${ticket.id}</span>
                        <span class="priority-tag priority-${
                          ticket.prioridade
                        }">${ticket.prioridade}</span>
                    </div>
                    <h3>${ticket.solicitante}</h3>
                    <p>${ticket.descricao}</p>
                </div>
                <div>
                    <div class="ticket-header" style="margin-bottom: 10px;">
                        <strong>Status: ${ticket.status}</strong>
                    </div>
                    <div class="ticket-actions">
                        ${
                          nextStatusText
                            ? `<button class="btn-action btn-status-next" data-id="${ticket.id}">${nextStatusText}</button>`
                            : ""
                        }
                        <button class="btn-action btn-delete" data-id="${
                          ticket.id
                        }">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
}

// 4. Gestão do Ciclo de Vida - Alterar Status e Excluir (Marco 2)
// Usando Event Delegation para capturar cliques nos botões dinâmicos
ticketsContainer.addEventListener("click", (e) => {
  const target = e.target;
  const ticketId = target.getAttribute("data-id");

  if (!ticketId) return;

  if (target.classList.contains("btn-status-next")) {
    // Avança o ciclo de vida do status do chamado
    tickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        if (ticket.status === "Pendente") ticket.status = "Em Progresso";
        else if (ticket.status === "Em Progresso") ticket.status = "Concluído";
      }
      return ticket;
    });
  } else if (target.classList.contains("btn-delete")) {
    // Remove o chamado do array
    tickets = tickets.filter((ticket) => ticket.id !== ticketId);
  }

  saveToLocalStorage();
  renderTickets();
});

// 5. Controles de Filtros e Busca em Tempo Real (Marco 3)
searchBar.addEventListener("input", renderTickets);

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Atualiza estilo do botão ativo
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    // Atualiza filtro e renderiza
    currentFilter = e.target.getAttribute("data-filter");
    renderTickets();
  });
});

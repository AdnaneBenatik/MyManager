// Fonction pour récupérer les clients depuis le localStorage
function recupererClients() {
  const clientsStockes = localStorage.getItem("clients");
  if (clientsStockes) {
    return JSON.parse(clientsStockes);
  }
  return [
    { id: 1, nom: "Adnane", email: "adnane@gmail.com", phone: "0771653316", adresse: "Casablanca" },
  ]; // Si aucun client dans le stockage, on retourne une liste par défaut
}

// Fonction pour sauvegarder les clients dans le localStorage
function sauvegarderClients() {
  localStorage.setItem("clients", JSON.stringify(clients));
}

// Récupérer les clients stockés au début
let clients = recupererClients();

// Fonction pour afficher les clients dans un tableau avec pagination
function afficherClients(page = 1, limite = 5) {
  const tableBody = document.querySelector("#clientsTable tbody");
  tableBody.innerHTML = "";
  const start = (page - 1) * limite;
  const end = start + limite;
  const clientsPage = clients.slice(start, end);

  clientsPage.forEach((client) => {
    const row = `<tr>
      <td>${client.id}</td>
      <td>${client.nom}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>${client.adresse}</td>
      <td>
        <button onclick="voirDetails(${client.id})">Voir détails</button>
        <button onclick="modifierClient(${client.id})">Modifier</button>
        <button onclick="supprimerClient(${client.id})">Supprimer</button>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  afficherPagination(page, limite);
}

// Fonction pour ajouter un client
function ajouterClient() {
  const nom = document.querySelector("#nomClient").value;
  const email = document.querySelector("#emailClient").value;
  const phone = document.querySelector("#phoneClient").value;
  const adresse = document.querySelector("#adresseClient").value;

  const nouveauClient = {
    id: clients.length + 1,
    nom,
    email,
    phone,
    adresse,
  };

  clients.push(nouveauClient);
  sauvegarderClients();  // Sauvegarder après ajout
  afficherClients();
  alert("Client ajouté avec succès !");
}

// Fonction pour afficher les détails d'un client
function voirDetails(id) {
  const client = clients.find((c) => c.id === id);
  if (client) {
    const detailsContainer = document.querySelector("#detailsClient");
    detailsContainer.innerHTML = `<h2>Détails du client</h2>
      <p>ID: ${client.id}</p>
      <p>Nom: ${client.nom}</p>
      <p>Email: ${client.email}</p>
      <p>Téléphone: ${client.phone}</p>
      <p>Adresse: ${client.adresse}</p>
      <button onclick="exporterPDF(${client.id})">Exporter en PDF</button>`;
  }
}

// Fonction pour modifier un client
function modifierClient(id) {
  const client = clients.find((c) => c.id === id);
  if (client) {
    const nom = prompt("Modifier le nom", client.nom);
    const email = prompt("Modifier l'email", client.email);
    const phone = prompt("Modifier le téléphone", client.phone);
    const adresse = prompt("Modifier l'adresse", client.adresse);

    client.nom = nom;
    client.email = email;
    client.phone = phone;
    client.adresse = adresse;

    sauvegarderClients();  // Sauvegarder après modification
    afficherClients();
    alert("Client modifié avec succès !");
  }
}

// Fonction pour supprimer un client
function supprimerClient(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
    clients = clients.filter((c) => c.id !== id);
    sauvegarderClients();  // Sauvegarder après suppression
    afficherClients();
    alert("Client supprimé avec succès !");
  }
}

// Fonction pour exporter les données au format CSV
function exporterCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "ID,Nom,Email,Téléphone,Adresse\n";

  clients.forEach((client) => {
    csvContent += `${client.id},${client.nom},${client.email},${client.phone},${client.adresse}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "clients.csv");
  document.body.appendChild(link);
  link.click();
}

// Fonction pour exporter un client en PDF
function exporterPDF(id) {
  const client = clients.find((c) => c.id === id);
  if (client) {
    const doc = new jsPDF();
    doc.text(
      `Détails du client\n\nID: ${client.id}\nNom: ${client.nom}\nEmail: ${client.email}\nTéléphone: ${client.phone}\nAdresse: ${client.adresse}`,
      10,
      10
    );
    doc.save(`client_${client.id}.pdf`);
  }
}

// Fonction pour afficher la pagination
function afficherPagination(page, limite) {
  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(clients.length / limite);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.className = i === page ? "active" : "";
    button.addEventListener("click", () => afficherClients(i, limite));
    paginationContainer.appendChild(button);
  }
}

// Initialisation
afficherClients();

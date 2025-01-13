// Données simulées stockées dans un fichier JSON local
let factures = [
    { id: 1, client: "John Doe", date: "2025-01-01", montant: 100.50, statut: "Payée" },
  ];
  
  // Fonction pour afficher les factures dans un tableau avec pagination
  function afficherFactures(page = 1, limite = 5) {
    const tableBody = document.querySelector("#facturesTable tbody");
    tableBody.innerHTML = "";
    const start = (page - 1) * limite;
    const end = start + limite;
    const facturesPage = factures.slice(start, end);
  
    facturesPage.forEach((facture) => {
      const row = `<tr>
        <td>${facture.id}</td>
        <td>${facture.client}</td>
        <td>${facture.date}</td>
        <td>${facture.montant} €</td>
        <td>${facture.statut}</td>
        <td>
          <button onclick="voirDetails(${facture.id})">Voir détails</button>
          <button onclick="modifierFacture(${facture.id})">Modifier</button>
          <button onclick="supprimerFacture(${facture.id})">Supprimer</button>
        </td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  
    afficherPagination(page, limite);
  }
  
  // Fonction pour ajouter une facture
  function ajouterFacture() {
    const client = document.querySelector("#clientFacture").value;
    const date = document.querySelector("#dateFacture").value;
    const montant = parseFloat(document.querySelector("#montantFacture").value);
    const statut = document.querySelector("#statutFacture").value;
  
    const nouvelleFacture = {
      id: factures.length + 1,
      client,
      date,
      montant,
      statut,
    };
  
    factures.push(nouvelleFacture);
    afficherFactures();
    alert("Facture ajoutée avec succès !");
  }
  
  // Fonction pour afficher les détails d'une facture
  function voirDetails(id) {
    const facture = factures.find((f) => f.id === id);
    if (facture) {
      const detailsContainer = document.querySelector("#detailsFacture");
      detailsContainer.innerHTML = `<h2>Détails de la facture</h2>
        <p>ID: ${facture.id}</p>
        <p>Client: ${facture.client}</p>
        <p>Date: ${facture.date}</p>
        <p>Montant: ${facture.montant} €</p>
        <p>Statut: ${facture.statut}</p>
        <button onclick="exporterPDF(${facture.id})">Exporter en PDF</button>`;
    }
  }
  
  // Fonction pour modifier une facture
  function modifierFacture(id) {
    const facture = factures.find((f) => f.id === id);
    if (facture) {
      const client = prompt("Modifier le client", facture.client);
      const date = prompt("Modifier la date", facture.date);
      const montant = parseFloat(prompt("Modifier le montant", facture.montant));
      const statut = prompt("Modifier le statut", facture.statut);
  
      facture.client = client;
      facture.date = date;
      facture.montant = montant;
      facture.statut = statut;
  
      afficherFactures();
      alert("Facture modifiée avec succès !");
    }
  }
  
  // Fonction pour supprimer une facture
  function supprimerFacture(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      factures = factures.filter((f) => f.id !== id);
      afficherFactures();
      alert("Facture supprimée avec succès !");
    }
  }
  
  // Fonction pour exporter les données au format CSV
  function exporterCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Client,Date,Montant,Statut\n";
  
    factures.forEach((facture) => {
      csvContent += `${facture.id},${facture.client},${facture.date},${facture.montant},${facture.statut}\n`;
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "factures.csv");
    document.body.appendChild(link);
    link.click();
  }
  
  // Fonction pour exporter une facture en PDF
  function exporterPDF(id) {
    const facture = factures.find((f) => f.id === id);
    if (facture) {
      const doc = new jsPDF();
      doc.text(
        `Détails de la facture\n\nID: ${facture.id}\nClient: ${facture.client}\nDate: ${facture.date}\nMontant: ${facture.montant} €\nStatut: ${facture.statut}`,
        10,
        10
      );
      doc.save(`facture_${facture.id}.pdf`);
    }
  }
  
  // Fonction pour afficher la pagination
  function afficherPagination(page, limite) {
    const paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(factures.length / limite);
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.className = i === page ? "active" : "";
      button.addEventListener("click", () => afficherFactures(i, limite));
      paginationContainer.appendChild(button);
    }
  }
  
  // Initialisation
  afficherFactures();
  
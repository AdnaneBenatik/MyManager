// Récupérer les données de LocalStorage
function chargerCommandesDepuisLocalStorage() {
    const data = localStorage.getItem("commandes");
    return data ? JSON.parse(data) : [];
}

// Enregistrer les données dans LocalStorage
function sauvegarderCommandesDansLocalStorage() {
    localStorage.setItem("commandes", JSON.stringify(commandes));
}

// Données simulées pour les commandes
let commandes = chargerCommandesDepuisLocalStorage();

// Fonction pour afficher les commandes dans un tableau avec pagination
function afficherCommandes(page = 1, limite = 5) {
    const tableBody = document.querySelector("#order-table-body");
    tableBody.innerHTML = "";
    const start = (page - 1) * limite;
    const end = start + limite;
    const commandesPage = commandes.slice(start, end);

    commandesPage.forEach((commande) => {
        const row = `<tr>
            <td>${commande.id}</td>
            <td>${commande.produit}</td>
            <td>${commande.date}</td>
            <td>${commande.statut}</td>
            <td>${commande.montant.toFixed(2)} €</td>
            <td><button onclick="voirDetailsCommande(${commande.id})">Voir détails</button></td>
            <td>
                <button onclick="modifierCommande(${commande.id})">Modifier</button>
                <button onclick="supprimerCommande(${commande.id})">Supprimer</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    afficherPaginationCommandes(page, limite);
}

// Fonction pour ajouter une commande
function ajouterCommande(event) {
    event.preventDefault();
    const produit = document.querySelector("#Produit").value;
    const date = document.querySelector("#orderDate").value;
    const statut = document.querySelector("#status").value;
    const montant = parseFloat(document.querySelector("#amount").value);

    const nouvelleCommande = {
        id: commandes.length > 0 ? commandes[commandes.length - 1].id + 1 : 1,
        produit,
        date,
        statut,
        montant,
    };

    commandes.push(nouvelleCommande);
    sauvegarderCommandesDansLocalStorage(); // Sauvegarder les données
    afficherCommandes();
    alert("Commande ajoutée avec succès !");
    event.target.reset(); // Réinitialise le formulaire
}

// Fonction pour afficher les détails d'une commande
function voirDetailsCommande(id) {
    const commande = commandes.find((c) => c.id === id);
    if (commande) {
        const detailsContainer = document.querySelector("#delete-confirmation");
        detailsContainer.innerHTML = `
            <h2>Détails de la commande</h2>
            <p>ID: ${commande.id}</p>
            <p>Produit: ${commande.produit}</p>
            <p>Date: ${commande.date}</p>
            <p>Statut: ${commande.statut}</p>
            <p>Montant: ${commande.montant.toFixed(2)} €</p>
            <button onclick="exporterPDFCommande(${commande.id})">Exporter en PDF</button>`;
        detailsContainer.style.display = "block";
    }
}

// Fonction pour modifier une commande
function modifierCommande(id) {
    const commande = commandes.find((c) => c.id === id);
    if (commande) {
        const produit = prompt("Modifier le produit", commande.produit);
        const date = prompt("Modifier la date", commande.date);
        const statut = prompt("Modifier le statut", commande.statut);
        const montant = parseFloat(prompt("Modifier le montant", commande.montant));

        commande.produit = produit || commande.produit;
        commande.date = date || commande.date;
        commande.statut = statut || commande.statut;
        commande.montant = montant || commande.montant;

        sauvegarderCommandesDansLocalStorage(); // Sauvegarder les données
        afficherCommandes();
        alert("Commande modifiée avec succès !");
    }
}

// Fonction pour supprimer une commande
function supprimerCommande(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
        commandes = commandes.filter((c) => c.id !== id);
        sauvegarderCommandesDansLocalStorage(); // Sauvegarder les données
        afficherCommandes();
        alert("Commande supprimée avec succès !");
    }
}

// Fonction pour exporter les commandes au format CSV
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Produit,Date,Statut,Montant\n";

    commandes.forEach((commande) => {
        csvContent += `${commande.id},${commande.produit},${commande.date},${commande.statut},${commande.montant.toFixed(2)}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "commandes.csv");
    document.body.appendChild(link);
    link.click();
}

// Fonction pour exporter une commande en PDF
function exporterPDFCommande(id) {
    const commande = commandes.find((c) => c.id === id);
    if (commande) {
        const doc = new jsPDF();
        doc.text(
            `Détails de la commande\n\nID: ${commande.id}\nProduit: ${commande.produit}\nDate: ${commande.date}\nStatut: ${commande.statut}\nMontant: ${commande.montant.toFixed(2)} €`,
            10,
            10
        );
        doc.save(`commande_${commande.id}.pdf`);
    }
}

// Fonction pour afficher la pagination
function afficherPaginationCommandes(page, limite) {
    const paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(commandes.length / limite);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.className = i === page ? "active" : "";
        button.addEventListener("click", () => afficherCommandes(i, limite));
        paginationContainer.appendChild(button);
    }
}

// Initialisation
document.querySelector("#add-order-form").addEventListener("submit", ajouterCommande);
afficherCommandes();

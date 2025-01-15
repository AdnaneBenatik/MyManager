// Charger les produits depuis le localStorage
let produits = JSON.parse(localStorage.getItem('produits')) || [
  { id: 1, nom: "Produit A", prix: 20, categorie: "Catégorie 1", stock: 50 },
];

// Fonction pour afficher les produits dans un tableau avec pagination
function afficherProduits(page = 1, limite = 5) {
  const tableBody = document.querySelector("#produitsTable tbody");
  tableBody.innerHTML = "";
  const start = (page - 1) * limite;
  const end = start + limite;
  const produitsPage = produits.slice(start, end);

  produitsPage.forEach((produit) => {
      const row = `<tr>
          <td>${produit.id}</td>
          <td>${produit.nom}</td>
          <td>${produit.prix} €</td>
          <td>${produit.categorie}</td>
          <td>${produit.stock}</td>
          <td>
              <button onclick="voirDetails(${produit.id})">Voir détails</button>
              <button onclick="modifierProduit(${produit.id})">Modifier</button>
              <button onclick="supprimerProduit(${produit.id})">Supprimer</button>
          </td>
      </tr>`;
      tableBody.innerHTML += row;
  });

  afficherPagination(page, limite);
}

// Fonction pour ajouter un produit
function ajouterProduit() {
  const nom = document.querySelector("#nomProduit").value;
  const prix = parseFloat(document.querySelector("#prixProduit").value);
  const categorie = document.querySelector("#categorieProduit").value;
  const stock = parseInt(document.querySelector("#stockProduit").value);

  const nouveauProduit = {
      id: produits.length + 1,
      nom,
      prix,
      categorie,
      stock,
  };

  produits.push(nouveauProduit);
  localStorage.setItem('produits', JSON.stringify(produits)); // Sauvegarder dans localStorage
  afficherProduits();
  alert("Produit ajouté avec succès !");
}

// Fonction pour afficher les détails d'un produit
function voirDetails(id) {
  const produit = produits.find((p) => p.id === id);
  if (produit) {
      const detailsContainer = document.querySelector("#detailsProduit");
      detailsContainer.innerHTML = `<h2>Détails du produit</h2>
          <p>ID: ${produit.id}</p>
          <p>Nom: ${produit.nom}</p>
          <p>Prix: ${produit.prix} €</p>
          <p>Catégorie: ${produit.categorie}</p>
          <p>Stock: ${produit.stock}</p>
          <button onclick="exporterPDF(${produit.id})">Exporter en PDF</button>`;
  }
}

// Fonction pour modifier un produit
function modifierProduit(id) {
  const produit = produits.find((p) => p.id === id);
  if (produit) {
      const nom = prompt("Modifier le nom", produit.nom);
      const prix = parseFloat(prompt("Modifier le prix", produit.prix));
      const categorie = prompt("Modifier la catégorie", produit.categorie);
      const stock = parseInt(prompt("Modifier le stock", produit.stock));

      produit.nom = nom;
      produit.prix = prix;
      produit.categorie = categorie;
      produit.stock = stock;

      localStorage.setItem('produits', JSON.stringify(produits)); // Sauvegarder dans localStorage
      afficherProduits();
      alert("Produit modifié avec succès !");
  }
}

// Fonction pour supprimer un produit
function supprimerProduit(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      produits = produits.filter((p) => p.id !== id);
      localStorage.setItem('produits', JSON.stringify(produits)); // Sauvegarder dans localStorage
      afficherProduits();
      alert("Produit supprimé avec succès !");
  }
}

// Fonction pour exporter les données au format CSV
function exporterCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "ID,Nom,Prix,Catégorie,Stock\n";

  produits.forEach((produit) => {
      csvContent += `${produit.id},${produit.nom},${produit.prix},${produit.categorie},${produit.stock}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "produits.csv");
  document.body.appendChild(link);
  link.click();
}

// Fonction pour exporter un produit en PDF
function exporterPDF(id) {
  const produit = produits.find((p) => p.id === id);
  if (produit) {
      const doc = new jsPDF();
      doc.text(
          `Détails du produit\n\nID: ${produit.id}\nNom: ${produit.nom}\nPrix: ${produit.prix} €\nCatégorie: ${produit.categorie}\nStock: ${produit.stock}`,
          10,
          10
      );
      doc.save(`produit_${produit.id}.pdf`);
  }
}

// Fonction pour afficher la pagination
function afficherPagination(page, limite) {
  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(produits.length / limite);

  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.className = i === page ? "active" : "";
      button.addEventListener("click", () => afficherProduits(i, limite));
      paginationContainer.appendChild(button);
  }
}

// Initialisation
afficherProduits();

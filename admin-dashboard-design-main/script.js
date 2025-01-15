// Sélection des éléments DOM
const toggleMenu = document.querySelector(".toggle-menu");
const sidebar = document.querySelector(".sidebar");
const mainContainer = document.querySelector(".main-container");
const backdropFilter = document.querySelector(".backdrop-filter");

// Données pour le graphique en barres
var barChartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai'], // Étiquettes sur l'axe X
  datasets: [{
    label: 'Ventes par mois', // Légende du graphique
    data: [12, 19, 3, 5, 2], // Données des ventes
    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond des barres
    borderColor: 'rgba(75, 192, 192, 1)', // Couleur des bordures
    borderWidth: 1 // Épaisseur des bordures
  }]
};

// Initialisation du graphique à barres (bar chart)
var ctxBar = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(ctxBar, {
  type: 'bar',
  data: barChartData,
  options: {
    scales: {
      y: {
        beginAtZero: true // Commencer l'axe Y à zéro
      }
    }
  }
});

// Données pour le graphique en secteur
var pieXValues = ["Livré", "Annulé", "En attente", "Retourné"];
var pieYValues = [1754, 656, 889, 480];
var pieColors = [
  "rgb(92, 103, 247)",
  "rgb(227, 84, 212)",
  "rgb(255, 93, 159)",
  "rgb(255, 142, 111)",
];

// Création du graphique en secteur (pie chart)
new Chart("pieChart", {
  type: "pie", 
  data: {
    labels: pieXValues,
    datasets: [
      {
        backgroundColor: pieColors,
        data: pieYValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Commandes Totales: 3000",
    },
  },
});


// Fonction pour basculer les éléments du menu
const toggleItems = () => {
  sidebar.classList.toggle("active");
  mainContainer.classList.toggle("active");
  backdropFilter.classList.toggle("active");
};

// Gestion des clics pour basculer le menu
toggleMenu.addEventListener("click", toggleItems);
backdropFilter.addEventListener("click", toggleItems);

// Gestion des redirections pour le menu latéral
const usersLink = document.querySelector("#link-users");
const productsLink = document.querySelector("#link-products");
const ordersLink = document.querySelector("#link-orders");
const clientsLink = document.querySelector("#link-clients");
const invoicesLink = document.querySelector("#link-invoices");

// Load recent customers from localStorage and populate the table
function loadRecentCustomers() {
  // Retrieve customers from localStorage (or an empty array if none exist)
  const clients = JSON.parse(localStorage.getItem('clients')) || [];

  const recentCustomerTable = document.getElementById('recentCustomerTable').getElementsByTagName('tbody')[0];
  recentCustomerTable.innerHTML = '';  // Clear any existing rows

  // Loop through the customers and create rows for each
  clients.forEach(client => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>
              <div>
                  <h4>${client.nom} <br>
              </div>
          </td>
          <td>
              <div>
                   <h4>${client.email} <br>
              </div>
          </td>
          <td>
              <div>
                  <h4>${client.phone} <br>
              </div>
          </td>
          <td>
              <div>
                  <h4>${client.adresse} <br>
              </div>
          </td>
          
      `;
      recentCustomerTable.appendChild(newRow);
  });
}

// Call the function when the page is loaded
window.onload = function() {
  loadRecentCustomers();

};

// Gestionnaires d'événements pour redirections
usersLink.addEventListener("click", () => {
  window.location.href = "aide.html"; // Chemin pour l'aide
});

productsLink.addEventListener("click", () => {
  window.location.href = "produits.html"; // Chemin pour les produits
});

ordersLink.addEventListener("click", () => {
  window.location.href = "commandes.html"; // Chemin pour les commandes
});

clientsLink.addEventListener("click", () => {
  window.location.href = "clients.html"; // Chemin pour les clients
});

invoicesLink.addEventListener("click", () => {
  window.location.href = "factures.html"; // Chemin pour les factures
});
// Apply Dark Mode on Page Load

// Check if dark mode is enabled in localStorage
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Toggle dark mode on click
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    const isDarkModeEnabled = document.body.classList.contains('dark-mode');
    toggleDarkMode(!isDarkModeEnabled); // Toggle the dark mode state
});

// Function to enable/disable dark mode
function toggleDarkMode(enable) {
    if (enable) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled'); // Save the setting
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled'); // Save the setting
    }
}




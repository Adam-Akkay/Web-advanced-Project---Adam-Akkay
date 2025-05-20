const apiUrl = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';

let championsData = [];
let filteredChampions = [];

async function fetchChampions() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  championsData = Object.values(data.data);  // Haal de kampioenen uit de API-respons
  filteredChampions = championsData;  // Initieel tonen we alle kampioenen
  displayChampions(filteredChampions);
}

function displayChampions(champions) {
  const sortOrder = document.getElementById('sortOrder').value;
  const sortedChampions = sortChampions([...champions], sortOrder);

  const championListDiv = document.getElementById('champion-list');
  championListDiv.innerHTML = ''; // Leeg de lijst eerst

  sortedChampions.forEach(champion => {
    const championDiv = document.createElement('div');
    championDiv.textContent = champion.name;
    championDiv.style.cursor = 'pointer'; 

    championDiv.addEventListener('click', () => {
      displayChampionInfo(champion);
    });
    championListDiv.appendChild(championDiv);
  });
}


function displayChampionInfo(champion) {
  const championInfoDiv = document.getElementById('champion-info');
  championInfoDiv.innerHTML = `<h3>${champion.name}</h3><p>${champion.title}</p>`;

  // opmaak 6 kolommen
  const championRow = document.createElement('div');
  championRow.classList.add('champion-row');
  championRow.style.display = "flex";  

  // kolom 1: Naam
  const nameColumn = document.createElement('div');
  nameColumn.classList.add('champion-column');
  nameColumn.innerHTML = `<h3>Naam</h3><p>${champion.name}</p>`;
  championRow.appendChild(nameColumn);
  // kolom 2: Titel
  const titleColumn = document.createElement('div');
  titleColumn.classList.add('champion-column');
  titleColumn.innerHTML = `<h3>Titel</h3><p>${champion.title}</p>`;
  championRow.appendChild(titleColumn);
  // kolom 3: Rol
  const tagsColumn = document.createElement('div');
  tagsColumn.classList.add('champion-column');
  tagsColumn.innerHTML = `<h3>Rol</h3><p>${champion.tags.join(', ')}</p>`;
  championRow.appendChild(tagsColumn);
  // kolom 4: HP (Health Points)
  const healthColumn = document.createElement('div');
  healthColumn.classList.add('champion-column');
  healthColumn.innerHTML = `<h3>HP</h3><p>${champion.stats.hp}</p>`;
  championRow.appendChild(healthColumn);
  // kolom 5 : Aanvalschade
  const attackDamageColumn = document.createElement('div');
  attackDamageColumn.classList.add('champion-column');
  attackDamageColumn.innerHTML = `<h3>Aanval Schade</h3><p>${champion.stats.attackdamage}</p>`;
  championRow.appendChild(attackDamageColumn);
  // kolom 6: Afbeelding
  const imageColumn = document.createElement('div');
  imageColumn.classList.add('champion-column');
  imageColumn.innerHTML = `<h3>Afbeelding</h3><img src="http://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.id}.png" alt="${champion.name}">`;
  championRow.appendChild(imageColumn);

  championInfoDiv.appendChild(championRow);
}

// filter functie
function applyFilters() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const roleFilter = document.getElementById('roleFilter').value;
  const healthFilter = document.getElementById('healthFilter').value;
  const sortOrder = document.getElementById('sortOrder').value;

  let filtered = championsData.filter(champion => champion.name.toLowerCase().includes(searchTerm));

  if (roleFilter) {
    filtered = filtered.filter(champion => champion.tags.includes(roleFilter));
  }

  if (healthFilter) {
    filtered = filtered.filter(champion => champion.stats.hp >= parseInt(healthFilter));
  }

  filtered = sortChampions(filtered, sortOrder);
  filteredChampions = filtered;
  displayChampions(filtered);
}

// Sorteer functie
function sortChampions(champions, order) {
  return champions.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (order === 'az') return nameA.localeCompare(nameB);
    else if (order === 'za') return nameB.localeCompare(nameA);
    return 0;
  });
}

function filterChampions(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = championsData.filter(champion => champion.name.toLowerCase().includes(searchTerm));
  
  applyFilters(filtered);
}


const searchInput = document.getElementById('search');
const titleDefault = document.getElementById('title-default');
const titleSearch = document.getElementById('title-search');

document.getElementById('search').addEventListener('input', () => {
  if (document.getElementById('search').value.trim() === '') {
    titleDefault.style.display = 'block';
    titleSearch.style.display = 'none';
  } else {
    titleDefault.style.display = 'none';
    titleSearch.style.display = 'block';
  }
});



document.getElementById('search').addEventListener('input', filterChampions);
document.getElementById('sortOrder').addEventListener('change', () => displayChampions(filteredChampions));
document.getElementById('roleFilter').addEventListener('change', () => applyFilters(filteredChampions));
document.getElementById('healthFilter').addEventListener('input', () => applyFilters(filteredChampions));


fetchChampions();

// () => applyFilters(filteredChampions)
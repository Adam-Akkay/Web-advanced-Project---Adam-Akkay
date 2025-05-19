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
  const championListDiv = document.getElementById('champion-list');
  championListDiv.innerHTML = ''; // Leeg de lijst eerst

  champions.forEach(champion => {
    const championDiv = document.createElement('div');
    championDiv.textContent = champion.name;
    championDiv.style.cursor = 'pointer';
    championDiv.addEventListener('click', () => {
      displayChampionInfo(champion);
    });
    championListDiv.appendChild(championDiv);
  });
}

function filterChampions(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = championsData.filter(champion => champion.name.toLowerCase().includes(searchTerm));
  displayChampions(filtered);
}

function displayChampionInfo(champion) {
  const championInfoDiv = document.getElementById('champion-info');
  championInfoDiv.innerHTML = `<h3>${champion.name}</h3><p>${champion.title}</p>`;
}

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

function sortChampions(champions, order) {
  return champions.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (order === 'az') return nameA.localeCompare(nameB);
    else if (order === 'za') return nameB.localeCompare(nameA);
    return 0;
  });
}

function filterChampions() {
  applyFilters();
}

// Pas in fetchChampions() toe:
async function fetchChampions() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  championsData = Object.values(data.data);
  filteredChampions = [...championsData];
  displayChampions(championsData);
}


document.getElementById('search').addEventListener('input', filterChampions);
document.getElementById('sortOrder').addEventListener('change', applyFilters);
document.getElementById('roleFilter').addEventListener('change', applyFilters);
document.getElementById('healthFilter').addEventListener('input', applyFilters);


fetchChampions();

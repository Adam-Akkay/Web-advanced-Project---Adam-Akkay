const apiUrl = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';

let championsData = [];

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

document.getElementById('search').addEventListener('input', filterChampions);

fetchChampions();

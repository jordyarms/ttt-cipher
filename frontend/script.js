async function fetchPatterns() {
  const response = await fetch("tictactoecypher.json"); // Adjust the path if needed
  return await response.json();
}

function renderPatterns(patterns) {
  const patternsGrid = document.getElementById("patternsGrid");
  patternsGrid.innerHTML = "";

  patterns.forEach((patternData) => {
    const card = document.createElement("div");
    card.classList.add("pattern-card");

    const header = document.createElement("div");
    header.classList.add("pattern-header");
    const alias = document.createElement("span");
    alias.textContent = `Alias: ${patternData.alias}` || "N/A";
    const id = document.createElement("span");
    id.textContent = `ID: ${patternData.id}`;
    header.appendChild(alias);
    header.appendChild(id);

    const grid = document.createElement("div");
    grid.classList.add("pattern-grid");

    patternData.pattern.forEach((row) => {
      row.forEach((cell) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("pattern-cell", cell === 1 ? "x" : "o");
        cellDiv.textContent = cell === 1 ? "X" : "O";
        grid.appendChild(cellDiv);
      });
    });

    const metadata = document.createElement("div");
    metadata.classList.add("metadata");
    metadata.innerHTML = `
          M: ${patternData.middle}, C#: ${patternData.corners}, E#: ${patternData.edge}
      `;

    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("tags");
    patternData.tags.forEach((tag) => {
      const tagDiv = document.createElement("div");
      tagDiv.classList.add("tag");
      tagDiv.textContent = tag;
      tagsContainer.appendChild(tagDiv);
    });

    card.appendChild(header);
    card.appendChild(grid);
    card.appendChild(metadata);
    card.appendChild(tagsContainer);

    patternsGrid.appendChild(card);
  });
}

function renderFilters(tags, patterns) {
  const filterContainer = document.getElementById("filterContainer");
  filterContainer.innerHTML = "Filter:";

  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");

  const select = document.createElement("select");
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "Show All";
  select.appendChild(allOption);

  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    select.appendChild(option);
  });

  select.onchange = (event) => {
    const selectedTag = event.target.value;
    if (selectedTag === "") {
      renderPatterns(patterns);
    } else {
      const filtered = patterns.filter((p) => p.tags.includes(selectedTag));
      renderPatterns(filtered);
    }
  };

  dropdown.appendChild(select);
  filterContainer.appendChild(dropdown);
}

async function init() {
  const patterns = await fetchPatterns();

  const tags = new Set();
  patterns.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));

  renderFilters([...tags], patterns);
  renderPatterns(patterns);
}

init();

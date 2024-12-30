async function fetchIndex() {
  const response = await fetch("raidialIndex.json");
  return await response.json();
}

function createPatternCard(patternData) {
  // const card = document.createElement("div");
  // card.classList.add("pattern-card");

  // const grid = document.createElement("div");
  // grid.classList.add("pattern-grid");

  // patternData.pattern.forEach((row) => {
  //   row.forEach((cell) => {
  //     const cellDiv = document.createElement("div");
  //     cellDiv.classList.add("pattern-cell", cell === 1 ? "x" : "o");
  //     cellDiv.textContent = cell === 1 ? "X" : "O";
  //     grid.appendChild(cellDiv);
  //   });
  // });

  // const alias = document.createElement("p");
  // alias.textContent = `Alias: ${patternData.alias}`;

  // card.appendChild(grid);
  // card.appendChild(alias);
  // return card;

  // New

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

  card.appendChild(header);
  card.appendChild(grid);

  return card;
}

async function init() {
  const tableBody = document.getElementById("table-body");
  const output = document.getElementById("output");
  const patternsContainer = document.getElementById("patternsContainer");

  const radialIndex = await fetchIndex();

  // Populate the main encoding table dynamically
  for (const [direction, values] of Object.entries(radialIndex)) {
    const row = document.createElement("tr");

    // Add direction as the first column
    const directionCell = document.createElement("td");
    directionCell.textContent = direction;
    row.appendChild(directionCell);

    // Add index values as the remaining columns
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      cell.dataset.direction = direction; // Store direction for reference
      cell.dataset.index = index; // Store index for reference
      cell.onclick = () => {
        const encoding = `${cell.dataset.direction}[${cell.dataset.index}]`;
        output.textContent = `The encoding for "${value}" is: ${encoding}`;
        displayPatterns(encoding, parseInt(cell.dataset.index, 10));
      };
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  }

  // Fetch and display patterns dynamically
  async function fetchPatterns() {
    const response = await fetch("tictactoecypher.json");
    return await response.json();
  }

  async function displayPatterns(encoding, index) {
    const patterns = await fetchPatterns();
    patternsContainer.innerHTML = ""; // Clear existing patterns

    // Group patterns by type
    const cdPatterns = patterns.filter((p) => p.CD === encoding.split("[")[0]);
    const numPatterns = patterns.filter(
      (p) => p.num !== undefined && p.num === index
    );

    // Display patterns by CD property
    if (cdPatterns.length > 0) {
      const cdGroup = document.createElement("div");
      cdGroup.classList.add("pattern-group");
      cdGroup.innerHTML = "";

      cdPatterns.forEach((patternData) => {
        const card = createPatternCard(patternData);
        cdGroup.appendChild(card);
      });

      patternsContainer.appendChild(cdGroup);
    }

    // Display patterns by num value
    if (numPatterns.length > 0) {
      const numGroup = document.createElement("div");
      numGroup.classList.add("pattern-group");
      numGroup.innerHTML = "";

      numPatterns.forEach((patternData) => {
        const card = createPatternCard(patternData);
        numGroup.appendChild(card);
      });

      patternsContainer.appendChild(numGroup);
    }
  }
}

init();

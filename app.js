// Data for detailed popups
const POPUPS = {
  centro: {
    title: "☸️ Las Cuatro Nobles Verdades",
    sub: "El primer discurso del Buda — la base de todo el Dharma",
    color: "var(--color-centro)",
    body: [
      "Son el punto de partida de toda enseñanza budista, pronunciadas por Siddhartha Gautama en el Parque de los Ciervos en Sarnath.",
      [
        ["1. Dukkha (Sufrimiento):", "La existencia conlleva insatisfacción, sufrimiento, imperfección."],
        ["2. Samudaya (Origen):", "El sufrimiento surge del deseo, el apego y la ignorancia."],
        ["3. Nirodha (Cesación):", "El sufrimiento puede cesar — esto es Nirvana."],
        ["4. Magga (El camino):", "El Óctuple Noble Sendero es la vía hacia esa cesación."]
      ],
      "Todo lo demás en el mapa —el Sendero, las Paramitas, las Inconmensurables— son desarrollos y ampliaciones de estas cuatro verdades."
    ]
  },
  sendero: {
    title: "🛤️ El Óctuple Noble Sendero",
    sub: "Magga — La cuarta noble verdad en detalle",
    color: "var(--color-sendero)",
    body: [
      "El sendero se divide en tres grandes grupos que se nutren mutuamente:",
      [
        ["PRAJNA — Sabiduría", ""],
        ["1. Visión correcta (Samma ditthi):", "Comprender las 4 Nobles Verdades, la impermanencia, el karma."],
        ["2. Intención correcta (Samma sankappa):", "Intención de renuncia, buena voluntad y no-daño."],
        ["SILA — Ética", ""],
        ["3. Habla correcta:", "Verdad, palabras amables, no chisme ni habla divisiva."],
        ["4. Acción correcta:", "No matar, no robar, conducta sexual responsable."],
        ["5. Sustento correcto:", "Ganarse la vida sin causar daño."],
        ["SAMADHI — Concentración", ""],
        ["6. Esfuerzo correcto:", "Cultivar estados hábiles, abandonar los no hábiles."],
        ["7. Atención correcta (Sati):", "Mindfulness del cuerpo, sensaciones, mente y objetos mentales."],
        ["8. Concentración correcta:", "Los cuatro jhanas — estados de absorción meditativa."]
      ]
    ],
    link: { href: "octuple-noble-sendero.html", label: "📖 Recorre la guía completa del Óctuple Sendero →" }
  },
  paramitas: {
    title: "✨ Las Seis Paramitas",
    sub: "Perfecciones del Bodhisattva — tradición Mahayana",
    color: "var(--color-paramitas)",
    body: [
      "Las paramitas son las perfecciones que cultiva un Bodhisattva —alguien que aspira a la iluminación para beneficio de todos los seres.",
      [
        ["1. Dana (Generosidad):", "Dar sin apego al resultado — material, tiempo, Dharma."],
        ["2. Sila (Ética):", "Conducta moral, los preceptos. Paralela a pasos 3-5 del Sendero."],
        ["3. Kshanti (Paciencia):", "Aguantar el daño sin reactividad, con comprensión."],
        ["4. Virya (Esfuerzo):", "Perseverancia gozosa en el camino. Paralela al paso 6."],
        ["5. Dhyana (Meditación):", "Absorción meditativa. Paralela a pasos 7-8."],
        ["6. Prajna (Sabiduría):", "Comprensión directa de la vacuidad (sunyata). Paralela a pasos 1-2."]
      ],
      "Las paramitas son la respuesta Mahayana a: ¿cómo practico el sendero por el bien de todos?"
    ]
  },
  inconm: {
    title: "💗 Las 4 Inconmensurables",
    sub: "Brahmaviharas — Las cuatro moradas divinas",
    color: "var(--color-inconm)",
    body: [
      "Son estados del corazón ilimitados e inconmensurables porque se extienden hacia todos los seres sin excepción.",
      [
        ["1. Metta (Amor bondadoso):", "El deseo genuino de que todos los seres sean felices. Antídoto del odio."],
        ["2. Karuna (Compasión):", "El deseo de que todos los seres estén libres del sufrimiento. Antídoto de la crueldad."],
        ["3. Mudita (Alegría empática):", "Alegrarse sinceramente por el bienestar de otros. Antídoto de la envidia."],
        ["4. Upekkha (Ecuanimidad):", "Equilibrio sereno ante el placer y el dolor. Antídoto del apego y el rechazo."]
      ],
      "La Intención Correcta (paso 2) es esencialmente Metta y Karuna. Sin estos estados del corazón, el sendero se vuelve árido y rígido."
    ]
  },
  joyas: {
    title: "💎 Las Tres Joyas",
    sub: "El Triple Refugio — fundamento de la práctica budista",
    color: "var(--color-joyas)",
    body: [
      "Tomar refugio en las Tres Joyas es el acto que convierte a alguien en budista. Son la orientación del practicante.",
      [
        ["Buda:", "El maestro despierto — tanto el Buda histórico como el principio de la iluminación que todos podemos realizar."],
        ["Dharma:", "Las enseñanzas — todo el mapa es Dharma."],
        ["Sangha:", "La comunidad de practicantes — los compañeros del camino."]
      ],
      "Las Tres Joyas son el contexto dentro del cual todo lo demás tiene sentido."
    ]
  },
  marcas: {
    title: "🌀 Las Tres Marcas de la Existencia",
    sub: "Trilakshana — Lo que toda experiencia tiene en común",
    color: "var(--color-marcas)",
    body: [
      "Son las tres características que el Buda observó en toda experiencia condicionada:",
      [
        ["Anicca (Impermanencia):", "Todo fenómeno surge y perece. Nada dura. Resistir esto genera sufrimiento."],
        ["Dukkha (Insatisfacción):", "Lo impermanente no puede darnos satisfacción duradera."],
        ["Anatta (No-yo):", "No hay un yo fijo, permanente e independiente. Los fenómenos surgen en interdependencia."]
      ],
      "La Visión Correcta (paso 1) es comprender estas tres marcas. La Prajna paramita es su realización directa."
    ]
  }
};

// Connections configuration (Key relationship mapping)
const connections = [
  // Core structure (Centro to everything)
  { from: "centro", to: "joyas", type: "core" },
  { from: "centro", to: "marcas", type: "core" },
  { from: "centro", to: "paramitas", type: "core" },
  { from: "centro", to: "inconm", type: "core" },
  { from: "centro", to: "sendero", type: "core" },

  // Key relations
  { id: "rel-sendero-paramitas", from: "sendero", to: "paramitas", type: "relation" },
  { id: "rel-sendero-inconm", from: "sendero", to: "inconm", type: "relation" },
  { id: "rel-paramitas-inconm", from: "paramitas", to: "inconm", type: "relation" },
  { id: "rel-centro-joyas", from: "centro", to: "joyas", type: "relation" }
];

document.addEventListener("DOMContentLoaded", () => {
  setupInteractiveNodes();
  setupModal();
  setupRelationsPanel();
  
  // Draw connection lines on load and resize
  setTimeout(drawConnections, 100);
  window.addEventListener("resize", drawConnections);
});

// Setup click events on node cards
function setupInteractiveNodes() {
  const nodes = document.querySelectorAll("[data-node-id]");
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const nodeId = node.getAttribute("data-node-id");
      openModal(nodeId);
    });
  });
}

// Modal handling logic
function setupModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");
  
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  
  // ESC key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeModal();
    }
  });
}

function openModal(id) {
  const d = POPUPS[id];
  if (!d) return;
  
  const overlay = document.getElementById("modalOverlay");
  const title = document.getElementById("modalTitle");
  const subtitle = document.getElementById("modalSubtitle");
  const body = document.getElementById("modalBody");
  const content = overlay.querySelector(".modal-content");
  
  // Set modal border color to match node theme
  content.style.borderColor = d.color;
  title.style.color = d.color;
  
  // Set content
  title.textContent = d.title;
  subtitle.textContent = d.sub;
  
  // Clear body
  body.innerHTML = "";
  
  // Build content dynamically
  d.body.forEach(block => {
    if (typeof block === "string") {
      const p = document.createElement("p");
      p.textContent = block;
      body.appendChild(p);
    } else if (Array.isArray(block)) {
      const ul = document.createElement("ul");
      block.forEach(([label, text]) => {
        const li = document.createElement("li");
        
        const strong = document.createElement("strong");
        strong.style.color = d.color;
        strong.textContent = label;
        li.appendChild(strong);
        
        if (text) {
          const span = document.createElement("span");
          span.textContent = " " + text;
          li.appendChild(span);
        }
        
        ul.appendChild(li);
      });
      body.appendChild(ul);
    }
  });

  // Optional contextual link to a deeper resource
  if (d.link) {
    const a = document.createElement("a");
    a.className = "modal-link";
    a.href = d.link.href;
    a.textContent = d.link.label;
    a.style.setProperty("--link-color", d.color);
    body.appendChild(a);
  }

  // Open with class transition
  overlay.classList.add("open");
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
}

// Draw dynamic connection paths between cards using SVG
function drawConnections() {
  const svg = document.getElementById("connectionsSvg");
  const viewport = document.querySelector(".map-viewport");
  
  if (!svg || !viewport) return;
  
  // Clear old paths (keep placeholder/definition tags if any, but we overwrite anyway)
  svg.innerHTML = "";
  
  // Only draw curves in large desktop grid layout (viewport width > 1023px)
  if (window.innerWidth <= 1023) {
    return;
  }
  
  const viewportRect = viewport.getBoundingClientRect();
  
  connections.forEach(conn => {
    const fromNode = document.querySelector(`[data-node-id="${conn.from}"]`);
    const toNode = document.querySelector(`[data-node-id="${conn.to}"]`);
    
    if (!fromNode || !toNode) return;
    
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
    
    // Get center points relative to the viewport
    const x1 = (fromRect.left + fromRect.width / 2) - viewportRect.left;
    const y1 = (fromRect.top + fromRect.height / 2) - viewportRect.top;
    
    const x2 = (toRect.left + toRect.width / 2) - viewportRect.left;
    const y2 = (toRect.top + toRect.height / 2) - viewportRect.top;
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
    // Draw smooth cubic curves
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    // Control points
    let cx1, cy1, cx2, cy2;
    if (conn.type === "core") {
      // Connect outward from center: bend paths vertically/horizontally
      cx1 = x1 + dx * 0.4;
      cy1 = y1 + dy * 0.1;
      cx2 = x1 + dx * 0.6;
      cy2 = y2 - dy * 0.1;
    } else {
      // Relations connections: side bends
      cx1 = x1 + dx * 0.2;
      cy1 = y1 + dy * 0.8;
      cx2 = x1 + dx * 0.8;
      cy2 = y2 - dy * 0.2;
    }
    
    const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
    
    path.setAttribute("d", pathData);
    path.setAttribute("class", "connection-path");
    
    if (conn.id) {
      path.setAttribute("id", conn.id);
    }
    
    // Set custom styling for relations vs core paths
    if (conn.type === "relation") {
      path.style.stroke = "rgba(212, 168, 67, 0.08)";
      path.style.strokeWidth = "1.5px";
    }
    
    svg.appendChild(path);
  });
}

// Setup interactions for relations hover
function setupRelationsPanel() {
  const cards = document.querySelectorAll("[data-relation-id]");
  const allNodes = document.querySelectorAll("[data-node-id]");
  
  cards.forEach(card => {
    const relationId = card.getAttribute("data-relation-id");
    const nodeAId = card.getAttribute("data-node-a");
    const nodeBId = card.getAttribute("data-node-b");
    
    // Mouse enter: dim other cards, highlight selected, animate path
    card.addEventListener("mouseenter", () => {
      // Dim nodes
      allNodes.forEach(node => {
        const id = node.getAttribute("data-node-id");
        if (id === nodeAId || id === nodeBId) {
          node.classList.add("highlighted");
        } else {
          node.classList.add("dimmed");
        }
      });
      
      // Highlight path
      const path = document.getElementById(relationId);
      if (path) {
        path.classList.add("active");
      }
    });
    
    // Mouse leave: reset everything
    card.addEventListener("mouseleave", () => {
      allNodes.forEach(node => {
        node.classList.remove("highlighted", "dimmed");
      });
      
      const path = document.getElementById(relationId);
      if (path) {
        path.classList.remove("active");
      }
    });
  });
}

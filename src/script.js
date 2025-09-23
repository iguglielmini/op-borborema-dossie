// ======= Config editável =======
const TOTAL_SIMULATION_TIME = 60; // segundos (ex.: 600 = 10 min)
const TOTAL_MS = TOTAL_SIMULATION_TIME * 1000;

const PHASES = {
  detection: 0.01, // ~1% do tempo
  decryption: 0.49, // ~49%
  transfer: 0.45, // ~45%
  result: 0.05, // ~5%
};

// ======= Elementos =======
const terminal = document.getElementById("terminalOutput");
const phaseLabel = document.getElementById("phaseLabel");
const progressBar = document.getElementById("progressBar");
const percentLabel = document.getElementById("percentLabel");

// ======= Helpers =======
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function printLine(text, delay = 60) {
  return new Promise((resolve) => {
    setTimeout(() => {
      terminal.textContent += "\n" + text;
      terminal.scrollTop = terminal.scrollHeight;
      resolve();
    }, delay);
  });
}

async function runPhase({ name, durationMs, steps = 100, prefixLine }) {
  // Atualiza HUD
  phaseLabel.textContent = name;
  progressBar.style.width = "0%";
  percentLabel.textContent = "0%";

  if (prefixLine) await printLine(prefixLine, 120);

  const stepDelay = durationMs / steps;
  for (let i = 0; i <= steps; i++) {
    const pct = Math.round((i / steps) * 100);
    progressBar.style.width = pct + "%";
    percentLabel.textContent = pct + "%";

    // opcional: log a cada X%
    if (i % Math.max(1, Math.floor(steps / 10)) === 0) {
      await printLine(`${name}: ${pct}%`, 10);
    }
    await sleep(stepDelay);
  }
}

async function simulateProcess() {
  // Detecção (rápida)
  await printLine("Dispositivo USB detectado...");
  phaseLabel.textContent = "Inicializando...";
  progressBar.style.width = "0%";
  percentLabel.textContent = "—";
  await sleep(TOTAL_MS * PHASES.detection);

  // Descriptografia (com barra)
  await printLine("Iniciando descriptografia do Dossiê da Borborema...");
  await printLine("Arquivo encontrado: dossie_borborema.enc");
  await runPhase({
    name: "Descriptografando",
    durationMs: TOTAL_MS * PHASES.decryption,
    steps: 100,
    prefixLine: null,
  });

  // Transferência (com barra)
  await printLine("Dossiê decodificado com sucesso.");
  await runPhase({
    name: "Transferindo",
    durationMs: TOTAL_MS * PHASES.transfer,
    steps: 100,
    prefixLine: "Transferindo dados para a central da PMA...",
  });

  // Resultado (curta)
  phaseLabel.textContent = "Finalizando…";
  progressBar.style.width = "100%";
  percentLabel.textContent = "100%";
  await sleep(TOTAL_MS * PHASES.result);

  const sucesso = false;
  if (sucesso) {
    await printLine("\n✅ Missão concluída. Dossiê salvo com sucesso.");
    phaseLabel.textContent = "Concluído";
  } else {
    await printLine("\n❌ ERRO: Rede interceptada! Cangaço capturou os dados.");
    await sleep(1500);
    mostrarHackOverlay();
    phaseLabel.textContent = "Falha";
  }
}

// Atalho para testes rápidos: segure SHIFT ao carregar e reduz a 30s
window.addEventListener("load", () => {
  // (Opcional) modo rápido para ensaio manual:
  // segure a tecla 'R' por ~1s ao abrir a página para acelerar.
  let fast = false;
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") fast = true;
  });
  setTimeout(async () => {
    if (fast) {
      const fastTotal = 30 * 1000; // 30s
      PHASES.detection = 0.03; // 0.9s
      PHASES.decryption = 0.57; // ~17.1s
      PHASES.transfer = 0.35; // ~10.5s
      PHASES.result = 0.05; // ~1.5s
    }
    await simulateProcess();
  }, 200);
});


function mostrarHackOverlay() {
  const overlay = document.getElementById("hackOverlay");
  const moneyEl = document.getElementById("moneyCounter");
  overlay.classList.remove("hidden");

  let current = 0;
  const target = 300_000_000;
  const duration = 8000; // 8 segundos
  const interval = 50;
  const steps = duration / interval;
  const increment = target / steps;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(counter);
    }
    moneyEl.textContent = formatter.format(current);
  }, interval);
}

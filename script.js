const subjects = [
  { name: "Investigación en ingeniería", uv: 4, id: "inv", unlocks: ["fis1"] },
  { name: "Matemática I", uv: 4, id: "mat1", unlocks: ["mat2", "fis1"] },
  { name: "Psicología y relaciones sociolaborales", uv: 4, id: "psi", unlocks: ["resp"] },
  { name: "Dibujo técnico I", uv: 3, id: "dib1", unlocks: ["dib2"] },
  { name: "Introducción a la ingeniería Industrial", uv: 4, id: "intro", unlocks: ["ofi", "log"] },

  { name: "Física I", uv: 4, id: "fis1", unlocks: ["fis2", "sol"] },
  { name: "Matemática II", uv: 4, id: "mat2", unlocks: ["mat3", "fis2", "sol"] },
  { name: "Responsabilidad de la ingeniería en la economía y la sociedad", uv: 4, id: "resp", unlocks: ["adm"] },
  { name: "Química técnica", uv: 4, id: "qui", unlocks: ["tec1"] },
  { name: "Dibujo técnico II", uv: 4, id: "dib2", unlocks: ["tec1"] },

  { name: "Física II", uv: 4, id: "fis2", unlocks: ["fis3", "din", "flui"] },
  { name: "Matemática III", uv: 4, id: "mat3", unlocks: ["fis3", "mat4", "eco", "prob"] },
  { name: "Ofimática y software", uv: 4, id: "ofi", unlocks: ["eco2"] },
  { name: "Lógica y algoritmos", uv: 4, id: "log", unlocks: ["prob"] },
  { name: "Sólidos deformables", uv: 4, id: "sol", unlocks: ["din", "tec2"] },

  { name: "Física III", uv: 4, id: "fis3", unlocks: ["efic"] },
  { name: "Matemática IV", uv: 4, id: "mat4", unlocks: ["flui"] },
  { name: "Dinámica", uv: 4, id: "din", unlocks: ["efic"] },
  { name: "Fundamentos de administración", uv: 4, id: "adm", unlocks: ["cal"] },
  { name: "Tecnología industrial I", uv: 4, id: "tec1", unlocks: ["tec2"] },

  { name: "Mecánica de los fluidos", uv: 4, id: "flui", unlocks: ["seg"] },
  { name: "Fundamentos de economía", uv: 4, id: "eco", unlocks: ["eco2"] },
  { name: "Eficiencia energética", uv: 4, id: "efic", unlocks: ["tec3"] },
  { name: "Probabilidad y estadística", uv: 4, id: "prob", unlocks: ["op1", "cal"] },
  { name: "Tecnología industrial II", uv: 4, id: "tec2", unlocks: ["tec3", "seg"] },

  { name: "Ingeniería económica", uv: 4, id: "eco2", unlocks: ["cont", "op2"] },
  { name: "Investigación de operaciones I", uv: 4, id: "op1", unlocks: ["op2"] },
  { name: "Gestión de la calidad", uv: 4, id: "cal", unlocks: ["anal"] },
  { name: "Seguridad y salud ocupacional", uv: 4, id: "seg", unlocks: ["cap"] },
  { name: "Tecnología industrial III", uv: 4, id: "tec3", unlocks: ["met"] },

  { name: "Gestión del capital humano", uv: 4, id: "cap" },
  { name: "Contabilidad y costos", uv: 4, id: "cont", unlocks: ["fin"] },
  { name: "Investigación de operaciones II", uv: 4, id: "op2", unlocks: ["sumin"] },
  { name: "Análisis y diseño organizacional", uv: 4, id: "anal", unlocks: ["merc"] },
  { name: "Ingeniería de métodos", uv: 4, id: "met", unlocks: ["sumin", "dist", "med"] },

  { name: "Mercadeo", uv: 4, id: "merc", unlocks: ["eval"] },
  { name: "Administración financiera", uv: 4, id: "fin", unlocks: ["eval"] },
  { name: "Gestión de la cadena de suministros", uv: 4, id: "sumin", unlocks: ["prod"] },
  { name: "Distribución en plantas", uv: 4, id: "dist", unlocks: ["prod", "eval"] },
  { name: "Medidas del trabajo", uv: 4, id: "med" },

  { name: "Electiva", uv: 4, id: "elec1" },
  { name: "Electiva", uv: 4, id: "elec2" },
  { name: "Gestión de la producción", uv: 4, id: "prod", unlocks: ["grad", "emp"] },
  { name: "Legislación profesional (140 U.V)", uv: 4, id: "legi", uvRequirement: 140, unlocks: ["grad", "emp"] },
  { name: "Formulación y evaluación de proyectos", uv: 4, id: "eval", unlocks: ["grad", "impl"] },

  { name: "Electiva", uv: 4, id: "elec3" },
  { name: "Electiva", uv: 4, id: "elec4" },
  { name: "Gestión empresarial", uv: 4, id: "emp" },
  { name: "Protocolo de trabajo de graduación", uv: 4, id: "grad" },
  { name: "Gestión de la implantación de proyectos", uv: 4, id: "impl" },
];

let totalUV = 0;
const grid = document.getElementById("grid");
const uvDisplay = document.getElementById("uv-total");
const state = {};

function createSubjectCard(subject) {
  const div = document.createElement("div");
  div.className = "subject locked";
  div.id = subject.id;
  div.innerHTML = `<strong>${subject.name}</strong><br>${subject.uv} U.V`;

  state[subject.id] = { approved: false, element: div, subject };

  // desbloquear materias sin requisitos
  const hasRequisites = Object.values(subjects).some(s => (s.unlocks || []).includes(subject.id));
  if (!hasRequisites && !subject.uvRequirement) {
    div.classList.remove("locked");
  }

  div.addEventListener("click", () => approveSubject(subject.id));

  grid.appendChild(div);
}

function approveSubject(id) {
  const entry = state[id];
  if (entry.approved) return;

  entry.approved = true;
  entry.element.classList.add("approved");
  entry.element.classList.remove("locked");

  totalUV += entry.subject.uv;
  uvDisplay.textContent = `U.V acumuladas: ${totalUV}`;

  // desbloquear materias por dependencia directa
  (entry.subject.unlocks || []).forEach(unlockId => {
    const target = state[unlockId];
    if (target) {
      const requirementsMet = Object.values(subjects).filter(s => (s.unlocks || []).includes(unlockId))
        .every(req => state[req.id]?.approved);
      if (requirementsMet) {
        target.element.classList.remove("locked");
      }
    }
  });

  // desbloquear por requisito de U.V
  Object.values(state).forEach(entry => {
    if (entry.subject.uvRequirement && totalUV >= entry.subject.uvRequirement) {
      entry.element.classList.remove("locked");
    }
  });
}

subjects.forEach(createSubjectCard);

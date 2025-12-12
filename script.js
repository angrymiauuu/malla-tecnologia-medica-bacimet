//  Prerrequisitos de cada ramo
const prerequisitos = {
  // Semestre 2
  'histoembriologia': ['anatomia', 'biocel'],
  'fisica': ['algebra'],
  'quimica_organica': ['quimica_general'],

  // Semestre 3
  'fisiologia': ['histoembriologia'],
  'bioetica': ['intro_tm'],
  'bioquimica': ['quimica_organica', 'biocel'],
  'infectologia': ['lab_biocel'],
  'ingles2': ['ingles1'],

  // Semestre 4
  'fisiopato': ['fisiologia'],
  'farmaco': ['bioquimica'],
  'parasito': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],
  'inmuno_diag': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],
  'ingles3': ['ingles2'],

  // Semestre 5
  'procedimientos': ['farmaco'],
  'salud_pub1': ['fisiopato'],
  'micro1': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic', 'farmaco'
  ],
  'hemato1': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],
  'ingles4': ['ingles3'],

  // Semestre 6
  'salud_pub2': ['salud_pub1', 'procedimientos'],
  'micro2': ['micro1'],
  'hemato2': ['hemato1'],
  'bioq_clinica1': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],


  //  SEMESTRE 7 (ARREGLADO)
  'educacion_salud': ['salud_pub2'],
  'gestion_salud': ['salud_pub2'],
  'biomolecular': ['micro2'],
  'inmunohemo': ['hemato2'],
  'bioq_clinica2': ['bioq_clinica1'],

  'integrador1': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],

  // ─────────────────────────────
  //  SEMESTRE 8 
  // ─────────────────────────────
  'investigacion': ['salud_pub2'],
  'aseguramiento': ['gestion_salud'],
  'med_transfusional': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],
  'diag_molecular': [
    'biocel', 'lab_biocel', 'quimica_general', 'anatomia', 'intro_tm', 'algebra',
    'histoembriologia', 'fisica', 'quimica_organica', 'ingles1', 'habilidades',
    'fisiologia', 'bioetica', 'bioquimica', 'infectologia', 'ingles2', 'tic'
  ],

  // ─────────────────────────────
  //  SEMESTRE 9
  // ─────────────────────────────
  'responsabilidad': [
    'educacion_salud', 'gestion_salud', 'biomolecular', 'inmunohemo', 'bioq_clinica2',
    'integrador1', 'med_transfusional', 'diag_molecular', 'pensamiento',
    'salud_pub2', 'micro2', 'hemato2', 'bioq_clinica1'
  ],

  'seminario': [
    'educacion_salud', 'gestion_salud', 'biomolecular', 'inmunohemo', 'bioq_clinica2',
    'integrador1', 'med_transfusional', 'diag_molecular', 'pensamiento',
    'salud_pub2', 'micro2', 'hemato2', 'bioq_clinica1'
  ],

  // ─────────────────────────────
  //  SEMESTRE 10
  // ─────────────────────────────
  'integrador2': [
    'responsabilidad', 'seminario', 'integrador1'
  ]
};


// ======================================================
//  FUNCIONES
// ======================================================

function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

//  Desbloquear ramos según prerequisitos
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [ramo, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(ramo);
    if (!elem) continue;

    const puedeDesbloquear = reqs.every(r => aprobados.includes(r));

    if (!elem.classList.contains('aprobado')) {
      if (puedeDesbloquear) elem.classList.remove('bloqueado');
      else elem.classList.add('bloqueado');
    } else {
      elem.classList.remove('bloqueado');
    }
  }
}

// Marcar como aprobado
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const idx = aprobados.indexOf(ramo.id);
    if (idx > -1) aprobados.splice(idx, 1);
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos();
}

window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');
  const aprobados = obtenerAprobados();

  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});

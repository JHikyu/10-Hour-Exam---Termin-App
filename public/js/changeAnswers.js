// aendere klassen immer wenn ein knopf gedrueckt wurde
// ausserdem aender unsere hidden inputs, um sie als parameter mitzugeben

function changeAnswer(id, value) {
  const buttons = {
    ja: document.getElementById(`termin-${id}-ja`),
    nein: document.getElementById(`termin-${id}-nein`),
    vielleicht: document.getElementById(`termin-${id}-vielleicht`),
  };

  buttons.ja.classList.remove('active');
  buttons.nein.classList.remove('active');
  buttons.vielleicht.classList.remove('active');

  buttons[value].classList.add('active');

  
  document.getElementById(`form-${id}`).value = value;
}
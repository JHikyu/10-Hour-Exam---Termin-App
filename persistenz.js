//* Functions
const generateCode = () =>
  Array(6)
  .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
  .map((x) => x[Math.floor(Math.random() * x.length)])
  .join("");

function getAbstimmungZuTCode(tcode) {
  return abstimmungen.find(a => a.tcode === tcode);
}

function getAbstimmungZuACode(acode) {
  return abstimmungen.find(a => a.acode === acode);
}

//* Meine Functions
const firstNames = ['Angela', 'Berta', 'Justin', 'Peter', 'Robert', 'Sandra', 'Sebastian', 'Thomas', 'Ursula', 'Viktor', 'Werner', 'Xenia', 'Zacharias'];
const names = ['Müller', 'Rost', 'Mustermann', 'Schmidt', 'Schneider', 'Fischer', 'Weber'];
function getRandomName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${names[Math.floor(Math.random() * names.length)]}`;
}


//* Arrays
const abstimmungen = [];
const termine = [];
const stimmen = [];

function Abstimmung(string = 'Default', beschreibung = 'Leer') {
  this.name = string;
  this.beschreibung = beschreibung;
  this.acode = generateCode();
  this.tcode = generateCode();

  this.termine = [];

  this.addTermin = function(termin) {
    //? Test ob Termin schon existiert
    if(this.termine.find(t => t.datum === termin.datum && t.start === termin.start && t.ende === termin.ende)) return false;
    this.termine.push(termin);

    return true;
  };

  abstimmungen.push(this);
}

function Termin(datum, start, ende) {
  Termin.id = isNaN(Termin.id) ? 0 : Termin.id + 1;

  this.id = Termin.id;
  //! Format: "YYYY-MM-DD" > "2020-01-01"
  this.datum = datum;
  //! Format: "HH:MM" > "00:00"
  this.start = start;
  //! Format: "HH:MM" > "00:00"
  this.ende = ende;

  this.stimmen = [];

  this.addStimme = function(stimme) {
    this.stimmen.push(stimme);
    return true;
  };

  termine.push(this);
}

//? Valide optionen der Stimme
const valideOptionen = ['Ja', 'Nein', 'Vielleicht'];

//? Teilname eines Studenten
function Stimme(name, option) {
  //? Erlaubte Werte fuer Stimme.option
  this.istValideOption = function(toTest) {
    return valideOptionen.includes(toTest);
  };

  //? Error handling
  if(!this.istValideOption(option)) throw new Error('Ungueltige Stimme, bitte benutzte eine der folgenden Stimmen: ' + valideOptionen.join(', '));

  this.name = name;
  this.option = option;

  stimmen.push(this);
}


//? ich denke, dass diese schreibweise die einfachste ist
const a = new Abstimmung('Mathematik für Informatik', 'Diese Prüfung wird als Teilnote bewertet.\nLorem Ipsum');
a.addTermin(new Termin('2020-01-01', '09:00', '09:30'));
a.addTermin(new Termin('2020-01-01', '09:30', '10:00'));
a.addTermin(new Termin('2020-01-02', '09:00', '09:30'));

termine.forEach(t => {
  for(let i = 0 ; i < 3 ; i++) {
    t.addStimme(new Stimme(getRandomName(), valideOptionen[Math.floor(Math.random() * valideOptionen.length)]));
  }
});

//? Exportiere alles notwendige
module.exports = {
  abstimmungen,
  termine,
  stimmen,
  Abstimmung,
  Termin,
  Stimme,
  getAbstimmungZuTCode,
  getAbstimmungZuACode
};
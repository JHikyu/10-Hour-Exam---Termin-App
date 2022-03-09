// straight forward, kann kaum kommentieren
// 10x das gleiche
// wir erstellen viele dom elemente in einem einzigen, jedes mal wenn count geaendert wurde


const termineDOM = document.querySelector('#termine');

document.querySelector('#termineCount').addEventListener('change', (e) => {
  //? Clear termine
  termineDOM.innerHTML = '';

  //? Get count
  const count = e.target.value;

  //? Create termine
  for (let i = 0; i < count; i++) {
    // <label for="termin-1">Termin i</label>
    const mainLabel = document.createElement('label');
    mainLabel.setAttribute('for', `termin-${i}`);
    mainLabel.textContent = `Termin ${i + 1}`;
    termineDOM.appendChild(mainLabel);

    // <fieldset name="termin-1"></fieldset>
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('name', `termin-${i}`);

      // <label for="termin-1-datum">Datum: </label>
      const datumLabel = document.createElement('label');
      datumLabel.setAttribute('for', `termin-${i}-datum`);
      datumLabel.textContent = 'Datum: ';
      datumLabel.required = true;
      fieldset.appendChild(datumLabel);

      // <input type="date" name="termin-1-datum">
      const datumInput = document.createElement('input');
      datumInput.setAttribute('type', 'date');
      datumInput.setAttribute('name', `termin-${i}-datum`);
      datumInput.required = true;
      fieldset.appendChild(datumInput);

      // <label for="termin-1-start">Start: </label>
      const startLabel = document.createElement('label');
      startLabel.setAttribute('for', `termin-${i}-start`);
      startLabel.textContent = 'Start: ';
      startLabel.required = true;
      fieldset.appendChild(startLabel);

      // <input type="time" name="termin-1-start">
      const startInput = document.createElement('input');
      startInput.setAttribute('type', 'time');
      startInput.setAttribute('name', `termin-${i}-start`);
      startInput.required = true;
      fieldset.appendChild(startInput);

      // <label for="termin-1-ende">Ende: </label>
      const endeLabel = document.createElement('label');
      endeLabel.setAttribute('for', `termin-${i}-ende`);
      endeLabel.textContent = 'Ende: ';
      endeLabel.required = true;
      fieldset.appendChild(endeLabel);

      // <input type="time" name="termin-1-ende">
      const endeInput = document.createElement('input');
      endeInput.setAttribute('type', 'time');
      endeInput.setAttribute('name', `termin-${i}-ende`);
      endeInput.required = true;
      fieldset.appendChild(endeInput);

    termineDOM.appendChild(fieldset);
  }

});
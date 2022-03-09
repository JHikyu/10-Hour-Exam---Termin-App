//! Modules
//* Node modules
const fs = require('fs');
const url = require('url');
const path = require('path');

//* Express
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views')); //? Views is already the default dir / optional
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Internal
const { Abstimmung, Termin, Stimme, termine, abstimmungen, stimmen, getAbstimmungZuTCode, getAbstimmungZuACode } = require('./persistenz.js');


//! Config
let config = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
const { port } = JSON.parse(config);


//! App
//* Listen
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//* Routes
app.get('/', (req, res) => {
    // Rendere die index.ejs
    res.render('index');
});
app.get('/abstimmungErstellen', (req, res) => {
    // Rendere die abstimmungErstellen.ejs
    res.render('abstimmungErstellen');
});
app.get('/abstimmungTeilnehmen', (req, res) => {
    // Bekomme get parameter und dekonstruiere sie
    const { query } = url.parse(req.url, true);

    // zeige index.ejs, wenn keine get parameter gefunden
    if(!query || !query.tCode) {
        res.render('index');
        return;
    }

    // bekomme abstimmung mit tCode
    const abstimmung = getAbstimmungZuTCode(query.tCode);

    // wenn abstimmung nicht vorhanden, zeige index.ejs mit error
    if(!abstimmung) {
        res.render('index', { error: true, tCode: query.tCode });
        return;
    }
    console.log(abstimmung.termine);
    // Rendere die abstimmungTeilnehmen.ejs mit abstimmung objekt
    res.render('abstimmungTeilnehmen', { abstimmung });
});
app.get('/abstimmungBetrachten', (req, res) => {
    // Bekomme get parameter und dekonstruiere sie
    const { query } = url.parse(req.url, true);

    // zeige index.ejs, wenn keine get parameter gefunden
    if(!query || !query.aCode) {
        res.render('index');
        return;
    }

    // bekomme abstimmung mit tCode
    const abstimmung = getAbstimmungZuACode(query.aCode);

    // wenn abstimmung nicht vorhanden, zeige index.ejs mit error
    if(!abstimmung) {
        res.render('index', { adminError: true, aCode: query.aCode });
        return;
    }

    // Rendere die abstimmungTeilnehmen.ejs mit abstimmung objekt
    res.render('abstimmungBetrachten', { abstimmung });
});
app.post('/create-send', (req, res) => {
    // dekonstruiere post parameter
    const { name, beschreibung, termineCount } = req.body;
    console.log(req.body);

    // erstelle neue abstimmung
    const neueAbstimmung = new Abstimmung(name, beschreibung);

    // gehe alle termine der abstimmung durch mit hilfe der count post variable
    for(let i = 1 ; i <= termineCount ; i++) {
        const datum = req.body[`termin-${i}-datum`];
        const start = req.body[`termin-${i}-start`];
        const ende = req.body[`termin-${i}-ende`];
        console.log(datum, start, ende);
        // erstelle neuen termin
        neueAbstimmung.addTermin(new Termin(datum, start, ende));
    }

    // zeige user json von erstellter abstimmung
    res.status(201).json({
        status: 201,
        message: 'Abstimmung erfolgreich erstellt.',
        tCode: neueAbstimmung.tcode,
        aCode: neueAbstimmung.acode
    });
});
app.post('/teilnahme', (req, res) => {
    const body = req.body;

    // Wenn keine get parameter gefunden, zeige index.ejs
    if(!body || !req.body) {
        res.render('index');
        return;
    }

    // bekomme abstimmung durch code
    const abstimmung = getAbstimmungZuTCode(body.tcode);

    // fuer jeden termin, fuege die stimme hinzu
    abstimmung.termine.forEach((termin) => {
        if(!body[termin.id]) return;

        // erster buchstabe uppercase
        const capitalizeOption = body[termin.id].charAt(0).toUpperCase() + body[termin.id].slice(1);

        // erstelle stimme
        termin.addStimme(new Stimme(body.name, capitalizeOption));
    });

    // render index mit success
    res.render('index', { success: true });
});
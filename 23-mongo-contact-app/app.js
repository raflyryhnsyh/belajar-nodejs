const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('./utils/db');
const { Mahasiswa } = require('./models/mahasiswa');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mahasiswaRoute = require('./routes/mahasiswa-route');
const contactRoute = require('./routes/contact-route');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// Setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

app.get('/', async(req, res) => {
    const allMahasiswa = await Mahasiswa.find();

    res.render('index', { 
        nama: 'Rafly Rayhansyah', 
        title: 'Halaman Home',
        allMahasiswa,
        layout: 'layouts/main-layout', 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout', 
        title: 'Halaman About'
    });
});

app.use('/', mahasiswaRoute);

app.use('/', contactRoute);

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});

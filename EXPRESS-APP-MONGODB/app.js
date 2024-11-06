const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadMahasiswa } = require('./utils/mahasiswa');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mahasiswaRoute = require('./routes/mahasiswa-route');
const contactRoute = require('./routes/contact-route');

const app = express();
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');

// Third-party niddleware
app.use(expressLayouts);

// Build-in middleware 
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true }));

// konfigurasi
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


app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname });
    const allMahasiswa = loadMahasiswa();
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

app.use((req,res) => {
    res.status(404);
    res.send("<h1>404<br>Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
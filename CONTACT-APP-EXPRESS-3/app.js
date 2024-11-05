const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const { loadMahasiswa } = require('./utils/mahasiswa');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

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

app.get('/mahasiswa', (req, res) => {
    const allMahasiswa = loadMahasiswa();
    res.render('mahasiswa', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Mahasiswa',
        allMahasiswa,
        msg: req.flash('msg'),
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// proses data contact
app.post('/contact',
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error('Nama contact sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
        check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() })
            res.render('add-contact', {
                title: 'Form Tambah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            });
        } else {
            addContact(req.body);
            // kirim flash message
            req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
            res.redirect('/contact');
        }
    }
);

// form halaman edit contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    // jika tidak ada
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        res.render('edit-contact', {
            title: 'Form Edit Data Contact',
            layout: 'layouts/main-layout',
            contact,
        });
    }
});

// proses ubah data contact
app.post('/contact/update',
    [
        body('nama').custom((value, { req }) => {
            const duplikat = cekDuplikat(value);
            if (value !== req.body.oldNama && duplikat) {
                throw new Error('Nama contact sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
        check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() })
            res.render('edit-contact', {
                title: 'Form Edit Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body,
            });
        } else {
            updateContacts(req.body);
            // kirim flash message
            req.flash('msg', 'Data Contact Berhasil Diedit!');
            res.redirect('/contact');
        }
    }
);

// proses halaman delete
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    // jika tidak ada
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        // kirim flash message
        req.flash('msg', 'Data Contact Berhasil Dihapus!');
        res.redirect('/contact');
    }
});

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout', 
        contact
    });
});

app.use((req,res) => {
    res.status(404);
    res.send("<h1>404<br>Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
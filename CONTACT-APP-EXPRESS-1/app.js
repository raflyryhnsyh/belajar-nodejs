const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');

const app = express();
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');

// Third-party niddleware
app.use(expressLayouts);

// Build-in middleware 
app.use(express.static('public')) 

app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname });
    const mahasiswa = [
        {
            nama: 'Rafly Rayhanyah',
            email: 'rafly@mail.com',
        },
        {
            nama: 'Erik',
            email: 'erik@mail.com',
        },
        {
            nama: 'Dodi',
            email: 'dodi@mail.com',
        },
    ]
    res.render('index', { 
        nama: 'Rafly Rayhansyah', 
        title: 'Halaman Home',
        mahasiswa, 
        layout: 'layouts/main-layout', 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout', 
        title: 'Halaman About'
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Contact',
        contacts
    });
});

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
const express = require('express');
const router = express.Router();
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('../utils/contacts');

const { body, validationResult, check } = require('express-validator');

router.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

// halaman form tambah data contact
router.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// proses data contact
router.post('/contact',
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
router.get('/contact/edit/:nama', (req, res) => {
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
router.post('/contact/update',
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
router.get('/contact/delete/:nama', (req, res) => {
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
router.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout', 
        contact
    });
});

module.exports = router;
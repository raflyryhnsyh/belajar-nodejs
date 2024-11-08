const express = require('express');
const router = express.Router();

const { body, validationResult, check } = require('express-validator');
const { Contact } = require('../models/contacts');

router.get('/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.render('contact/contact', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

// halaman form tambah data contact
router.get('/contact/add', (req, res) => {
    res.render('contact/add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// proses tambah data contact
router.post('/contact',
    [
        body('nama').custom(async (value) => {
            const duplikat = await Contact.findOne({ nama: value });
            if (duplikat) {
                throw new Error('Nama contact sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
        check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('contact/add-contact', {
                title: 'Form Tambah Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            });
        } else {
            await Contact.insertMany(req.body, (error, result) => {
                // kirim flash message
                req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
                res.redirect('/contact');
            });
        }
    }
);

// form halaman edit contact
router.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });

    // jika tidak ada
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        res.render('contact/edit-contact', {
            title: 'Form Edit Data Contact',
            layout: 'layouts/main-layout',
            contact,
        });
    }
});

// proses ubah data contact
router.put('/contact',
    [
        body('nama').custom(async (value, { req }) => {
            const duplikat = await Contact.findOne({ nama: value });
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
            res.render('contact/edit-contact', {
                title: 'Form Edit Data Contact',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                contact: req.body,
            });
        } else {
            Contact.updateMany({ _id: req.body._id },
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp
                    }
                }
            ).then((result) => {
                // kirim flash message
                req.flash('msg', 'Data Contact Berhasil Diedit!');
                res.redirect('/contact');
            });
        }
    }
);

// proses halaman delete
router.delete('/contact', async (req, res) => {
    await Contact.deleteOne({ nama: req.body.nama }).then((result) => {
        // kirim flash message
        req.flash('msg', 'Data Contact Berhasil Dihapus!');
        res.redirect('/contact');
    });
});

// halaman detail contact
router.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('contact/detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout', 
        contact
    });
});

module.exports = router;
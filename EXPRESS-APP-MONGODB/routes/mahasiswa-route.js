const express = require('express');
const router = express.Router();
const { loadMahasiswa, findMahasiswa, addMahasiswa, cekDuplikat, deleteMahasiswa, updateAllMahasiswa } = require('../utils/mahasiswa');

const { body, validationResult, check } = require('express-validator');

router.get('/mahasiswa', (req, res) => {
    const allMahasiswa = loadMahasiswa();
    res.render('mahasiswa/mahasiswa', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Mahasiswa',
        allMahasiswa,
        msg: req.flash('msg'),
    });
});

// halaman form tambah data mahasiswa
router.get('/mahasiswa/add', (req, res) => {
    res.render('mahasiswa/add-mahasiswa', {
        title: 'Form Tambah Data Mahasiswa',
        layout: 'layouts/main-layout',
    });
});

// proses ubah data mahasiswa
router.post('/mahasiswa/update',
    [
        body('nama').custom((value, { req }) => {
            const duplikat = cekDuplikat(value);
            if (value !== req.body.oldNama && duplikat) {
                throw new Error('Nama mahasiswa sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() })
            res.render('mahasiswa/edit-mahasiswa', {
                title: 'Form Edit Data mahasiswa',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                mahasiswa: req.body,
            });
        } else {
            updateAllMahasiswa(req.body);
            // kirim flash message
            req.flash('msg', 'Data Mahasiswa Berhasil Diedit!');
            res.redirect('/mahasiswa');
        }
    }
);

// proses data mahasiswa
router.post('/mahasiswa',
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error('Nama mahasiswa sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() })
            res.render('mahasiswa/add-mahasiswa', {
                title: 'Form Tambah Data Mahasiswa',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            });
        } else {
            addMahasiswa(req.body);
            // kirim flash message
            req.flash('msg', 'Data Mahasiswa Berhasil Ditambahkan!');
            res.redirect('/mahasiswa');
        }
    }
);

// form halaman edit mahasiswa
router.get('/mahasiswa/edit/:nama', (req, res) => {
    const mahasiswa = findMahasiswa(req.params.nama);

    // jika tidak ada
    if (!mahasiswa) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        res.render('mahasiswa/edit-mahasiswa', {
            title: 'Form Edit Data Mahasiswa',
            layout: 'layouts/main-layout',
            mahasiswa,
        });
    }
});

// proses halaman delete
router.get('/mahasiswa/delete/:nama', (req, res) => {
    const mahasiswa = findMahasiswa(req.params.nama);

    // jika tidak ada
    if (!mahasiswa) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteMahasiswa(req.params.nama);
        // kirim flash message
        req.flash('msg', 'Data Mahasiswa Berhasil Dihapus!');
        res.redirect('/mahasiswa');
    }
});

// halaman detail mahasiswa
router.get('/mahasiswa/:nama', (req, res) => {
    const mahasiswa = findMahasiswa(req.params.nama);
    res.render('mahasiswa/detail-mahasiswa', {
        title: 'Halaman Detail Mahasiswa',
        layout: 'layouts/main-layout', 
        mahasiswa
    });
});

module.exports = router;
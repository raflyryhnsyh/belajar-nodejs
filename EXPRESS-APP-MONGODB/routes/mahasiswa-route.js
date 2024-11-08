const express = require('express');
const router = express.Router();

const { body, validationResult, check } = require('express-validator');
const { Mahasiswa } = require('../models/mahasiswa');

router.get('/mahasiswa', async (req, res) => {
    const allMahasiswa = await Mahasiswa.find();
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

// proses tambah data mahasiswa
router.post('/mahasiswa',
    [
        body('nama').custom(async (value) => {
            const duplikat = await Mahasiswa.findOne({ nama: value });
            if (duplikat) {
                throw new Error('Nama mahasiswa sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('mahasiswa/add-mahasiswa', {
                title: 'Form Tambah Data Mahasiswa',
                layout: 'layouts/main-layout',
                errors: errors.array(),
            });
        } else {
            await Mahasiswa.insertMany(req.body, (error, result) => {
                // kirim flash message
                req.flash('msg', 'Data Mahasiswa Berhasil Ditambahkan!');
                res.redirect('/mahasiswa');
            });
        }
    }
);

// form halaman edit mahasiswa
router.get('/mahasiswa/edit/:nama', async (req, res) => {
    const mahasiswa = await Mahasiswa.findOne({ nama: req.params.nama });

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

// proses ubah data mahasiswa
router.put('/mahasiswa',
    [
        body('nama').custom(async (value, { req }) => {
            const duplikat = await Mahasiswa.findOne({ nama: value });
            if (value !== req.body.oldNama && duplikat) {
                throw new Error('Nama mahasiswa sudah digunakan!');
            }
            return true;
        }),
        check('email', 'Email tidak valid!').isEmail(),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('mahasiswa/edit-mahasiswa', {
                title: 'Form Edit Data Mahasiswa',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                mahasiswa: req.body,
            });
        } else {
            Mahasiswa.updateMany({ _id: req.body._id },
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email
                    }
                }
            ).then((result) => {
                // kirim flash message
                req.flash('msg', 'Data Mahasiswa Berhasil Diedit!');
                res.redirect('/mahasiswa');
            });
        }
    }
);

// proses halaman delete
router.delete('/mahasiswa', async (req, res) => {
    await Mahasiswa.deleteOne({ nama: req.body.nama }).then((result) => {
        // kirim flash message
        req.flash('msg', 'Data Mahasiswa Berhasil Dihapus!');
        res.redirect('/mahasiswa');
    });
});

// halaman detail mahasiswa
router.get('/mahasiswa/:nama', async (req, res) => {
    const mahasiswa = await Mahasiswa.findOne({ nama: req.params.nama });
    res.render('mahasiswa/detail-mahasiswa', {
        title: 'Halaman Detail Mahasiswa',
        layout: 'layouts/main-layout', 
        mahasiswa
    });
});

module.exports = router;
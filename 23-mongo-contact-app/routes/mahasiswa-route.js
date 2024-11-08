const express = require('express');
const { Mahasiswa } = require('../models/mahasiswa');
const router = express.Router();

router.get('/mahasiswa', async(req, res) => {
    const allMahasiswa = await Mahasiswa.find()

    res.render('mahasiswa/mahasiswa', {
        layout: 'layouts/main-layout', 
        title: 'Halaman Mahasiswa',
        allMahasiswa,
        msg: req.flash('msg'),
    });
});

module.exports = router;
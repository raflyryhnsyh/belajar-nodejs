const mongoose = require('mongoose');

// membuat schema
const Mahasiswa = mongoose.model('Mahasiswa', {
    nama: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, 'mahasiswa');

module.exports = { Mahasiswa };
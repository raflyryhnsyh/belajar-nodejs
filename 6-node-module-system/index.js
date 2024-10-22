// console.log('Hello WPU!');
// const nama = 'Rafly Rayhansyah';
// const cetakNama = (nama) => `Hi, nama saya ${nama}`; 
// console.log(cetakNama(nama));

// const fs = require('fs'); // core module
// const cetakNama = require('./coba'); // local module
// const moment = require('moment'); // third party module / npm module / node_modules

// const cetakNama = require('./coba');
// const PI = require('./coba');
const coba = require('./coba');

// console.log('Hello WPU');
console.log(
    coba.cetakNama('Rafly Rayhansyah'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(), 
    new coba.Orang()
);
// console.log(coba);
const mongoose = require('mongoose');

// konfigurasi
const url = 'mongodb://127.0.0.1:27017/wpu';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



// // menambah 1 data 
// const contact1 = new Contact({
//     nama: 'Erik',
//     nohp: '089646464555',
//     email: 'erik@gmail.com',
// });

// simpan ke collection

// contact1.save().then((contact) => console.log(contact))
// Core Module
// File System

const fs = require('fs');

// menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara synchronous!');
// } catch(e) {
//     console.log(e);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronous', (e) => {
//     console.log(e);
// });


// membaca isi file (synchronous)
// const data  = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca isi file (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// });

// Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// rl.question('Masukkan nama anda : ', (nama) => {
//     console.log(`Terimakasih ${nama}`);
//     rl.close();
// });

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan nomer anda : ', (noHP) => {
        const contact = { nama, noHP };
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts = JSON.parse(file);
        console.log(contacts);

        contacts.push(contact);
        console.log(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('Terimakasih sudah menambahkan data.');

        rl.close();
    })
});



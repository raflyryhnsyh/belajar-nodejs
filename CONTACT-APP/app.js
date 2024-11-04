// mengambil argument  dari command line
const { type } = require('os');
const { argv } = require('process');
const yargs = require('yargs');
const contact = require('./contacts');
yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: "Alamat email",
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: "Nomor Handphone",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contact.simpanContact(argv.nama, argv.email, argv.noHP);
    },
}).demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar semua nama & no hp contact',
    handler() {
        contact.listContact();
    },
});

// menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama dicari",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contact.detailContact(argv.nama);
    },
});

// menghapus sebuah contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama dihapus",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    },
});

yargs.parse();
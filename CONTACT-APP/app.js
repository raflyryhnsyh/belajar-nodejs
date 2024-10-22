const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

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



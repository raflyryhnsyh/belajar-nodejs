const fs = require('fs');

// membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

// membuat file allMahasiswa.json jika belum ada
const dataPath = './data/allMahasiswa.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

// ambil semua data mahasiswa.json
const loadMahasiswa = () => {
    const file = fs.readFileSync('data/allMahasiswa.json', 'utf8');
    const allMahasiswa = JSON.parse(file);
    return allMahasiswa;
};

module.exports = { loadMahasiswa };
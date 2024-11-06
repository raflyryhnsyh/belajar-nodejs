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

// cari mahasiswa berdasarkan nama
const findMahasiswa = (nama) => {
    const allMahasiswa = loadMahasiswa();
    const mahasiswa = allMahasiswa.find(
        (mahasiswa) => mahasiswa.nama.toLowerCase() === nama.toLowerCase()
    );
    return mahasiswa;
};

// menuliskan / menimpa file allMahasiswa.json dengan data yang baru (semua data)
const saveMahasiswa = (allMahasiswa) => {
    fs.writeFileSync('data/allMahasiswa.json', JSON.stringify(allMahasiswa));
};

// menambahkan data mahasiswa baru (data baru)
const addMahasiswa = (mahasiswa) => {
    const allMahasiswa = loadMahasiswa();
    allMahasiswa.push(mahasiswa);
    saveMahasiswa(allMahasiswa);
};

const cekDuplikat = (nama) => {
    const allMahasiswa = loadMahasiswa();
    return allMahasiswa.find((mahasiswa) => mahasiswa.nama.toLowerCase() === nama.toLowerCase());
};

// hapus mahasiswa
const deleteMahasiswa = (nama) =>{
    const allMahasiswa = loadMahasiswa();
    const filteredAllMahasiswa = allMahasiswa.filter((mahasiswa) => mahasiswa.nama !== nama);

    saveMahasiswa(filteredAllMahasiswa);
};

// update mahasiswa
const updateAllMahasiswa = (mahasiswaBaru) => {
    const allMahasiswa = loadMahasiswa();
    // hilangkan mahasiswa lama
    const filteredAllMahasiswa = allMahasiswa.filter((mahasiswa) => mahasiswa.nama !== mahasiswaBaru.oldNama);
    delete mahasiswaBaru.oldNama;
    filteredAllMahasiswa.push(mahasiswaBaru);
    saveMahasiswa(filteredAllMahasiswa);

};

module.exports = { loadMahasiswa, findMahasiswa, addMahasiswa, cekDuplikat, deleteMahasiswa, updateAllMahasiswa };